interface StatCardProps {
    label: string;
    value: number;
    total?: number;
    color: string;
}

export default function StatCard({ label, value, total, color }: StatCardProps) {
    return (
        <div className={`bg-slate-800/60 p-4 rounded border-l-4 ${color} backdrop-blur-md shadow-lg`}>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-mono font-bold text-white mt-1">
                {value} <span className="text-slate-600 text-sm">{total !== undefined ? `/ ${total}` : ''}</span>
            </p>
        </div>
    );
}
