import { MapPin, Calendar, ExternalLink, X } from 'lucide-react';
import { BiLogoJava } from 'react-icons/bi';
import {
    SiReact, SiNodedotjs, SiPython, SiJavascript, SiCplusplus,
    SiMongodb, SiGit, SiDocker,
    SiTypescript
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import RevolvingTextRing from './RevolvingTextRing';

const GraduationCard = ({ onClose }: { onClose: () => void }) => {
    const name = new URLSearchParams(window.location.search).get('name') || 'Bạn';

    const graduateInfo = {
        name: "Trung Kiên",
        major: "Công Nghệ Thông Tin",
        school: "Trường Đại Học Công Nghệ Kỹ Thuật TP.HCM",
        address: "Số 1 Võ Văn Ngân, phường Linh Chiểu, Thủ Đức, TP.HCM",
        date: "Sáng Thứ Bảy, 24/01/2026",
        time: "10:30",
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

    const getRandomPosition = (index: number) => {
        const seed = index * 137;
        const top = (seed % 85) + 5;
        const left = ((seed * 3) % 85) + 5;
        const delay = (seed % 5) * 0.5;
        const duration = 15 + (seed % 10);
        // Sử dụng đơn vị rem cho kích thước icon bay lơ lửng
        const size = (seed % 3) === 0 ? 'text-[2.5rem]' : (seed % 3) === 1 ? 'text-[3rem]' : 'text-[3.5rem]';
        return { top: `${top}%`, left: `${left}%`, delay: `${delay}s`, duration: `${duration}s`, size };
    };

    return (
        <div className="w-full h-full bg-slate-50 relative font-sans overflow-hidden flex flex-col">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

            {onClose && (
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-[1rem] right-[1rem] z-50 p-[0.5rem] bg-white/80 hover:bg-red-100 text-gray-600 hover:text-red-500 rounded-full transition-colors shadow-md"
                >
                    <X size={20} />
                </button>
            )}

            <div className="relative w-full h-full bg-white/90 backdrop-blur-xl flex flex-col lg:flex-row overflow-y-auto">

                {/* Backdrop Icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {techStack.map((item, index) => {
                        const pos = getRandomPosition(index);
                        return (
                            <div
                                key={index}
                                className={`absolute animate-float opacity-10 filter blur-[1px] mix-blend-multiply ${pos.size}`}
                                style={{
                                    left: pos.left,
                                    top: pos.top,
                                    animationDelay: pos.delay,
                                    animationDuration: pos.duration,
                                    color: item.color
                                }}
                            >
                                <item.icon />
                            </div>
                        )
                    })}
                </div>

                {/* --- CỘT TRÁI: THÔNG TIN --- */}
                <div className="relative z-10 p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center space-y-[1.5rem] lg:w-1/2">
                    <div className="text-center lg:text-left">
                        <h1 className="text-[1.25rem] md:text-[1.75rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 mb-[0.5rem]">
                            LỄ TỐT NGHIỆP CỦA {graduateInfo.name.toUpperCase()}
                        </h1>
                        <div className="w-[4rem] h-[0.25rem] bg-gradient-to-r from-blue-600 to-purple-600 mx-auto lg:mx-0 rounded-full"></div>
                    </div>

                    <div className="space-y-[1rem]">
                        <div>
                            <span className="text-[0.9rem] md:text-[1rem] text-gray-600 flex gap-1 font-medium justify-center lg:justify-start">
                                <span className='text-blue-600 font-bold'>{graduateInfo.name}</span> Trân trọng kính mời
                            </span>
                            <h2 className="text-[1.8rem] md:text-[2.5rem] font-black text-blue-800 tracking-wide text-center lg:text-left mt-[0.25rem] leading-tight">
                                {name.toUpperCase()}
                            </h2>
                        </div>

                        <div className="space-y-[0.75rem] p-[1rem] bg-white/60 rounded-[0.75rem] shadow-sm border border-blue-50">
                            <div className="flex items-center gap-[0.75rem]">
                                <div className="w-[2rem] h-[2rem] bg-blue-100 rounded-[0.5rem] flex items-center justify-center flex-shrink-0">
                                    {/* <div className="w-[1rem] h-[1rem] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[0.2rem]"></div> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[1.2rem] h-[1.2rem] text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[0.6rem] uppercase text-gray-500 font-bold tracking-wider">Ngành</p>
                                    <p className="font-bold text-gray-800 text-[0.9rem]">{graduateInfo.major}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-[0.5rem] text-[0.85rem]">
                                <div className="flex items-start gap-[0.5rem]">
                                    <Calendar className="w-[1rem] h-[1rem] text-purple-600 mt-[0.2rem]" />
                                    <div>
                                        <p className="font-bold text-gray-800">{graduateInfo.date}</p>
                                        <p className="text-gray-500 text-[0.75rem]">Có mặt: {graduateInfo.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-[0.5rem]">
                                    <MapPin className="w-[1rem] h-[1rem] text-red-600 mt-[0.2rem]" />
                                    <div>
                                        <p className="font-bold text-gray-800 leading-tight">{graduateInfo.school}</p>
                                        <a href={graduateInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-[0.75rem] hover:underline flex items-center gap-1 mt-[0.25rem]">
                                            Xem bản đồ <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CỘT PHẢI: ẢNH & DECORATION --- */}
                <div className="relative z-10 lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-[1.5rem] flex flex-col items-center justify-center min-h-[20rem] lg:min-h-full">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: "12rem" }}></div>
                     <RevolvingTextRing
                        text="HUỲNH TRUNG KIÊN ★ CONGRATULATIONS ON YOUR GRADUATION ★ 2026 ★ "
                        radius={200}
                        rotateX={10}
                        rotateZ={15}
                    >
                    <RevolvingTextRing
                        text="HCMC UNIVERSITY OF TECHNOLOGY AND ENGINEERING ★ INFORMATION TECHNOLOGY ★ "
                        radius={200}
                        rotateX={-10}
                        rotateZ={-15}
                    >
                        <div className="relative group w-[clamp(10rem,30vw,14rem)] aspect-[3/4]">
                        <div className="absolute -inset-[1rem] bg-gradient-to-t from-purple-500/30 to-blue-400/30 rounded-full blur-[2rem] animate-pulse-slow"></div>
                        <div className="w-full h-full rounded-[1rem] overflow-hidden border-[0.25rem] border-white/90 shadow-2xl relative z-10">
                            <img src={graduateInfo.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        {/* Badge */}
                        <div className="absolute -bottom-[1rem] -right-[1rem] w-[4rem] h-[4rem] bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-[0.15rem] border-white z-20 rotate-12 group-hover:rotate-0 transition duration-500">
                            <div className="text-center text-yellow-900 leading-tight">
                                <div className="text-[0.6rem] font-black">GRAD</div>
                                <div className="text-[0.9rem] font-black">2026</div>
                            </div>
                        </div>
                        {/* logo */}
                        <div className="absolute -top-[1rem] -left-[1rem] flex items-center justify-center shadow-md z-20 -rotate-20 border-[0.15rem] border-white bg-white/90 rounded-full w-[3.5rem] h-[3.5rem] group-hover:-rotate-0 transition duration-500">
                            <img src={graduateInfo.logoUrl} alt="School Logo" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    
                    </RevolvingTextRing>
                    </RevolvingTextRing>
                    {/* Marquee Icons */}
                    <div className="mt-[2rem] w-full overflow-hidden mask-image-linear-gradient-to-r">
                        <div className="flex animate-marquee gap-[1rem] items-center whitespace-nowrap">
                            {[...techStack, ...techStack].map((item, index) => (
                                <div key={index} className="text-[1.5rem] text-white/70">
                                    <item.icon />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0rem) rotate(0deg); opacity: 0.1; }
                    50% { transform: translateY(-0.75rem) rotate(5deg); opacity: 0.3; }
                }
                .animate-float { animation: float 15s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .mask-image-linear-gradient-to-r {
                    mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
                }
            `}</style>
        </div>
    );
};

export default GraduationCard;