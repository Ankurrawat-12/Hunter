interface SettingsProps {
    apiKey: string;
    mongoString: string;
    onApiKeyChange: (value: string) => void;
    onMongoStringChange: (value: string) => void;
    onSave: () => void;
}

export default function Settings({ 
    apiKey, 
    mongoString, 
    onApiKeyChange, 
    onMongoStringChange, 
    onSave 
}: SettingsProps) {
    return (
        <div className="animate-fade-in max-w-xl mx-auto">
            <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-8 space-y-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    Settings & Configuration
                </h2>
                
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                        Google Gemini API Key
                    </label>
                    <input 
                        type="password" 
                        value={apiKey} 
                        onChange={(e) => onApiKeyChange(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Paste API Key here..."
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        Required for "AI Paste JD" feature.
                    </p>
                </div>

                <div>
                    <label className="text-xs font-bold text-green-500 uppercase mb-2 block">
                        MongoDB Connection String
                    </label>
                    <input 
                        type="text" 
                        value={mongoString} 
                        onChange={(e) => onMongoStringChange(e.target.value)}
                        className="w-full bg-slate-900 border border-green-700 rounded p-2 text-green-400 focus:border-green-500 focus:outline-none font-mono text-xs"
                        placeholder="mongodb+srv://..."
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        Stored securely in local browser storage for future backend integration.
                    </p>
                </div>

                <button 
                    onClick={onSave} 
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full shadow-lg shadow-blue-900/50"
                >
                    Save All Settings
                </button>
            </div>
        </div>
    );
}
