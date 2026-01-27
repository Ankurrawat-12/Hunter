import { SEARCH_STRINGS, LAUNCH_LINKS, CHEAT_SHEET } from '../constants';
import { Icons } from './Icons';

interface AnswerCardProps {
    title: string;
    text: string;
    onCopy: (text: string) => void;
}

function AnswerCard({ title, text, onCopy }: AnswerCardProps) {
    return (
        <div className="bg-slate-900 border border-slate-700 p-4 rounded relative group hover:border-blue-500/50 transition">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 group-hover:text-blue-400">{title}</p>
            <p className="text-sm text-white">{text}</p>
            <button 
                onClick={() => onCopy(text)} 
                className="absolute top-2 right-2 p-2 bg-slate-800 rounded text-slate-400 hover:text-white hover:bg-blue-600 transition opacity-0 group-hover:opacity-100"
            >
                <Icons.Copy />
            </button>
        </div>
    );
}

interface IntelViewProps {
    onCopy: (text: string) => void;
}

export default function IntelView({ onCopy }: IntelViewProps) {
    return (
        <div className="animate-fade-in space-y-8">
            {/* 1. Launchpad */}
            <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-6">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                    <Icons.ExternalLink /> MISSION LAUNCHPAD
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {LAUNCH_LINKS.map((link, i) => (
                        <a 
                            key={i} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`p-4 rounded-lg transition group block text-center border-2 shadow-lg ${link.color}`}
                        >
                            <div className="flex justify-between items-start mb-2 opacity-80">
                                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded font-bold text-white/90">
                                    Tier {link.tier}
                                </span>
                                <Icons.ExternalLink />
                            </div>
                            <p className="text-sm font-bold text-white tracking-wide">{link.name}</p>
                            <p className="text-[10px] text-white/70 uppercase mt-1 font-bold">{link.type}</p>
                        </a>
                    ))}
                </div>
            </div>

            {/* 2. Search Generators */}
            <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-6">
                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                    <Icons.Search /> BOOLEAN SEARCH GENERATOR
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SEARCH_STRINGS.map((s, i) => (
                        <div 
                            key={i} 
                            onClick={() => onCopy(s.val)} 
                            className="bg-slate-900 p-3 rounded border border-slate-700 cursor-pointer hover:border-blue-500 group transition"
                        >
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{s.label}</p>
                            <p className="text-xs text-green-400 font-mono truncate group-hover:text-white">{s.val}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Cheat Sheets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tech Intel */}
                <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-1 backdrop-blur-sm">
                    <div className="bg-blue-900/20 p-4 rounded-t-lg border-b border-blue-900/30 flex items-center justify-between">
                        <h3 className="font-bold text-blue-400 flex items-center gap-2">
                            <Icons.Code /> TECH CHEAT SHEET
                        </h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                        <AnswerCard 
                            title="Cover Letter Hook" 
                            text="I don't just write code; I fix scaling issues. At Trilogy, I reduced p95 latency from 280ms to 115ms and handled 8k concurrent users on FastAPI. I ship production code daily." 
                            onCopy={onCopy} 
                        />
                        {CHEAT_SHEET.Tech.map((item, i) => (
                            <div key={i} className="group relative bg-slate-800/50 p-4 rounded border border-slate-700/50 hover:border-blue-500/50 transition">
                                <p className="text-xs font-bold text-blue-400 uppercase mb-2">{item.q}</p>
                                <p className="text-sm text-slate-300">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Content Intel */}
                <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-1 backdrop-blur-sm">
                    <div className="bg-emerald-900/20 p-4 rounded-t-lg border-b border-emerald-900/30 flex items-center justify-between">
                        <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                            <Icons.Briefcase /> CONTENT CHEAT SHEET
                        </h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                        <AnswerCard 
                            title="Cover Letter Hook" 
                            text="Most writers can't read code. I can. I am a Senior Full-Stack Engineer who writes. I build the API, then I write the documentation and the SEO strategy to sell it." 
                            onCopy={onCopy} 
                        />
                        {CHEAT_SHEET.Content.map((item, i) => (
                            <div key={i} className="group relative bg-slate-800/50 p-4 rounded border border-slate-700/50 hover:border-emerald-500/50 transition">
                                <p className="text-xs font-bold text-emerald-400 uppercase mb-2">{item.q}</p>
                                <p className="text-sm text-slate-300">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
