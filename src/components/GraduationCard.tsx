import { MapPin, Calendar, ExternalLink, X, Clock, Building2, GraduationCap } from 'lucide-react';
import { BiLogoJava } from 'react-icons/bi';
import {
    SiReact, SiNodedotjs, SiPython, SiJavascript, SiCplusplus,
    SiMongodb, SiGit, SiDocker,
    SiTypescript
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import RevolvingTextRing from './RevolvingTextRing';

// 1. Thêm prop isPreview vào interface
interface GraduationCardProps {
    onClose: () => void;
    isPreview?: boolean; // Mặc định là false
}

const GraduationCard = ({ onClose, isPreview = false }: GraduationCardProps) => {
    const name = new URLSearchParams(window.location.search).get('name') || 'Bạn';

    const graduateInfo = {
        name: "Trung Kiên",
        major: "Công Nghệ Thông Tin",
        school: "Trường ĐH Công Nghệ Kỹ Thuật TP.HCM", 
        schoolShort: "HCMUTE",
        address: "Số 1 Võ Văn Ngân, phường Thủ Đức, TP.HCM",
        dateFull: "Thứ Bảy, 24/01/2026",
        time: "10:30 Sáng",
        contact: "082.762.6203 (Trung Kiên)",
        imageUrl: "/avt.jpg",
        googleMapsUrl: "https://maps.app.goo.gl/q6EetTRwwrdY9ndSA",
        logoUrl: "/school-logo.png",
    };

    const techStack = [
        { icon: SiReact, color: "#61DAFB" },
        { icon: SiNodedotjs, color: "#339933" },
        { icon: SiPython, color: "#3776AB" },
        { icon: BiLogoJava, color: "#F7DF1E" },
        { icon: SiTypescript, color: "#3178C6" },
        { icon: SiCplusplus, color: "#00599C" },
        { icon: TbBrandCSharp, color: "#239120" },
        { icon: SiJavascript, color: "#F7DF1E" },
        { icon: SiMongodb, color: "#47A248" },
        { icon: SiGit, color: "#F05032" },
        { icon: SiDocker, color: "#2496ED" },
    ];

    return (
        <div className={`w-full h-full relative font-sans flex flex-col bg-[#0a0e1a] transition-all duration-500
            ${isPreview ? 'overflow-hidden cursor-pointer' : 'overflow-y-auto'}`}>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-[#0a0e1a] to-[#05070d]"></div>
            <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none mix-blend-overlay"></div>

            {!isPreview && onClose && (
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-red-500/20 text-white/70 hover:text-red-400 rounded-full transition-all duration-300 backdrop-blur-md border border-white/10 shadow-lg group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            )}

            <div className="relative w-full h-full flex flex-col lg:flex-row">

                {!isPreview && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        {techStack.map((item, index) => {
                            // Logic random position giữ nguyên...
                            const seed = index * 137;
                            const top = (seed % 85) + 5;
                            const left = ((seed * 3) % 85) + 5;
                            const delay = (seed % 5) * 0.8;
                            const duration = 20 + (seed % 10);
                            const size = (seed % 3) === 0 ? 'text-[3rem]' : (seed % 3) === 1 ? 'text-[4rem]' : 'text-[5rem]';
                            return (
                                <div
                                    key={index}
                                    className={`absolute animate-float opacity-20 mix-blend-screen filter blur-[2px] ${size}`}
                                    style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s`, color: item.color, textShadow: `0 0 20px ${item.color}` }}
                                >
                                    <item.icon />
                                </div>
                            )
                        })}
                    </div>
                )}


                <div className={`relative z-10 lg:w-[55%] flex flex-col justify-center
                    ${isPreview ? 'p-4 gap-2' : 'p-6 md:p-10'}`}>

                    <div className="absolute inset-0 bg-indigo-950/20 backdrop-blur-xl border-r border-white/10 pointer-events-none lg:rounded-l-none"></div>

                    <div className={`relative z-20 ${isPreview ? 'space-y-2' : 'space-y-8'}`}>
                        {/* Header */}
                        <div className="text-center lg:text-left space-y-1">
                            <div className={`inline-block rounded-full bg-gradient-to-r from-amber-400/20 to-purple-500/20 border border-amber-400/30 backdrop-blur-md
                                ${isPreview ? 'px-2 py-0.5' : 'px-4 py-1'}`}>
                                <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300 tracking-wider uppercase
                                    ${isPreview ? 'text-[0.5rem]' : 'text-sm md:text-base'}`}>
                                    Lời mời trân trọng
                                </span>
                            </div>
                            <h1 className={`font-black text-white drop-shadow-lg leading-tight
                                ${isPreview ? 'text-lg mt-1' : 'text-2xl md:text-3xl mt-2'}`}>
                                LỄ TỐT NGHIỆP <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                                    KỸ SƯ {graduateInfo.major.toUpperCase()}
                                </span>
                            </h1>
                        </div>

                        {/* Name Section */}
                        <div className="text-center lg:text-left">
                            {!isPreview && (
                                <p className="text-indigo-200/80 text-lg md:text-xl font-light flex flex-col lg:flex-row gap-2 items-center lg:items-end justify-center lg:justify-start">
                                    <span>Thân mời</span>
                                    <span className='text-amber-300 font-bold text-2xl'>{name}</span>
                                    <span>đến tham dự cùng:</span>
                                </p>
                            )}

                            <h2 className={`font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-none
                                ${isPreview ? 'text-3xl mt-1' : 'text-[2.5rem] md:text-[4rem] mt-2'}`}>
                                {graduateInfo.name.toUpperCase()}
                            </h2>
                        </div>

                        {/* Details Box */}
                        <div className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors duration-500
                             ${isPreview ? 'p-3 space-y-2' : 'p-6 space-y-5 hover:bg-white/10'}`}>

                            <div className={`flex items-center gap-3 border-b border-white/10 ${isPreview ? 'pb-2' : 'pb-4'}`}>
                                <div className={`bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg text-white
                                     ${isPreview ? 'w-8 h-8' : 'w-12 h-12'}`}>
                                    <GraduationCap size={isPreview ? 16 : 24} />
                                </div>
                                <div>
                                    <p className={`uppercase text-indigo-300 font-bold tracking-widest ${isPreview ? 'text-[0.5rem]' : 'text-xs'}`}>
                                        Tốt nghiệp ngành
                                    </p>
                                    <p className={`font-bold text-white ${isPreview ? 'text-sm' : 'text-lg md:text-xl'}`}>
                                        {graduateInfo.major}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="flex items-start gap-2">
                                    <Calendar className={`text-amber-400 mt-1 flex-shrink-0 ${isPreview ? 'w-3 h-3' : 'w-5 h-5'}`} />
                                    <div>
                                        <p className={`font-bold text-white ${isPreview ? 'text-xs' : 'text-lg'}`}>{graduateInfo.dateFull}</p>
                                        <div className="flex items-center gap-1 text-indigo-200/80 mt-1">
                                            <Clock size={isPreview ? 10 : 14} />
                                            <span className={isPreview ? 'text-[0.65rem]' : 'text-base'}>Có mặt: {graduateInfo.time}</span>
                                        </div>
                                        {/* contact */}
                                        {!isPreview && (<div className="flex items-center gap-1 text-indigo-200/80 mt-1">
                                            <MapPin size={isPreview ? 10 : 14} />
                                            <span className={isPreview ? 'text-[0.65rem]' : 'text-base'}>Liên hệ: {graduateInfo.contact}</span>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Building2 className={`text-red-400 mt-1 flex-shrink-0 ${isPreview ? 'w-3 h-3' : 'w-5 h-5'}`} />
                                    <div>
                                        <p className={`font-bold text-white leading-tight ${isPreview ? 'text-xs' : 'text-lg'}`}>
                                            {isPreview ? graduateInfo.schoolShort : graduateInfo.school}
                                        </p>
                                        {!isPreview && (
                                            <>
                                                <p className="text-indigo-200/70 text-sm mt-1 line-clamp-2">{graduateInfo.address}</p>
                                                <a href={graduateInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-xs hover:bg-blue-600/40 transition-colors font-medium border border-blue-500/30">
                                                    <MapPin size={12} /> Xem bản đồ <ExternalLink size={10} />
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CỘT PHẢI: ẢNH --- */}
                <div className={`relative z-10 lg:w-[45%] flex flex-col items-center justify-center overflow-hidden
                     ${isPreview ? 'p-2' : 'p-6 min-h-[24rem] lg:min-h-full'}`}>

                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-blue-900/40 backdrop-blur-xl lg:rounded-r-none"></div>

                    <div className={`relative z-30 transition-transform duration-500
                        ${isPreview ? 'scale-[0.55]' : 'scale-90 md:scale-100'}`}>
                        <RevolvingTextRing
                            text={`★ ${graduateInfo.name.toUpperCase()} ★ GRADUATION 2026 ★ ${graduateInfo.schoolShort} ★ IT ENGINEER `}
                            radius={180}

                        >
                            <div className="relative group w-[clamp(12rem,35vw,16rem)] aspect-[3/4] transform-style-3d hover:rotate-y-[10deg] hover:rotate-x-[5deg] transition-all duration-700 ease-out">
                                <div className="absolute -inset-8 bg-gradient-to-t from-amber-500/20 via-purple-500/20 to-blue-500/20 rounded-[2rem] blur-[3rem] animate-pulse-slow"></div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-amber-300 via-white to-blue-300 rounded-[1.2rem] blur-md opacity-70"></div>

                                <div className="w-full h-full rounded-[1rem] overflow-hidden border-[0.35rem] border-transparent bg-clip-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
                                    style={{
                                        backgroundImage: 'linear-gradient(white, white), linear-gradient(to bottom right, #fbbf24, #e879f9, #60a5fa)',
                                        backgroundOrigin: 'border-box',
                                        backgroundClip: 'content-box, border-box'
                                    }}
                                >
                                    <img src={graduateInfo.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none"></div>
                                </div>
                                {/* logo trường */}
                                <div className="absolute -top-6 -left-6 w-16 h-16 z-30 perspective-500 group-hover:-rotate-[15deg] transition-all duration-500 delay-100">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.6)] border-[3px] border-white/30 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"></div>
                                        <img src={graduateInfo.logoUrl} alt="School Logo" className="w-full h-full object-contain drop-shadow-sm relative z-10" />
                                    </div>
                                </div>
                                {/* badge */}
                                <div className="absolute -bottom-6 -right-6 w-20 h-20 z-30 perspective-500 group-hover:rotate-[15deg] transition-all duration-500 delay-100">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.6)] border-[3px] border-amber-100 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none"></div>
                                        <div className="text-center text-amber-950 leading-[0.9] drop-shadow-sm relative z-10">
                                            <div className="text-[0.75rem] font-black tracking-widest">GRAD</div>
                                            <div className="text-[1.5rem] font-black">2026</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevolvingTextRing>
                    </div>

                    {!isPreview && (
                        <div className="mt-12 w-full max-w-md overflow-hidden mask-image-linear-gradient-to-r relative z-20">
                            <div className="flex animate-marquee gap-6 items-center whitespace-nowrap py-2">
                                {[...techStack, ...techStack].map((item, index) => (
                                    <div key={index} className="text-3xl text-white/50 hover:text-white transition-colors duration-300 filter drop-shadow-lg" style={{ color: item.color }}>
                                        <item.icon />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .transform-style-3d { transform-style: preserve-3d; }
                .perspective-500 { perspective: 500px; }
                @keyframes float { 0%, 100% { transform: translateY(0rem) rotate(0deg) scale(1); opacity: 0.15; filter: blur(2px); } 50% { transform: translateY(-2rem) rotate(10deg) scale(1.1); opacity: 0.3; filter: blur(1px); } }
                .animate-float { animation: float 20s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 30s linear infinite; }
                .mask-image-linear-gradient-to-r { mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); }
            `}</style>
        </div>
    );
};

export default GraduationCard;