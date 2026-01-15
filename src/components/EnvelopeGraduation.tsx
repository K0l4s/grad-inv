import { useState, useRef, memo, useCallback } from 'react'; // Thêm memo, useCallback, useRef
import GraduationCard from './GraduationCard';

// --- 1. TỐI ƯU HÓA BACKGROUND ---
// Sử dụng memo() để component này KHÔNG render lại khi state ở component cha thay đổi
const BackgroundDecoration = memo(() => {
    // Tạo mảng confetti cố định để tránh random lại mỗi lần 
    const confettiItems = [...Array(15)].map((_, i) => ({
        id: i,
        style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${-Math.random() * 20}s`,
        },
        type: i % 3, // 0: vàng, 1: đồng, 2: bạc
        size: i % 2 === 0 ? 'w-2 h-2' : 'w-3 h-3'
    }));

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
             {/* 1. Nền Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-slate-200"></div>

            {/* 2. Icons học thuật */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
                <svg className="absolute top-10 left-10 w-64 h-64 text-slate-900 animate-float-slow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                </svg>
                <svg className="absolute bottom-10 right-10 w-72 h-72 text-slate-900 animate-float-slower" fill="currentColor" viewBox="0 0 24 24" style={{animationDelay: '-5s'}}>
                    <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z" />
                </svg>
            </div>

            {/* 3. Confetti (Dùng mảng cố định) */}
            <div className="absolute inset-0 overflow-hidden">
                {confettiItems.map((item) => (
                    <div
                        key={item.id}
                        className={`absolute rounded-full mix-blend-multiply animate-twinkle-drift
                        ${item.type === 0 ? 'bg-yellow-400/40' : item.type === 1 ? 'bg-yellow-600/30' : 'bg-slate-300/50'}
                        ${item.size}`}
                        style={item.style}
                    ></div>
                ))}
            </div>

            <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay"></div>
        </div>
    );
});

// Đặt tên hiển thị cho component memo 
BackgroundDecoration.displayName = 'BackgroundDecoration';


const EnvelopeGraduation = () => {
    const [step, setStep] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    
    // --- 2. TỐI ƯU HÓA MOUSE MOVE ---
    // Dùng ref để lưu trạng thái animation frame
    const requestRef = useRef<number | null>(null);

    const handleOpen = () => {
        if (step === 0) {
            const audio = new Audio('/open-sound.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});

            setStep(1);
            setTimeout(() => setStep(2), 600);
            setTimeout(() => setStep(3), 1400);
        }
    };

    const reset = () => {
        setStep(1);
        setTimeout(() => setStep(0), 800);
    };

    // Sử dụng useCallback để không tạo lại function mới mỗi lần render
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (step !== 0) return;
        
        // Nếu đã có một frame đang chờ xử lý, bỏ qua sự kiện này 
        if (requestRef.current) return;

        const currentTarget = e.currentTarget;
        const clientX = e.clientX;
        const clientY = e.clientY;

        // Đẩy việc tính toán vào frame tiếp theo của trình duyệt
        requestRef.current = requestAnimationFrame(() => {
            const rect = currentTarget.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = clientX - rect.left;
            const mouseY = clientY - rect.top;
            
            // Tính toán
            const rY = ((mouseX - width / 2) / (width / 2)) * 10;
            const rX = -((mouseY - height / 2) / (height / 2)) * 10;
            
            setRotation({ x: rX, y: rY });
            
            // Reset ref để cho phép nhận sự kiện tiếp theo
            requestRef.current = null;
        });
        
        if (!isHover) setIsHover(true);
    }, [step, isHover]); // Dependencies

    const handleMouseLeave = useCallback(() => {
        // Hủy animation frame nếu còn đang chạy dở
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
        }
        setRotation({ x: 0, y: 0 });
        setIsHover(false);
    }, []);


    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden perspective-1000 font-sans bg-slate-100">

            {/* Component này giờ đây sẽ KHÔNG re-render khi bạn rê chuột */}
            <BackgroundDecoration />

            {/* --- PHONG BÌ --- */}
             <div
                className={`relative w-full max-w-[800px] aspect-[16/9] md:aspect-[5/3] transition-transform duration-1000 ease-in-out cursor-pointer 
                ${step === 3 ? 'pointer-events-none opacity-0' : ''} z-10 will-change-transform`} // Thêm will-change-transform
                style={{
                    transform: step === 3
                        ? 'scale(1.5) translateY(10rem)'
                        : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHover ? 1.02 : 1}, ${isHover ? 1.02 : 1}, 1)`,
                    // Khi hover, dùng transition cực ngắn hoặc bỏ transition để cảm giác "dính" chuột mượt hơn
                    transition: step === 0 && (rotation.x !== 0 || rotation.y !== 0)
                        ? 'transform 0.1s ease-out' 
                        : 'transform 1000ms ease-in-out, opacity 1000ms ease-in-out'
                }}
                onClick={handleOpen}
                onMouseEnter={() => step === 0 && setIsHover(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* ... (Các phần bên trong giữ nguyên KHÔNG CẦN SỬA) ... */}
                
                {/* CON DẤU & RUY BĂNG */}
                <div className={`fixed left-1/2 top-1/2 z-40 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500
                    ${step >= 1 ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-16 h-24 pointer-events-none flex justify-center">
                         <div className="w-6 h-full bg-red-700 rotate-12 origin-top shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}></div>
                         <div className="w-6 h-full bg-red-800 -rotate-12 origin-top shadow-md -ml-2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}></div>
                    </div>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full border-4 border-red-900/30 shadow-xl flex items-center justify-center group">
                        <div className="absolute inset-1 border border-dashed border-red-300/50 rounded-full"></div>
                        <img src="/school-logo.png" alt="Logo" className="w-10 h-10 object-contain opacity-90 drop-shadow-md grayscale-[30%] group-hover:grayscale-0 transition-all" />
                        <div className="absolute top-2 right-4 w-4 h-4 bg-white opacity-20 rounded-full blur-[2px]"></div>
                    </div>
                </div>
                 {/* CHỈ DẪN CLICK */}
                {step === 0 && (
                    <div className='absolute left-1/2 transform -translate-x-1/2 bottom-[-3rem] z-40 text-center opacity-70 animate-bounce'>
                        <span className="bg-slate-800 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg border border-slate-600">
                            Nhấn để mở thư
                        </span>
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-slate-800 mx-auto -mt-8"></div>
                    </div>
                )}
                {/* LỚP 2: MẶT SAU */}
                <div className="absolute inset-0 bg-[#1e293b] rounded-lg shadow-2xl z-0 overflow-hidden border border-slate-700">
                     <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px'}}></div>
                </div>
                {/* LỚP 3: NỘI DUNG THƯ */}
                <div className={`absolute inset-2 md:inset-4 bg-white rounded-sm shadow-md z-10 overflow-hidden transition-all duration-[1000ms] ease-in-out ${step >= 2 ? '-translate-y-[120%] rotate-2 shadow-2xl' : ''}`}>
                     <div className="w-full h-full bg-orange-50/30"><GraduationCard onClose={reset} isPreview={true}/></div>
                </div>
                {/* LỚP 4: NẮP DƯỚI */}
                <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-2xl">
                    <div className="w-full h-full bg-[#334155] relative overflow-hidden" style={{clipPath: 'polygon(0% 100%, 100% 100%, 100% 35%, 50% 60%, 0% 35%)'}}>
                         <div className="absolute inset-0 bg-noise opacity-20"></div>
                         <div className="absolute bottom-0 left-0 w-full h-[10px] bg-yellow-600/20"></div>
                         <div className="absolute bottom-4 left-4 opacity-30 rotate-12">
                             <div className="border-2 border-slate-400 w-16 h-10 flex items-center justify-center font-mono text-[10px] text-slate-400">AIR MAIL</div>
                         </div>
                    </div>
                </div>
                {/* LỚP 5: NẮP TRÊN */}
                <div className="absolute top-0 left-0 w-full h-full origin-top z-30 drop-shadow-lg"
                    style={{zIndex: step < 2 ? 30 : 1, transition: `transform 700ms cubic-bezier(0.4, 0, 0.2, 1), z-index 0s linear ${step < 2 ? '700ms' : '0s'}`, transform: step >= 1 ? 'rotateX(180deg)' : (isHover ? 'rotateX(5deg)' : 'rotateX(0deg)')}}>
                    <div className="absolute inset-0 bg-[#1e293b] z-10" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)' }}>
                        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(135deg, #334155 25%, #475569 25%, #475569 50%, #334155 50%, #334155 75%, #475569 75%, #475569 100%)', backgroundSize: '20px 20px'}}></div>
                        <div className="absolute top-[54%] left-1/2 -translate-x-1/2 w-[70%] h-[1px] bg-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                    </div>
                    <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${step >= 1 ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="absolute top-2 right-[15%] md:right-[12%] w-14 h-16 bg-white border-4 border-double border-red-800 shadow-sm rotate-6 flex flex-col items-center p-1">
                            <div className="w-full h-10 bg-blue-100 overflow-hidden relative mb-1"><div className="absolute inset-0 flex items-center justify-center text-[7px] text-center text-blue-900 leading-none font-bold">GRADUATION<br/>2025</div></div>
                            <span className="text-[6px] font-bold text-red-900">POSTAGE</span>
                        </div>
                        <div className="absolute top-4 right-[10%] md:right-[8%] w-24 h-12 opacity-60">
                             <svg viewBox="0 0 100 50" className="w-full h-full fill-none stroke-slate-400 stroke-2"><path d="M0,10 Q20,0 40,10 T80,10" /><path d="M0,20 Q20,10 40,20 T80,20" /><path d="M0,30 Q20,20 40,30 T80,30" /><circle cx="80" cy="20" r="15" className="stroke-slate-400" /><text x="80" y="22" fontSize="6" textAnchor="middle" fill="#94a3b8" className="stroke-none">SENT</text></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL HIỂN THỊ FULL --- */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-all duration-700
                ${step === 3 ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onClick={reset}
            >
                <div
                    className={`w-full max-w-[1000px] max-h-[90vh] bg-[#fffaf0] rounded-xl shadow-2xl overflow-y-auto transform transition-all duration-700 relative
                    ${step === 3 ? 'scale-100 translate-y-0' : 'scale-50 translate-y-[20rem]'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={reset} className="absolute top-4 right-4 z-50 text-slate-400 hover:text-slate-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <GraduationCard onClose={reset} />
                </div>
            </div>

            {/* --- STYLES --- */}
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .bg-noise {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                }

                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                 @keyframes float-slower {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(25px) rotate(-3deg); }
                }
                .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
                .animate-float-slower { animation: float-slower 25s ease-in-out infinite; }

                @keyframes twinkle-drift {
                    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
                    10% { opacity: 1; }
                    50% { opacity: 0.5; transform: translateY(100px) translateX(20px) scale(1.2) rotate(180deg); }
                    90% { opacity: 1; }
                    100% { transform: translateY(200px) translateX(40px) scale(1); opacity: 0; }
                }
                .animate-twinkle-drift { animation: twinkle-drift linear infinite; }
            `}</style>
        </div >
    );
};

export default EnvelopeGraduation;