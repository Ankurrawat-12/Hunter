import { BATTLE_PLAN } from '../constants';
import { Icons } from './Icons';

export default function BattlePlan() {
    return (
        <div className="animate-fade-in max-w-3xl mx-auto">
            <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-8 relative backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-b border-slate-700 pb-4 text-white">
                    <Icons.Zap /> Daily Protocol (PDF1 + TT.pdf)
                </h2>
                <div className="absolute left-12 top-24 bottom-12 w-0.5 bg-slate-700"></div>
                <div className="space-y-8">
                    {BATTLE_PLAN.map((item, i) => (
                        <div key={i} className="relative pl-12">
                            <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-2 ${item.color} bg-slate-900 flex items-center justify-center font-bold text-xs z-10 text-slate-300`}>
                                {i + 1}
                            </div>
                            <div className={`bg-slate-800/50 p-4 rounded-lg border-l-4 ${item.color} hover:bg-slate-800 transition group`}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="font-mono text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                                        {item.time}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
