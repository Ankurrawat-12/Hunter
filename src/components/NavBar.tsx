import { Icons } from './Icons';

interface NavBtnProps {
    label: string;
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}

function NavBtn({ label, active, onClick, icon }: NavBtnProps) {
    return (
        <button 
            onClick={onClick} 
            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                active 
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-600' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
        >
            {icon} {label}
        </button>
    );
}

interface NavBarProps {
    currentView: string;
    onViewChange: (view: string) => void;
}

export default function NavBar({ currentView, onViewChange }: NavBarProps) {
    return (
        <nav className="sticky top-0 z-40 border-b border-slate-700 bg-[#0f172a]/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-green"></div>
                    <div>
                        <h1 className="text-xl font-black text-white tracking-tighter leading-none">KUROANK'S WAR ROOM</h1>
                        <p className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">Command Center v9.0</p>
                    </div>
                </div>
                <div className="hidden md:flex gap-2">
                    <NavBtn 
                        label="Mission Log" 
                        active={currentView === 'tracker'} 
                        onClick={() => onViewChange('tracker')} 
                        icon={<Icons.Target/>} 
                    />
                    <NavBtn 
                        label="Intel & Launch" 
                        active={currentView === 'intel'} 
                        onClick={() => onViewChange('intel')} 
                        icon={<Icons.Briefcase/>} 
                    />
                    <NavBtn 
                        label="Battle Plan" 
                        active={currentView === 'plan'} 
                        onClick={() => onViewChange('plan')} 
                        icon={<Icons.Zap/>} 
                    />
                    <NavBtn 
                        label="Settings" 
                        active={currentView === 'settings'} 
                        onClick={() => onViewChange('settings')} 
                        icon={<span className="text-xs">⚙️</span>} 
                    />
                </div>
            </div>
        </nav>
    );
}
