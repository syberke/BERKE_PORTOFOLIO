"use client";
/**
 * FluidBlobCanvas.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * @react-three/fiber Canvas with a high-poly Icosahedron driven by a custom
 * vertex/fragment shader to simulate an organic liquid-metal blob
 * (podium.global style).
 *
 * Exposes an imperative ref so a parent (CinematicStory.jsx) can scrub
 * position/rotation/scale via GSAP ScrollTrigger.
 *
 *   const blobRef = useRef();
 *   <FluidBlobCanvas ref={blobRef} />
 *   gsap.to(blobRef.current.group.position, { x: 2, ... });
 *
 * Stays mounted across theme toggles — colors are uniforms, not destroys.
 */
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── SHADERS ────────────────────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  uniform float uSpeed;
  varying vec3 vNormal;
  varying vec3 vPos;

  // 3D simplex noise (Ashima)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float t = uTime * uSpeed;
    float n = snoise(position * 1.2 + vec3(t * 0.5));
    float n2 = snoise(position * 2.4 + vec3(-t * 0.3));
    float disp = uDistort * (n * 0.6 + n2 * 0.4);
    vec3 newPos = position + normal * disp;
    vNormal = normalize(normalMatrix * normal);
    vPos = newPos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    vec3 light = normalize(vec3(0.6, 0.8, 1.0));
    float diff = clamp(dot(vNormal, light), 0.0, 1.0);
    float fres = pow(1.0 - clamp(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.5);
    vec3 base = mix(uColorA, uColorB, diff);
    vec3 col = base + fres * 0.6;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ─── BLOB MESH ──────────────────────────────────────────────────────────── */
function Blob({ colorA = "#6a5cff", colorB = "#1a1140", distort = 0.45, speed = 0.6 }) {
  const meshRef = useRef(null);
  const matRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: distort },
      uSpeed: { value: speed },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
    }),
    [] // create once; we update via refs below
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* ─── SCENE WRAPPER (imperative handle for GSAP) ─────────────────────────── */
const SceneContent = forwardRef(function SceneContent(props, ref) {
  const groupRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      get group() {
        return groupRef.current;
      },
    }),
    []
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 4, 5]} intensity={1.2} />
      <group ref={groupRef}>
        <Blob {...props} />
      </group>
    </>
  );
});

/* ─── EXPORTED CANVAS ────────────────────────────────────────────────────── */
const FluidBlobCanvas = forwardRef(function FluidBlobCanvas(
  { colorA, colorB, distort, speed, className = "" },
  ref
) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
      suppressHydrationWarning
    >
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContent
          ref={ref}
          colorA={colorA}
          colorB={colorB}
          distort={distort}
          speed={speed}
        />
      </Canvas>
    </div>
  );
});

export default FluidBlobCanvas;
