
import React from 'react';
import type { FC } from 'react';

export const IonicBondIcon: FC = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto max-w-sm" aria-labelledby="ionic-title ionic-desc">
    <title id="ionic-title">رسم توضيحي للرابطة الأيونية</title>
    <desc id="ionic-desc">ذرة صوديوم (فلز) تفقد إلكترونًا لتعطيه لذرة كلور (لافلز)، فتتحولان إلى أيونات موجبة وسالبة تتجاذب.</desc>
    
    <defs>
      <style>
        {`
          @keyframes electron-transfer {
            0% { transform: translate(0, 0); opacity: 1; }
            40% { transform: translate(110px, -30px) scale(0.8); opacity: 1; }
            100% { transform: translate(155px, 0) scale(0.6); opacity: 1; }
          }
          .electron-path {
            animation: electron-transfer 2.5s ease-in-out infinite;
          }
        `}
      </style>
    </defs>

    {/* Sodium Atom (Na) */}
    <g transform="translate(60, 100)">
      <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#f1f5f9">Na</text>
      <text x="0" y="28" textAnchor="middle" fontSize="10" fill="#94a3b8">فلز</text>
      <circle cx="0" cy="0" r="50" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      {/* Valence electron */}
      <g className="electron-path">
        <circle cx="-50" cy="0" r="5" fill="#f87171" />
      </g>
    </g>

    {/* Plus sign */}
    <text x="130" y="108" textAnchor="middle" fontSize="30" fill="#64748b">+</text>

    {/* Chlorine Atom (Cl) */}
    <g transform="translate(200, 100)">
      <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
      <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#f1f5f9">Cl</text>
      <text x="0" y="28" textAnchor="middle" fontSize="10" fill="#94a3b8">لافلز</text>
      <circle cx="0" cy="0" r="50" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      {/* 7 Valence electrons */}
      {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map(angle => (
        <circle 
          key={angle}
          cx={50 * Math.cos(angle * Math.PI / 180)} 
          cy={50 * Math.sin(angle * Math.PI / 180)} 
          r="4" 
          fill="#60a5fa" />
      ))}
    </g>

    {/* Arrow */}
    <text x="280" y="108" textAnchor="middle" fontSize="40" fill="#94a3b8">→</text>
    
    {/* Resulting Ions */}
    <g transform="translate(350, 100)">
       {/* Na+ */}
      <g transform="translate(-30, 0)">
        <circle cx="0" cy="0" r="35" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#f1f5f9">Na</text>
        <text x="15" y="-10" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#38bdf8">+</text>
      </g>
      {/* Cl- */}
      <g transform="translate(30, 0)">
        <circle cx="0" cy="0" r="45" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#f1f5f9">Cl</text>
        <text x="15" y="-15" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#4ade80">-</text>
      </g>
    </g>
  </svg>
);
   