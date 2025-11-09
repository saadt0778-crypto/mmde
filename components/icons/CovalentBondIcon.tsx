
import React from 'react';
import type { FC } from 'react';

export const CovalentBondIcon: FC = () => (
    <svg viewBox="0 0 400 200" className="w-full h-auto max-w-sm" aria-labelledby="covalent-title covalent-desc">
        <title id="covalent-title">رسم توضيحي للرابطة التساهمية</title>
        <desc id="covalent-desc">ذرتا هيدروجين (لافلزات) تتشاركان في زوج من الإلكترونات لتكوين جزيء هيدروجين مستقر.</desc>

        <defs>
            <style>
                {`
                @keyframes orbit-left {
                    from { transform: rotate(0deg) translateX(45px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
                }
                @keyframes orbit-right {
                    from { transform: rotate(0deg) translateX(45px) rotate(0deg); }
                    to { transform: rotate(-360deg) translateX(45px) rotate(360deg); }
                }
                .electron-left { animation: orbit-left 4s linear infinite; transform-origin: -40px 0; }
                .electron-right { animation: orbit-right 4s linear infinite; transform-origin: 40px 0; }
                .shared-electron-left { animation: orbit-left 4s linear infinite; transform-origin: 0px 0; }
                .shared-electron-right { animation: orbit-right 4s linear infinite; transform-origin: 0px 0; }
                `}
            </style>
        </defs>

        {/* First H Atom */}
        <g transform="translate(80, 100)">
            <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
            <text x="0" y="8" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#f1f5f9">H</text>
            <circle cx="0" cy="0" r="45" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <g style={{ animation: 'orbit-left 4s linear infinite', transformOrigin: '0px 0px'}}>
                <circle cx="45" cy="0" r="5" fill="#60a5fa" />
            </g>
        </g>
        
        {/* Plus Sign */}
        <text x="145" y="108" textAnchor="middle" fontSize="30" fill="#64748b">+</text>

        {/* Second H Atom */}
        <g transform="translate(210, 100)">
            <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
            <text x="0" y="8" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#f1f5f9">H</text>
            <circle cx="0" cy="0" r="45" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <g style={{ animation: 'orbit-right 4s linear infinite', transformOrigin: '0px 0px'}}>
                <circle cx="-45" cy="0" r="5" fill="#f87171" />
            </g>
        </g>
        
        {/* Arrow */}
        <text x="270" y="108" textAnchor="middle" fontSize="40" fill="#94a3b8">→</text>

        {/* Resulting H2 Molecule */}
        <g transform="translate(340, 100)">
            {/* Overlapping Orbitals */}
            <circle cx="-20" cy="0" r="45" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.7" />
            <circle cx="20" cy="0" r="45" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.7" />
            
            {/* Nuclei */}
            <g transform="translate(-20, 0)">
                <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
                <text x="0" y="8" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#f1f5f9">H</text>
            </g>
             <g transform="translate(20, 0)">
                <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
                <text x="0" y="8" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#f1f5f9">H</text>
            </g>

            {/* Shared Electrons */}
            <g>
                <g className="shared-electron-left">
                    <circle cx="0" cy="-45" r="5" fill="#60a5fa" />
                </g>
                <g className="shared-electron-right">
                    <circle cx="0" cy="45" r="5" fill="#f87171" />
                </g>
            </g>
            <text x="0" y="80" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f1f5f9">H₂</text>
        </g>
    </svg>
);
   