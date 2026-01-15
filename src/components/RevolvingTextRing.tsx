import React from 'react';

interface RevolvingTextRingProps {
    children: React.ReactNode;
    text?: string;
    radius?: number; // Bán kính phải đủ lớn để bao quanh children
    color?: string;
    isActive?: boolean;
    rotateX?: number; // Góc nghiêng theo trục X
    rotateZ?: number; // Góc nghiêng theo trục Z
    textGradient?: boolean; // Tùy chọn để áp dụng gradient cho text

}

const RevolvingTextRing: React.FC<RevolvingTextRingProps> = ({ 
    children, 
    text = "HCM UNIVERSITY OF TECHNOLOGY AND ENGINEERING ★ ", 
    radius = 120, // Giảm radius mặc định lại một chút cho dễ nhìn
    color = "text-white",
    isActive = true ,
    rotateX = 9,
    rotateZ = -10,
    textGradient = false,
}) => {
    const chars: string[] = text.split("");
    const anglePerChar: number = 360 / chars.length;

    return (
        // 1. Perspective Container: Quan trọng để tạo chiều sâu thị giác
        <div className="relative flex items-center justify-center w-full h-full group" style={{ perspective: '1000px' }}>
            
            {/* 2. Scene: Giữ không gian 3D chung cho cả Children và Text */}
            <div className="relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* --- COMPONENT CON (CENTER) --- */}
                {/* Loại bỏ z-index, thêm translateZ(0) để trình duyệt hiểu nó là vật thể 3D */}
                <div className="relative select-none" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(0px)' }}>
                    {children}
                </div>

                {/* --- VÒNG TRÒN TEXT --- */}
                <div 
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700
                    ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    // Loại bỏ z-index ở đây
                    style={{ transformStyle: 'preserve-3d' }} 
                >
                    {/* Góc nghiêng của quỹ đạo (Orbit Tilt) */}
                    {/* Bạn có thể chỉnh rotateX để vòng tròn nghiêng nhiều hay ít */}
                    <div style={{ transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`, transformStyle: 'preserve-3d' }}>
                        
                       <div className="relative animate-spin-slow" style={{ transformStyle: 'preserve-3d' }}>
    {chars.map((char, i) => {
        
        const startHue = 210; // Xanh dương
        const endHue = 330;   // Hồng
        const progress = i / chars.length; 
        
        // Tính ra độ màu (Hue) cho chữ hiện tại
        const hue = startHue + (progress * (endHue - startHue));
        
        // Màu động
        const dynamicColor = `hsl(${hue}, 90%, 60%)`;

        return (
            <span
                key={i}
                // Bỏ các class gradient cũ đi, chỉ giữ lại font
                className={`absolute top-1/2 left-1/2 font-serif font-bold uppercase whitespace-pre`}
                style={{
                    fontSize: '1.2rem',
                    
                    // Áp dụng màu đã tính toán
                    // Nếu textGradient = true thì dùng màu HSL, ngược lại dùng class color mặc định (thường là text-white)
                    color: textGradient ? dynamicColor : undefined, 
                    
                    // Nếu không dùng textGradient thì dùng class color từ props truyền vào
                    ...(textGradient ? {} : { color: undefined }), 

                    transform: `
                        translate(-50%, -50%) 
                        rotateY(${i * anglePerChar}deg) 
                        translateZ(${radius}px)
                    `,
                }}
                // Trick nhỏ: Nếu dùng class color của Tailwind thì thêm vào đây
                {...(!textGradient && { className: `absolute top-1/2 left-1/2 font-serif font-bold uppercase whitespace-pre ${color}` })}
            >
                {char}
            </span>
        );
    })}
</div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(-360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default RevolvingTextRing;