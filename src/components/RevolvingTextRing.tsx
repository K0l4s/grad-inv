import React, { useMemo } from 'react';

interface RevolvingTextRingProps {
    children?: React.ReactNode;
    text?: string;
    radius?: number;
    fontSize?: string;
    duration?: number;
}

const RevolvingTextRing: React.FC<RevolvingTextRingProps> = ({
    children,
    text = "HCM UNIVERSITY OF TECHNOLOGY AND ENGINEERING ★ ",
    radius = 170, 
    fontSize = "1.8rem", 
    duration = 20,
}) => {
    const chars = text.split("");
    const anglePerChar = 360 / chars.length;

    const renderChars = useMemo(() => {
        return chars.map((char, i) => {
            const startHue = 190; // Xanh
            const endHue = 320;   // Tím/Hồng
            const progress = i / chars.length;
            const hue = startHue + (progress * (endHue - startHue));
            
            const fillColor = `hsla(${hue}, 100%, 50%, 0.5)`;
            
            const strokeColor = `hsla(${hue}, 100%, 90%, 1)`;

            const glow = `0 0 15px hsla(${hue}, 100%, 60%, 0.6)`;

            return (
                <span
                    key={i}
                    className="absolute top-1/2 left-1/2 font-black uppercase select-none"
                    style={{
                        fontSize: fontSize,
                        color: fillColor, 
                        WebkitTextStroke: `1.5px ${strokeColor}`,
                        
                        textShadow: glow,
                        fontFamily: 'Arial Black, Impact, sans-serif',
                        transform: `
                            translate(-50%, -50%) 
                            rotateY(${i * anglePerChar}deg) 
                            translateZ(${radius}px)
                        `,
                        backfaceVisibility: 'visible',
                    }}
                >
                    {char}
                </span>
            );
        });
    }, [chars, anglePerChar, radius, fontSize]);

    return (
        <div className="relative flex items-center justify-center w-full h-full" style={{ perspective: '1200px' }}>
            <div className="relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* Center Object */}
                <div className="relative z-10" style={{ transform: 'translateZ(0px)' }}>
                    {children}
                </div>

                {/* Text Ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
                    <div style={{ transform: 'rotateX(10deg) rotateZ(-5deg)', transformStyle: 'preserve-3d' }}>
                        <div 
                            className="relative" 
                            style={{ 
                                transformStyle: 'preserve-3d',
                                animation: `spin-slow ${duration}s linear infinite`
                            }}
                        >
                            {renderChars}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(-360deg); }
                }
            `}</style>
        </div>
    );
};

export default RevolvingTextRing;