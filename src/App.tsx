import { useState, useEffect } from 'react';
import { type Job } from './types';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import StatCard from './components/StatCard';
import JobTracker from './components/JobTracker';
import IntelView from './components/IntelView';
import BattlePlan from './components/BattlePlan';
import Settings from './components/Settings';
import DetailsModal from './components/DetailsModal';
import PasteModal from './components/PasteModal';
import { Icons } from './components/Icons';

export default function WarRoomAppV9() {
    const [view, setView] = useState('tracker');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState('');
    const [mongoString, setMongoString] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [pasteModalOpen, setPasteModalOpen] = useState(false);
    const [rawJD, setRawJD] = useState('');
    const [jdType, setJdType] = useState('Tech');
    
    // Details Modal State
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);

    // Init & Persistence
    useEffect(() => {
        const saved = localStorage.getItem('kuroank_war_room_data_v9'); 
        const savedKey = localStorage.getItem('kuroank_gemini_key');
        const savedMongo = localStorage.getItem('kuroank_mongo_string');
        if (saved) {
            try { 
                setJobs(JSON.parse(saved)); 
            } catch (e) { 
                console.error(e); 
            }
        }
        if (savedKey) setApiKey(savedKey);
        if (savedMongo) setMongoString(savedMongo);
    }, []);

    useEffect(() => {
        if (jobs.length > 0) {
            localStorage.setItem('kuroank_war_room_data_v9', JSON.stringify(jobs));
        }
    }, [jobs]);

    const saveSettings = () => {
        localStorage.setItem('kuroank_gemini_key', apiKey);
        localStorage.setItem('kuroank_mongo_string', mongoString);
        notify("Settings Saved!");
    };

    const notify = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const addJob = (type: string) => {
        const newJob: Job = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            type,
            company: "",
            role: "",
            platform: "Remote Rocketship",
            status: "Applied",
            resume: type === 'Tech' ? 'Python.pdf' : 'Content.pdf',
            salary: "",
            url: "",
            email: "",
            fullJD: "",
            notes: ""
        };
        setJobs([newJob, ...jobs]);
        notify(`New ${type} App Added`);
    };

    const updateJob = (id: number, field: keyof Job, value: string) => {
        setJobs(jobs.map(j => j.id === id ? { ...j, [field]: value } : j));
        if (selectedJob && selectedJob.id === id) {
            setSelectedJob(prev => prev ? ({ ...prev, [field]: value }) : null);
        }
    };

    const deleteJob = (id: number) => {
        if(window.confirm("Delete this entry?")) {
            setJobs(jobs.filter(j => j.id !== id));
            if(detailsModalOpen && selectedJob?.id === id) {
                setDetailsModalOpen(false);
                setSelectedJob(null);
            }
            notify("Entry Deleted");
        }
    };

    const openJobDetails = (job: Job) => {
        setSelectedJob(job);
        setDetailsModalOpen(true);
    };

    const exportData = () => {
        const dataStr = JSON.stringify(jobs, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kuroank_war_room_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        notify("Backup Exported");
    };

    const copyToClip = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            notify("Copied!");
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                notify("Copied!");
            } catch (err) {
                console.error('Failed to copy', err);
                notify("Copy failed");
            }
            document.body.removeChild(textArea);
        });
    };

    // --- GEMINI PARSING LOGIC ---
    const parseJD = async () => {
        if (!apiKey) {
            alert("Please enter your Gemini API Key in the settings tab first.");
            return;
        }
        setIsParsing(true);
        
        try {
            const prompt = `Extract the following JSON from this Job Description. If a field is missing, put "N/A".
            {
                "company": "Company Name",
                "role": "Job Title",
                "salary": "Salary Range (e.g. $60k-$90k)",
                "platform": "Guess platform (e.g. Indeed, LinkedIn, Upwork) based on text or put 'Direct'",
                "tech_stack": "Key technologies listed (comma separated)"
            }
            Job Description:
            ${rawJD}`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error("Invalid API response");
            }

            const text = data.candidates[0].content.parts[0].text;
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(jsonStr);

            const newJob: Job = {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                type: jdType,
                company: parsed.company || "N/A",
                role: parsed.role || "N/A",
                salary: parsed.salary || "N/A",
                platform: parsed.platform || "Direct",
                status: "Applied",
                resume: jdType === 'Tech' ? 'Python.pdf' : 'Content.pdf',
                fullJD: rawJD,
                url: "",
                email: "",
                notes: `Stack: ${parsed.tech_stack || "N/A"}`
            };

            setJobs([newJob, ...jobs]);
            setRawJD('');
            setPasteModalOpen(false);
            notify("JD Parsed & Added!");
        } catch (error) {
            console.error("Parsing failed", error);
            alert("Failed to parse JD. Check API Key or try manual entry.");
        } finally {
            setIsParsing(false);
        }
    };

    const stats = {
        tech: jobs.filter(j => j.type === 'Tech').length,
        content: jobs.filter(j => j.type === 'Content').length,
        interview: jobs.filter(j => j.status === 'Interview').length
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-20 selection:bg-blue-500/30">
            {/* Styles for Animations & Scrollbar */}
            <style>{`
                ::-webkit-scrollbar { width: 8px; height: 8px; }
                ::-webkit-scrollbar-track { background: #1e293b; }
                ::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #64748b; }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translateY(10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                @keyframes pulse-green { 
                    0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); } 
                    70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 
                    100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } 
                }
                .animate-pulse-green { animation: pulse-green 3s infinite; }
            `}</style>

            <Notification message={notification} />

            {detailsModalOpen && selectedJob && (
                <DetailsModal
                    job={selectedJob}
                    onClose={() => setDetailsModalOpen(false)}
                    onUpdate={updateJob}
                    onDelete={deleteJob}
                />
            )}

            <PasteModal
                isOpen={pasteModalOpen}
                rawJD={rawJD}
                jdType={jdType}
                isParsing={isParsing}
                onClose={() => setPasteModalOpen(false)}
                onJDChange={setRawJD}
                onTypeChange={setJdType}
                onParse={parseJD}
            />

            <NavBar currentView={view} onViewChange={setView} />

            <div className="max-w-7xl mx-auto mt-6 px-4">
                {/* HUD */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Tech Apps" value={stats.tech} total={50} color="border-blue-500" />
                    <StatCard label="Content Apps" value={stats.content} total={50} color="border-emerald-500" />
                    <StatCard label="Interviews" value={stats.interview} total={undefined} color="border-purple-500" />
                    <div className="bg-slate-800/50 p-4 rounded border-l-4 border-orange-500 flex flex-col justify-center gap-2 backdrop-blur-md">
                        <button 
                            onClick={() => setPasteModalOpen(true)} 
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 rounded text-xs uppercase tracking-wide transition shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2"
                        >
                            <Icons.Magic /> AI Paste JD
                        </button>
                    </div>
                </div>

                {/* VIEW: TRACKER */}
                {view === 'tracker' && (
                    <JobTracker
                        jobs={jobs}
                        onAddJob={addJob}
                        onExportData={exportData}
                        onOpenJobDetails={openJobDetails}
                    />
                )}

                {/* VIEW: INTEL */}
                {view === 'intel' && (
                    <IntelView onCopy={copyToClip} />
                )}

                {/* VIEW: PLAN */}
                {view === 'plan' && (
                    <BattlePlan />
                )}

                {/* VIEW: SETTINGS */}
                {view === 'settings' && (
                    <Settings
                        apiKey={apiKey}
                        mongoString={mongoString}
                        onApiKeyChange={setApiKey}
                        onMongoStringChange={setMongoString}
                        onSave={saveSettings}
                    />
                )}
            </div>
        </div>
    );
}
