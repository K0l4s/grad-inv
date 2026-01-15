import { useState } from 'react';
import GraduationCard from './GraduationCard';

const EnvelopeGraduation = () => {

    const [step, setStep] = useState(0);
const [isHover, setIsHover] = useState(false);
   const handleOpen = () => {
        if (step === 0) {
            const audio = new Audio('/open-sound.mp3'); 
            audio.volume = 1; // Điều chỉnh âm lượng (0.0 đến 1.0)
            audio.play().catch((error) => console.error("Không thể phát âm thanh:", error));
            // --------------------------------------

            setStep(1); 
            setTimeout(() => setStep(2), 600);
            setTimeout(() => setStep(3), 1400);
        }
    };

    const reset = () => {
         const audio = new Audio('/open-sound.mp3'); 
            audio.volume = 1; // Điều chỉnh âm lượng (0.0 đến 1.0)
            audio.play().catch((error) => console.error("Không thể phát âm thanh:", error))
        setStep(1);
        setTimeout(() => setStep(0), 800);
    };
const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Chỉ cho phép hiệu ứng khi chưa mở thư (step === 0)
        if (step !== 0) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Tính tọa độ chuột trong element
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Tính độ xoay (Max 15 độ)
        // Công thức: (Vị trí chuột - Tâm) / Một nửa kích thước * Độ nghiêng tối đa
        const rY = ((mouseX - width / 2) / (width / 2)) * 15; 
        const rX = -((mouseY - height / 2) / (height / 2)) * 15; // Dấu trừ để đảo ngược trục X cho tự nhiên

        setRotation({ x: rX, y: rY });

        if (!isHover) setIsHover(true);
    };

    const handleMouseLeave = () => {
        // Trả về vị trí cân bằng khi chuột rời đi
        setRotation({ x: 0, y: 0 });
        setIsHover(false); // 2. Reset khi rời chuột
    };
    const handleMouseEnter = () => {
        if (step === 0) setIsHover(true);
    }
    return (
        <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-[1rem] overflow-hidden perspective-1000">
            {/* --- CONTAINER PHONG BÌ (Responsive bằng aspect-ratio) --- */}
            <div
                className={`relative w-full max-w-[900px] aspect-[16/9] md:aspect-[5/3] transition-transform duration-1000 ease-in-out cursor-pointer 
                ${step === 3 ? 'scale-110 translate-y-[5rem] opacity-0 pointer-events-none' : 'hover:scale-105'}`}
                style={{
                    // Logic Transform kết hợp: Xử lý Scale khi mở + Hiệu ứng 3D khi rê chuột
                    transform: step === 3 
                        ? 'scale(1.1) translateY(5rem)' // Trạng thái đã mở hẳn (ẩn đi)
                        : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${rotation.x !== 0 ? 1.05 : 1}, ${rotation.x !== 0 ? 1.05 : 1}, 1)`, // Trạng thái 3D + Scale nhẹ khi hover
                    
                    opacity: step === 3 ? 0 : 1,
                    pointerEvents: step === 3 ? 'none' : 'auto',
                    
                    // Logic Transition: Nhanh khi rê chuột (0.1s), Chậm khi mở thư (1s)
                    transition: step === 0 && (rotation.x !== 0 || rotation.y !== 0)
                        ? 'transform 0.1s ease-out' 
                        : 'transform 1000ms ease-in-out, opacity 1000ms ease-in-out'
                }}
                onClick={handleOpen}
                onMouseEnter={handleMouseEnter} 
                onMouseMove={handleMouseMove} 
                onMouseLeave={handleMouseLeave}
            >
                {/* con dấu */}
                <div className="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-40">
                        <div className={`w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] bg-white 
                            rounded-full border-[0.25rem] border-blue-500 shadow-lg flex items-center justify-center 
                            font-serif font-bold text-[1.2rem] md:text-[1.5rem] transition-opacity duration-300 ${step >= 1 ? 'opacity-0' : 'opacity-100'}`}>
                            {/* image */}
                            <img src="/school-logo.png" alt="Seal" className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] object-contain" />
                        </div>
                    </div>

                    {/* Chỉ dẫn Click */}
                    <div className='absolute left-1/2 transform -translate-x-1/2 bottom-[10%] z-40 flex flex-col items-center'>
                        {step === 0 && (
                            <div className="mb-[5rem]  bg-white/80 px-[0.75rem] py-[0.30rem] rounded-full text-[1.25rem] font-bold text-blue-900 animate-bounce whitespace-nowrap">
                                Click to open
                            </div>
                        )}
                    </div>
                {/* --- LỚP 1: MẶT SAU --- */}
                <div className="absolute inset-0 bg-[#1e293b] rounded-[0.5rem] shadow-2xl z-0"></div>

                {/* --- LỚP 2: LÁ THƯ --- */}
                <div
                    className={`
                        absolute inset-[0.5rem] bg-white rounded-[0.25rem] shadow-md z-10 overflow-hidden
                        transition-all duration-[1000ms] ease-in-out
                        ${step >= 2 ? '-translate-y-[85%] shadow-xl' : ''}
                    `}
                >
                    <div className="w-full h-full pointer-events-none select-none">
                        <GraduationCard onClose={reset} />
                    </div>
                </div>

                {/* --- LỚP 3: NẮP DƯỚI (Front Pocket) --- */}
               <div className="absolute inset-0 z-20 pointer-events-none">
            <div 
                className="w-full h-full bg-[#334155]"
                style={{
                    // Cắt hình thang/tam giác ở dưới đáy
                    clipPath: 'polygon(-50% 100%, 150% 100%, 50% 30%)',
                    // Đổ bóng cho clip-path
                    filter: 'drop-shadow(0 -2px 3px rgba(0,0,0,0.1))' 
                }}
            ></div>
        </div>

                {/* --- LỚP 4: NẮP TRÊN (Top Flap) --- */}
             <div
                    className="absolute top-0 left-0 w-full h-0 origin-top"
                    style={{
                        zIndex: step < 2 ? 30 : 1,
                        borderTop: 'min(500px, 45vw) solid #1e293b',
                        clipPath: 'polygon(-100% 0%, 200% 0%, 50% 55%)',
                        filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.3))',
                        
                        // --- LOGIC ANIMATION & TRANSFORM ---
                        // 1. Nếu đã mở (step >= 1): Ưu tiên Transform 180 độ (animation: none)
                        // 2. Nếu chưa mở mà Hover: Chạy Animation vẫy vẫy
                        // 3. Nếu bình thường: Đóng kín (0 độ)
                        animation: (step === 0 && isHover) ? 'flap-wave 1.5s infinite ease-in-out' : 'none',
                        
                        transform: step >= 1 
                            ? 'rotateX(180deg)' 
                            : (isHover ? undefined : 'rotateX(0deg)'), // undefined để nhường quyền điều khiển cho animation

                        // --- LOGIC TRANSITION ---
                        // Khi chuyển từ animation sang trạng thái mở (step 1), transition giúp nó mượt hơn một chút
                        transition: `
                            transform 700ms ease-in-out, 
                            z-index 0s linear ${step < 2 ? '1000ms' : '0s'}
                        `
                    }}
                >
                    
                </div>
            </div>
                    
            {/* --- LỚP 5: CHẾ ĐỘ ĐỌC (Full Screen Modal) --- */}
            <div
                className={`
                    fixed inset-0 z-50 flex items-center justify-center p-[1rem] bg-black/60 backdrop-blur-sm
                    transition-all duration-700
                    ${step === 3 ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
                `}
                onClick={reset}
            >
                <div
                    className={`
                        w-full max-w-[1200px] h-[90vh] bg-white rounded-[1rem] shadow-2xl overflow-hidden transform transition-all duration-700
                        ${step === 3 ? 'scale-100 translate-y-0' : 'scale-50 translate-y-[10rem]'}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="h-full overflow-y-auto">
                        <GraduationCard onClose={reset} />
                    </div>
                </div>
            </div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .rotate-x-180 { transform: rotateX(180deg); }
                .rotate-x-0 { transform: rotateX(0deg); }
                .origin-top { transform-origin: top; }

                @keyframes flap-wave {
                    0% { transform: rotateX(15deg); }   /* Hé nhẹ */
                    50% { transform: rotateX(25deg); }  /* Mở rộng hơn chút */
                    100% { transform: rotateX(15deg); } /* Quay lại hé nhẹ */
                }
                
            `}</style>
        </div>
    );
};

export default EnvelopeGraduation;