import { type Job } from '../types';
import { Icons } from './Icons';

interface DetailsModalProps {
    job: Job;
    onClose: () => void;
    onUpdate: (id: number, field: keyof Job, value: string) => void;
    onDelete: (id: number) => void;
}

export default function DetailsModal({ job, onClose, onUpdate, onDelete }: DetailsModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-[#0f172a] border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-900/50 rounded-t-2xl">
                    <div className="w-full mr-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide border ${
                                job.type === 'Tech' 
                                    ? 'bg-blue-900/30 text-blue-300 border-blue-800' 
                                    : 'bg-emerald-900/30 text-emerald-300 border-emerald-800'
                            }`}>
                                {job.type}
                            </span>
                            <input 
                                value={job.role} 
                                onChange={(e) => onUpdate(job.id, 'role', e.target.value)}
                                className="bg-transparent text-xl font-bold text-white focus:outline-none w-full placeholder-slate-500"
                                placeholder="Job Role Title"
                            />
                        </div>
                        <input 
                            value={job.company} 
                            onChange={(e) => onUpdate(job.id, 'company', e.target.value)}
                            className="bg-transparent text-lg text-blue-400 focus:outline-none w-full placeholder-blue-900/50 font-bold"
                            placeholder="Company Name"
                        />
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition bg-slate-800 p-2 rounded-full">
                        <Icons.Trash />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0f172a]">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Status</label>
                            <select 
                                value={job.status} 
                                onChange={(e) => onUpdate(job.id, 'status', e.target.value)} 
                                className={`w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 font-bold ${
                                    job.status === 'Interview' 
                                        ? 'text-green-400 border-green-500' 
                                        : 'text-slate-300'
                                }`}
                            >
                                <option>Applied</option>
                                <option>Replied</option>
                                <option>Interview</option>
                                <option>Rejected</option>
                                <option>Offer</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Application URL</label>
                            <div className="flex gap-2 mt-1">
                                <input 
                                    value={job.url || ''} 
                                    onChange={(e) => onUpdate(job.id, 'url', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-blue-400 focus:outline-none"
                                    placeholder="https://..."
                                />
                                {job.url && (
                                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded flex items-center justify-center">
                                        <Icons.ExternalLink />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Contact Email</label>
                            <input 
                                value={job.email || ''} 
                                onChange={(e) => onUpdate(job.id, 'email', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 text-sm text-white focus:outline-none"
                                placeholder="recruiter@company.com"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Salary</label>
                                <input 
                                    value={job.salary} 
                                    onChange={(e) => onUpdate(job.id, 'salary', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 text-sm text-green-400 font-mono focus:outline-none"
                                    placeholder="N/A"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Platform</label>
                                <select 
                                    value={job.platform} 
                                    onChange={(e) => onUpdate(job.id, 'platform', e.target.value)} 
                                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 text-sm text-slate-300 focus:outline-none"
                                >
                                    <option>Remote Rocketship</option>
                                    <option>Wellfound</option>
                                    <option>Indeed</option>
                                    <option>Superpath</option>
                                    <option>We Work Remotely</option>
                                    <option>Upwork</option>
                                    <option>Reddit/Discord</option>
                                    <option>Direct/Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 h-full flex flex-col">
                        <div className="flex-1 flex flex-col">
                            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Full Job Description</label>
                            <textarea 
                                value={job.fullJD || ''} 
                                onChange={(e) => onUpdate(job.id, 'fullJD', e.target.value)}
                                className="w-full flex-1 bg-slate-800 border border-slate-700 rounded p-3 text-xs text-slate-300 font-mono focus:outline-none resize-none leading-relaxed"
                                placeholder="Paste the full JD here for safekeeping..."
                                style={{ minHeight: '150px' }}
                            ></textarea>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Notes / Stack</label>
                            <textarea 
                                value={job.notes || ''} 
                                onChange={(e) => onUpdate(job.id, 'notes', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-sm text-white focus:outline-none h-24 resize-none"
                                placeholder="Key tech stack, contact names, interview notes..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-700 bg-slate-900/50 rounded-b-2xl flex justify-between items-center">
                    <button 
                        onClick={() => onDelete(job.id)} 
                        className="text-red-500 hover:text-red-400 text-sm font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-900/20 rounded"
                    >
                        <Icons.Trash /> Delete Log
                    </button>
                    <button 
                        onClick={onClose} 
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded font-bold text-sm shadow-lg shadow-blue-900/50"
                    >
                        Save & Close
                    </button>
                </div>
            </div>
        </div>
    );
}
