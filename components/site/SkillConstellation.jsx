"use client";

import { useState } from "react";

const symbols = ["✦", "◇", "◌", "⌘", "⌗"];

export default function SkillConstellation({ groups }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="skills-layout">
      <div className="skill-visual" data-reveal>
        <div className="constellation" aria-hidden="true">
          <svg viewBox="0 0 500 500" fill="none" className="constellation-lines">
            <circle cx="250" cy="250" r="160" stroke="currentColor" strokeDasharray="3 11" opacity=".18"/>
            <circle cx="250" cy="250" r="96" stroke="currentColor" opacity=".2"/>
            <path d="M250 48 400 165 430 350 230 447 70 309 110 123Z M250 48 230 447 M110 123 430 350 M400 165 70 309" stroke="currentColor" opacity=".18"/>
            {[ [250,48],[400,165],[430,350],[230,447],[70,309],[110,123],[250,250] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===6?11:4} fill={i===6?"#e5384c":"#99b5ef"}/>) }
          </svg>
          <div className="constellation-core"><span className="star-small">✳</span><strong>BUILD<br/>CREATE<br/>EXPLORE</strong><small>01 / ∞</small></div>
          <span className="constellation-tag tag-one">{groups[selected].tools[0]}</span>
          <span className="constellation-tag tag-two">{groups[selected].tools[Math.min(1,groups[selected].tools.length - 1)]}</span>
          <span className="constellation-tag tag-three">{groups[selected].tools[Math.min(2,groups[selected].tools.length - 1)]}</span>
          <span className="constellation-tag tag-four">{groups[selected].tools[Math.min(3,groups[selected].tools.length - 1)]}</span>
        </div>
        <p className="constellation-caption">AN ECOSYSTEM OF THINGS I BUILD WITH & CONTINUE LEARNING.</p>
      </div>
      <div className="skill-groups" data-reveal>
        {groups.map((group,index)=> (
          <div className={`skill-group ${selected===index?"is-selected":""}`} key={group.name}>
            <button type="button" className="skill-head" onClick={() => { setSelected(index); window.dispatchEvent(new Event("portfolio:layout")); }} aria-expanded={selected===index} aria-controls={`skill-${index}`}>
              <span className="skill-index">0{index+1}</span>
              <span className="skill-head-main"><span className="skill-label">{group.label}</span><strong>{group.name}</strong></span>
              <span className="skill-icon">{symbols[index]}</span>
            </button>
            <div id={`skill-${index}`} className="skill-detail" hidden={selected!==index}>
              <p>{group.description}</p>
              <div className="skill-pills">{group.tools.map(tool=><span key={tool} title={`${tool} — ${group.name}`}>{tool}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}