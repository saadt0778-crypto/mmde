
import React from 'react';
import type { FC } from 'react';

export const MetallicBondIcon: FC = () => (
    <svg viewBox="0 0 300 200" className="w-full h-auto max-w-xs" aria-labelledby="metallic-title metallic-desc">
        <title id="metallic-title">رسم توضيحي للرابطة الفلزية</title>
        <desc id="metallic-desc">شبكة من أيونات الفلز الموجبة محاطة بـ "بحر" من الإلكترونات الحرة الحركة (غير المتمركزة).</desc>
        
        <defs>
            <style>
                {`
                    @keyframes move-electron-1 {
                        0% { transform: translate(0, 0); } 25% { transform: translate(30px, 40px); } 50% { transform: translate(-20px, 80px); } 75% { transform: translate(50px, -10px); } 100% { transform: translate(0, 0); }
                    }
                    @keyframes move-electron-2 {
                        0% { transform: translate(0, 0); } 25% { transform: translate(-40px, -30px); } 50% { transform: translate(30px, 50px); } 75% { transform: translate(-10px, -50px); } 100% { transform: translate(0, 0); }
                    }
                    @keyframes move-electron-3 {
                        0% { transform: translate(0, 0); } 25% { transform: translate(20px, -50px); } 50% { transform: translate(-50px, 10px); } 75% { transform: translate(30px, 30px); } 100% { transform: translate(0, 0); }
                    }
                    .e1 { animation: move-electron-1 8s linear infinite; }
                    .e2 { animation: move-electron-2 7s linear infinite reverse; }
                    .e3 { animation: move-electron-3 9s linear infinite; }
                `}
            </style>
            <radialGradient id="electron-sea" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#facc15" stopOpacity="0" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0.2" />
            </radialGradient>
        </defs>

        <rect width="300" height="200" rx="15" fill="url(#electron-sea)" />
        <rect width="300" height="200" rx="15" fill="none" stroke="#facc15" strokeOpacity="0.5" />

        <g>
            {/* Cation Lattice */}
            {[...Array(3)].map((_, row) => (
                [...Array(4)].map((_, col) => (
                    <g key={`${row}-${col}`} transform={`translate(${40 + col * 70}, ${40 + row * 60})`}>
                        <circle cx="0" cy="0" r="20" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                        <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#f1f5f9">+</text>
                    </g>
                ))
            ))}
        </g>
        
        {/* Delocalized Electrons */}
        <g>
            <text className="e1" x="20" y="30" fontSize="18" fill="#f1f5f9">e⁻</text>
            <text className="e2" x="100" y="20" fontSize="18" fill="#f1f5f9">e⁻</text>
            <text className="e3" x="180" y="50" fontSize="18" fill="#f1f5f9">e⁻</text>
            <text className="e2" x="250" y="80" fontSize="18" fill="#f1f5f9">e⁻</text>
            <text className="e1" x="60" y="120" fontSize="18" fill="#f1f5f9">e⁻</text>
            <text className="e3" x="130" y="150" fontSize="18" fill="#f1f5f9">e⁻</text>
            <text className="e1" x="220" y="170" fontSize="18" fill="#f1f5f9">e⁻</text>
             <text className="e2" x="30" y="180" fontSize="18" fill="#f1f5f9">e⁻</text>
        </g>
        <text x="150" y="190" textAnchor="middle" fontSize="12" fill="#94a3b8">بحر من الإلكترونات الحرة</text>
    </svg>
);
   