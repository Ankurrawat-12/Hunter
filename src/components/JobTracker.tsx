import { type Job } from '../types';
import { Icons } from './Icons';

interface JobTrackerProps {
    jobs: Job[];
    onAddJob: (type: string) => void;
    onExportData: () => void;
    onOpenJobDetails: (job: Job) => void;
}

export default function JobTracker({ jobs, onAddJob, onExportData, onOpenJobDetails }: JobTrackerProps) {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Icons.Target /> Mission Log
                </h2>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onAddJob('Tech')} 
                        className="bg-blue-600/20 text-blue-400 border border-blue-600/50 hover:bg-blue-600 hover:text-white px-3 py-1 rounded text-xs font-bold transition"
                    >
                        + Tech Manual
                    </button>
                    <button 
                        onClick={() => onAddJob('Content')} 
                        className="bg-emerald-600/20 text-emerald-400 border border-emerald-600/50 hover:bg-emerald-600 hover:text-white px-3 py-1 rounded text-xs font-bold transition"
                    >
                        + Content Manual
                    </button>
                    <button 
                        onClick={onExportData} 
                        className="text-slate-500 hover:text-white p-2 rounded hover:bg-slate-800" 
                        title="Backup to JSON"
                    >
                        <Icons.Download/>
                    </button>
                </div>
            </div>

            <div className="bg-[#1e293b]/50 rounded-xl overflow-hidden border border-slate-700 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-[#0f172a]/90 text-xs uppercase font-bold text-slate-400 border-b border-slate-700">
                            <tr>
                                <th className="p-4 w-32">Date</th>
                                <th className="p-4 w-24">Type</th>
                                <th className="p-4">Company</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 w-20 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {jobs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500 italic">
                                        No missions logged. Paste a JD or add manually.
                                    </td>
                                </tr>
                            )}
                            {jobs.map(job => (
                                <tr 
                                    key={job.id} 
                                    onClick={() => onOpenJobDetails(job)} 
                                    className="hover:bg-slate-700/30 transition cursor-pointer group"
                                >
                                    <td className="p-4 font-mono text-xs text-slate-500">{job.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide border ${
                                            job.type === 'Tech' 
                                                ? 'bg-blue-900/30 text-blue-300 border-blue-800' 
                                                : 'bg-emerald-900/30 text-emerald-300 border-emerald-800'
                                        }`}>
                                            {job.type}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {job.company || <span className="text-slate-600 italic">Untitled</span>}
                                    </td>
                                    <td className="p-4 text-slate-300">
                                        {job.role || <span className="text-slate-600 italic">Untitled Role</span>}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            job.status === 'Interview' 
                                                ? 'bg-green-900/50 text-green-400 border border-green-800' 
                                                : 'text-slate-400 bg-slate-800/50'
                                        }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-slate-500 hover:text-white transition p-1 hover:bg-slate-700 rounded">
                                            <Icons.Edit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
