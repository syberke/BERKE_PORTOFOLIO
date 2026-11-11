/**
 * Original, scalable SVG artwork for the portrait takeover.
 * All layers are pointer-events:none; the real button lives in Hero.
 * The coordinates are intentionally registered to the supplied 244x316 portrait.
 */
export default function SpiderTransformation({ impact }) {
  return (
    <>
      <span className="spider-transformation" aria-hidden="true">
        <svg className="spider-veil" viewBox="0 0 244 316" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="s3-suit" x1=".08" y1=".06" x2=".85" y2="1">
              <stop stopColor="#ff6776" />
              <stop offset=".28" stopColor="#d72640" />
              <stop offset=".68" stopColor="#841126" />
              <stop offset="1" stopColor="#270917" />
            </linearGradient>
            <radialGradient id="s3-face" cx=".34" cy=".19" r=".82">
              <stop stopColor="#f95160" />
              <stop offset=".58" stopColor="#bc1934" />
              <stop offset="1" stopColor="#590f25" />
            </radialGradient>
            <linearGradient id="s3-lens" x1="0" y1="0" x2=".9" y2="1">
              <stop stopColor="#ffffff" />
              <stop offset=".58" stopColor="#f1f8ff" />
              <stop offset="1" stopColor="#7aa9dc" />
            </linearGradient>
          </defs>
          {/* Silhouette follows the shoulders, lapels and crown of the original portrait. */}
          <path className="suit-chest" d="M82 135 58 147C39 154 25 175 19 204L0 275v41h244v-41l-24-81c-7-27-22-42-49-49l-27-9-25 31Z" fill="url(#s3-suit)" />
          <path d="M22 198 3 284v32h238v-27l-22-84-41-36-23 39-36 41-34-41-20-42Z" fill="#120d22" opacity=".46" />
          <path className="suit-face" d="M121 30c29 0 47 16 50 48l-2 37c-6 28-23 46-47 52-25-6-42-23-48-50l-3-35c1-33 21-52 50-52Z" fill="url(#s3-face)" />
          <path d="M76 78c8-32 24-46 45-47 25-1 40 15 47 45" fill="none" stroke="#ff8592" strokeWidth="1.4" opacity=".66" />
          {/* Web geometry tightens toward the center seam for a believable mask. */}
          <g className="suit-webbing" fill="none" stroke="#270a1c" strokeWidth="1.3" strokeLinecap="round" opacity=".94">
            <path d="M121 31v133M92 39l29 78-17 45M149 38l-28 79 18 44M77 65l44 52-43 12M164 64l-43 53 45 11M76 97l45 20-34 33M169 97l-48 20 33 34" />
            <path d="M83 59q38 21 79 0M75 81q45 20 94 0M75 104q47 20 93 0M84 128q39 11 75 0M99 150q20 6 44 0" />
            <path d="M120 168v145M90 153l31 84-23 79M152 153l-31 84 24 79M54 163l66 74-71 67M190 165l-69 72 74 69M25 205l95 32-100 28M215 204l-94 33 102 32M66 187q53 17 110 0M43 221q75 21 153 0M21 261q99 19 199 0M8 298q114 18 227 0" />
          </g>
          <path className="suit-seam" d="M121 30v139l-12 70 12 77" fill="none" stroke="#ff8da2" strokeWidth="1.2" opacity=".62" />
          {/* Lenses are clean SVG paths, not an emoji or a static picture swap. */}
          <path className="suit-lens" d="M78 90c15-6 28-3 39 9-3 15-13 25-33 26-8-12-10-24-6-35Z" fill="url(#s3-lens)" stroke="#16121c" strokeWidth="4.6" strokeLinejoin="round" />
          <path className="suit-lens" d="M166 90c-15-6-28-3-40 9 3 15 13 25 33 26 9-12 11-24 7-35Z" fill="url(#s3-lens)" stroke="#16121c" strokeWidth="4.6" strokeLinejoin="round" />
          <path d="M83 100q14-2 22 6M161 100q-14-2-22 6" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="1.6" strokeLinecap="round" />
          {/* Deliberately abstract original arachnid emblem at the sternum. */}
          <g className="suit-insignia" fill="none" stroke="#0e0c1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M121 209v37m-8-28 8 10 8-10-8-8Z" fill="#0e0c1c" />
            <path d="m119 217-23-17-12 2m35 19-23-5-16 11m39 0-26 6-10 18m40-34 23-17 12 2m-35 19 23-5 16 11m-39 0 26 6 10 18" />
          </g>
        </svg>
        <svg className="spider-web-traces" viewBox="0 0 244 316" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M118 72 95 60 68 46 35 34M118 72 92 90 53 91 19 107M120 74 116 46 101 19M122 73 150 49 178 38 217 34M123 75 151 91 190 105 236 116M120 114l-31 36-47 25-35 9M124 115l35 36 50 23 29 25" stroke="#fff1f4" strokeWidth="1.05" opacity=".88" />
            <path d="M68 46 76 74 53 91M95 60 92 90M150 49l1 42 27-53M190 105l-12-67M42 175l11-84 23-17M209 174l-19-69-39-14" stroke="#ee5e79" strokeWidth=".85" opacity=".8" />
          </g>
        </svg>
        <span className="spider-seam-spark" />
        <span className="spider-hud" aria-hidden="true"><i /><span>IDENTITY / REVEALED</span></span>
      </span>
      {impact > 0 && (
        <svg key={impact} className="spider-impact" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="200" cy="200" r="60" className="impact-orbit" />
          <circle cx="200" cy="200" r="105" className="impact-orbit impact-orbit-second" />
          <g className="impact-rays" stroke="#ffeef4" strokeWidth="1.8" strokeLinecap="round">
            {Array.from({ length: 14 }, (_, i) => {
              const a = (i / 14) * Math.PI * 2;
              return <path key={i} d={`M ${200 + Math.cos(a) * 115} ${200 + Math.sin(a) * 115} L ${200 + Math.cos(a) * 163} ${200 + Math.sin(a) * 163}`} />;
            })}
          </g>
        </svg>
      )}
    </>
  );
}