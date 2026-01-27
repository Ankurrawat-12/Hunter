import { Icons } from './Icons';

interface PasteModalProps {
    isOpen: boolean;
    rawJD: string;
    jdType: string;
    isParsing: boolean;
    onClose: () => void;
    onJDChange: (value: string) => void;
    onTypeChange: (type: string) => void;
    onParse: () => void;
}

export default function PasteModal({ 
    isOpen, 
    rawJD, 
    jdType, 
    isParsing, 
    onClose, 
    onJDChange, 
    onTypeChange, 
    onParse 
}: PasteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-2xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Icons.Magic /> AI Job Parser
                </h3>
                <div className="mb-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Application Type</label>
                    <div className="flex gap-4 mt-2">
                        <button 
                            onClick={() => onTypeChange('Tech')} 
                            className={`px-4 py-2 rounded font-bold text-sm ${
                                jdType === 'Tech' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-slate-800 text-slate-400'
                            }`}
                        >
                            Tech
                        </button>
                        <button 
                            onClick={() => onTypeChange('Content')} 
                            className={`px-4 py-2 rounded font-bold text-sm ${
                                jdType === 'Content' 
                                    ? 'bg-emerald-600 text-white' 
                                    : 'bg-slate-800 text-slate-400'
                            }`}
                        >
                            Content
                        </button>
                    </div>
                </div>
                <textarea 
                    className="w-full h-48 bg-slate-800 border border-slate-700 rounded p-4 text-sm text-white focus:outline-none focus:border-blue-500 mb-4 font-mono"
                    placeholder="Paste the full Job Description text here..."
                    value={rawJD}
                    onChange={(e) => onJDChange(e.target.value)}
                ></textarea>
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 text-slate-400 hover:text-white"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onParse} 
                        disabled={isParsing} 
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold flex items-center gap-2 shadow-lg shadow-blue-900/50 disabled:opacity-50"
                    >
                        {isParsing ? 'Parsing...' : <><Icons.Magic /> Extract Info</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
