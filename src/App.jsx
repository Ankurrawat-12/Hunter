import React, { useState, useEffect } from 'react';

// --- ICONS ---
const Icons = {
    Target: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    Code: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    Briefcase: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Zap: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    Copy: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    Magic: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    Search: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    Edit: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
    ExternalLink: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
};

// --- DATA ---
const SEARCH_STRINGS = [
    // TECH: Python & Backend Focused
    { label: "Python Sniper (Indeed)", val: 'title:(Python OR FastAPI OR Django) AND (Remote) AND ("Contract" OR "C2C" OR "Corp-to-Corp" OR "US Shift") -hybrid -volunteer' },
    { label: "Hidden Gem Finder (LinkedIn)", val: '("Python" OR "FastAPI") AND "Remote" AND ("Hiring" OR "Urgent") AND ("Startup" OR "Greenfield")' },
    { label: "ATS Aggregator (Google Jobs)", val: 'intitle:"Senior Backend Engineer" (Python OR FastAPI) site:lever.co OR site:greenhouse.io "Remote"' },
    { label: "Startup Python (Wellfound)", val: 'Keywords: Python, FastAPI, System Design Location Filter: Worldwide OR Anywhere' },
    
    // TECH: JavaScript / Full-Stack (React/Node)
    { label: "Full-Stack Senior (Indeed)", val: 'title:(React OR "Full Stack" OR "Frontend") AND (Node OR TypeScript) AND (Remote) AND ("Senior" OR "Lead") -entry -junior' },
    { label: "React Contract (LinkedIn)", val: '("React" OR "Next.js") AND "Contract" AND "Remote" AND ("Urgent" OR "Immediate")' },
    { label: "Full-Stack Reddit", val: '[Hiring] (React OR "Full Stack" OR "Next.js") remote' },
    
    // CONTENT: B2B SaaS & Technical Writing
    { label: "Content Strategist (Indeed)", val: 'title:("Technical Writer" OR "Content Strategist" OR "Developer Advocate") AND (SaaS OR B2B OR API) AND (Remote)' },
    { label: "Head of Content (LinkedIn)", val: '("Content Manager" OR "Head of Content") AND "SaaS" AND "Remote" AND "Hiring"' },
    { label: "Guest Posting (Google)", val: '"write for us" AND ("SaaS" OR "Tech" OR "Software") AND "paid"' },
    
    // FREELANCE: Guerrilla Tactics
    { label: "Real-time Hiring (Twitter/X)", val: '"hiring" AND ("developer" OR "writer") AND "remote" -is:retweet -filter:links' },
    { label: "Pain Point Search (Twitter/X)", val: '"looking for" AND ("FastAPI developer" OR "technical writer")' },
    { label: "General Freelance (Reddit)", val: 'subreddit:forhire OR subreddit:freelanceWriters "[Hiring]"' },
    
    // Legacy searches (keeping for compatibility)
    { label: "Tech (Indeed - Legacy)", val: 'title:(Python OR FastAPI) AND (Remote) AND ("Contract" OR "Global" OR "US Shift") -hybrid' },
    { label: "Content (Indeed - Legacy)", val: 'title:("Technical Writer" OR "Content Strategist") AND (SaaS OR B2B) AND (Remote)' },
    { label: "Tech Freelance (Reddit - Legacy)", val: '[Hiring] (FastAPI OR Python OR React) remote' },
    { label: "Tech (LinkedIn - 24h)", val: '"Python" AND "Remote" AND ("Contract" OR "Freelance")' },
    { label: "SaaS Content (LinkedIn)", val: '"Technical Writer" AND "SaaS" AND "Remote"' },
    { label: "Global Tech (Wellfound)", val: 'Location: Worldwide; Role: Backend Engineer; Salary: >$50k' },
    { label: "Freelance (Twitter/X - Legacy)", val: '"hiring" AND ("writer" OR "developer") AND "remote" -is:retweet' },
    { label: "Content Marketing (Superpath)", val: 'Role: Content Strategist; Type: B2B SaaS' },
    { label: "React Contract (Indeed - Legacy)", val: 'title:(React OR "Frontend Engineer") AND (Remote) AND (Contract) -Senior' }
];

const LAUNCH_LINKS = [
    { name: "Remote Rocketship", url: "https://remoterocketship.com", type: "Tech/Content", tier: "A", color: "bg-blue-600 hover:bg-blue-500 border-blue-500" },
    { name: "Wellfound (AngelList)", url: "https://wellfound.com/jobs", type: "Tech", tier: "A", color: "bg-slate-700 hover:bg-slate-600 border-slate-500" },
    { name: "Superpath", url: "https://superpath.co/jobs", type: "Content", tier: "A", color: "bg-purple-600 hover:bg-purple-500 border-purple-500" },
    { name: "We Work Remotely", url: "https://weworkremotely.com", type: "Tech/Content", tier: "A", color: "bg-red-600 hover:bg-red-500 border-red-500" },
    { name: "Indeed (US)", url: "https://www.indeed.com", type: "Volume", tier: "B", color: "bg-blue-500 hover:bg-blue-400 border-blue-400" },
    { name: "ProBlogger", url: "https://problogger.com/jobs/", type: "Content", tier: "B", color: "bg-orange-600 hover:bg-orange-500 border-orange-500" },
    { name: "Upwork", url: "https://upwork.com", type: "Freelance", tier: "B", color: "bg-emerald-600 hover:bg-emerald-500 border-emerald-500" },
    { name: "Freelancer.com", url: "https://www.freelancer.com", type: "Freelance", tier: "B", color: "bg-indigo-600 hover:bg-indigo-500 border-indigo-500" },
    { name: "Hacker News (Jobs)", url: "https://news.ycombinator.com/jobs", type: "Tech", tier: "A", color: "bg-orange-500 hover:bg-orange-400 border-orange-400" },
    { name: "Reddit (ForHire)", url: "https://www.reddit.com/r/forhire/", type: "Freelance", tier: "B", color: "bg-orange-700 hover:bg-orange-600 border-orange-600" },
    { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", type: "Volume", tier: "B", color: "bg-blue-700 hover:bg-blue-600 border-blue-600" }
];

const CHEAT_SHEET = {
    Tech: [
        { q: "Tell me about yourself (Hook)", a: "I'm a software engineer focused on building reliable web products end-to-end. My strengths are clean API design, data performance, and shipping in remote teams. At Trilogy, I reduced p95 latency from 280ms to 115ms. I'm looking for a role where I can own meaningful features." },
        { q: "What is p95?", a: "Latency value where 95% of requests are faster than this threshold. Averages hide the pain users feel; percentiles reveal the real UX." },
        { q: "How did you improve latency?", a: "1. Fixed N+1 query patterns. 2. Added indexes on high-traffic columns. 3. Introduced Redis caching for hot reads. 4. Reduced payload size via shaping." },
        { q: "Why Redis?", a: "Low-latency caching, rate counters, and distributed locks. Tradeoff is in-memory volatility (data loss on crash), but speed is worth it for transient data." },
        { q: "FastAPI vs Django?", a: "FastAPI for high-performance I/O bound APIs and clean validation (Pydantic). Django when we need 'batteries included' (Admin, ORM, Auth) for velocity." },
        { q: "Async worth it?", a: "Yes for I/O bound (Network/DB). No for CPU bound (use multiprocessing)." },
        { q: "Idempotency Strategy?", a: "Using Idempotency Keys in headers. On retry, server checks key -> returns cached response if processed, or processes if new. Prevents double-billing." }
    ],
    Content: [
        { q: "Tell me about yourself (Hook)", a: "I'm a content strategist focused on driving traffic and signups, not just 'writing words'. My strength is translating complex technical features into clear benefits. At Vision Forge, my 20-part series drove significant organic traffic." },
        { q: "Why Content?", a: "I like taking messy, complex ideas and structuring them into something people actually use. The feedback loop is direct: if content is good, engagement metrics go up." },
        { q: "Your Process?", a: "Research -> Intent Mapping -> Outline -> Draft -> Stakeholder Review. I outline early to prevent major rewrites later." },
        { q: "SEO Approach?", a: "Search Intent first. I analyze the SERP to see what users want, then build an outline that answers it better than the top result. Keywords support the piece, they don't drive it." },
        { q: "Handling AI?", a: "I use AI as a speed tool for outlining and variations, never as a truth tool. I rewrite everything to ensure brand voice and factual accuracy." }
    ]
};

const BATTLE_PLAN = [
    { time: "09:00", title: "Wake Up & Reset", desc: "Cold water. No phone. Mental prep.", color: "border-slate-500" },
    { time: "10:00 - 12:00", title: "Study Block", desc: "LeetCode + System Design + English. NO APPS.", color: "border-yellow-500" },
    { time: "12:00 - 14:00", title: "TECH App Engine", desc: "25 Tier A (Rocketship/Wellfound) + 25 Tier B (Indeed). Resume: Python.pdf", color: "border-blue-500" },
    { time: "14:00 - 16:00", title: "CONTENT App Engine", desc: "50 Apps. Superpath + WWR + ProBlogger. Resume: Content.pdf", color: "border-emerald-500" },
    { time: "16:00 - 18:00", title: "Tech Freelance", desc: "Upwork (FastAPI) + Discord Hunting. NO Content Freelance.", color: "border-purple-500" },
    { time: "18:30", title: "Physical Reset", desc: "MMA / Heavy Lifting.", color: "border-red-500" }
];

// --- SUB COMPONENTS ---
const NavBtn = ({ label, active, onClick, icon }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${active ? 'bg-slate-800 text-white shadow-inner border border-slate-600' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
        {icon} {label}
    </button>
);

const NavBtnMobile = ({ label, active, onClick, icon }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full p-2 rounded ${active ? 'text-blue-400' : 'text-slate-500'}`}>
        {icon} <span className="text-[10px] font-bold mt-1">{label}</span>
    </button>
);

const StatCard = ({ label, value, total, color }) => (
    <div className={`bg-slate-800/60 p-4 rounded border-l-4 ${color} backdrop-blur-md shadow-lg`}>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-mono font-bold text-white mt-1">{value} <span className="text-slate-600 text-sm">{total ? `/ ${total}` : ''}</span></p>
    </div>
);

const AnswerCard = ({ title, text, onCopy }) => (
    <div className="bg-slate-900 border border-slate-700 p-4 rounded relative group hover:border-blue-500/50 transition">
        <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 group-hover:text-blue-400">{title}</p>
        <p className="text-sm text-white">{text}</p>
        <button onClick={() => onCopy(text)} className="absolute top-2 right-2 p-2 bg-slate-800 rounded text-slate-400 hover:text-white hover:bg-blue-600 transition opacity-0 group-hover:opacity-100">
            <Icons.Copy />
        </button>
    </div>
);

// Alert Modal Component
const AlertModal = ({ isOpen, message, type = 'alert', onClose, onConfirm }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-[#0f172a] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6">
                <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        type === 'error' ? 'bg-red-900/30 border border-red-800' : 
                        type === 'confirm' ? 'bg-yellow-900/30 border border-yellow-800' : 
                        'bg-blue-900/30 border border-blue-800'
                    }`}>
                        {type === 'error' ? (
                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : type === 'confirm' ? (
                            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">
                            {type === 'error' ? 'Error' : type === 'confirm' ? 'Confirm Action' : 'Alert'}
                        </h3>
                        <p className="text-slate-300">{message}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    {type === 'confirm' ? (
                        <>
                            <button 
                                onClick={onClose} 
                                className="px-4 py-2 text-slate-400 hover:text-white transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={onConfirm} 
                                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition shadow-lg shadow-red-900/50"
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition shadow-lg shadow-blue-900/50"
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [view, setView] = useState('tracker');
    const [jobs, setJobs] = useState([]);
    const [notification, setNotification] = useState(null);
    // Get API key and MongoDB string from environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const mongoString = import.meta.env.VITE_MONGODB_CONNECTION_STRING || '';
    const [isParsing, setIsParsing] = useState(false);
    const [pasteModalOpen, setPasteModalOpen] = useState(false);
    const [rawJD, setRawJD] = useState('');
    const [jdType, setJdType] = useState('Tech');
    
    // Details Modal State
    const [selectedJob, setSelectedJob] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    
    // Alert/Confirm Modal State
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('alert'); // 'alert', 'error', 'confirm'
    const [confirmCallback, setConfirmCallback] = useState(null);

    // Init & Persistence
    useEffect(() => {
        const saved = localStorage.getItem('kuroank_war_room_data_v9'); 
        if (saved) {
            try { setJobs(JSON.parse(saved)); } catch (e) { console.error(e); }
        }
    }, []);

    useEffect(() => {
        if (jobs.length > 0) localStorage.setItem('kuroank_war_room_data_v9', JSON.stringify(jobs));
    }, [jobs]);

    const saveSettings = () => {
        // Settings are now read from environment variables (.env.local)
        // No need to save to localStorage
        notify("Settings are loaded from environment variables (.env.local)");
    };

    const notify = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const showAlert = (message, type = 'alert') => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertModalOpen(true);
    };

    const showConfirm = (message, onConfirm) => {
        setAlertMessage(message);
        setAlertType('confirm');
        setConfirmCallback(() => onConfirm);
        setAlertModalOpen(true);
    };

    const handleAlertClose = () => {
        setAlertModalOpen(false);
        setAlertMessage('');
        setConfirmCallback(null);
    };

    const handleConfirm = () => {
        if (confirmCallback) {
            confirmCallback();
        }
        handleAlertClose();
    };

    const addJob = (type) => {
        const newJob = {
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

    const updateJob = (id, field, value) => {
        setJobs(jobs.map(j => j.id === id ? { ...j, [field]: value } : j));
        if (selectedJob && selectedJob.id === id) {
            setSelectedJob(prev => ({ ...prev, [field]: value }));
        }
    };

    const deleteJob = (id) => {
        showConfirm("Delete this entry?", () => {
            setJobs(jobs.filter(j => j.id !== id));
            if(detailsModalOpen && selectedJob?.id === id) {
                setDetailsModalOpen(false);
                setSelectedJob(null);
            }
            notify("Entry Deleted");
        });
    };

    const openJobDetails = (job) => {
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
        notify("Backup Exported");
    };

    const copyToClip = (text) => {
        // Simple clipboard copy for modern browsers
        navigator.clipboard.writeText(text).then(() => {
            notify("Copied!");
        }, (err) => {
            console.error('Failed to copy: ', err);
            notify("Copy failed");
        });
    };

    // --- GEMINI PARSING LOGIC ---
    const parseJD = async () => {
        if (!apiKey) {
            showAlert("Please enter your Gemini API Key in the settings tab first.", 'error');
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
                "tech_stack": "Key technologies listed (comma separated)",
                "email": "Contact email address if mentioned (e.g. jobs@company.com, recruiter@company.com). Extract from text, links, or application instructions.",
                "job_description": "Clean, well-formatted job description text. Remove any headers, footers, or platform-specific formatting. Keep all important details about responsibilities, requirements, and benefits. Format with proper line breaks for readability."
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

            const data = await response.json();
            const text = data.candidates[0].content.parts[0].text;
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(jsonStr);

            const newJob = {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                type: jdType,
                company: parsed.company,
                role: parsed.role,
                salary: parsed.salary,
                platform: parsed.platform,
                status: "Applied",
                resume: jdType === 'Tech' ? 'Python.pdf' : 'Content.pdf',
                fullJD: parsed.job_description || rawJD,
                url: "",
                email: parsed.email || "",
                notes: `Stack: ${parsed.tech_stack}`
            };

            setJobs([newJob, ...jobs]);
            setRawJD('');
            setPasteModalOpen(false);
            notify("JD Parsed & Added!");
        } catch (error) {
            console.error("Parsing failed", error);
            showAlert("Failed to parse JD. Check API Key or try manual entry.", 'error');
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
            
            {/* NOTIFICATION */}
            {notification && (
                <div className="fixed top-4 right-4 z-[60] bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in font-bold border border-green-400">
                    {notification}
                </div>
            )}

            {/* ALERT/CONFIRM MODAL */}
            <AlertModal 
                isOpen={alertModalOpen}
                message={alertMessage}
                type={alertType}
                onClose={handleAlertClose}
                onConfirm={handleConfirm}
            />

            {/* DETAILS MODAL */}
            {detailsModalOpen && selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
                    <div className="bg-[#0f172a] border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-900/50 rounded-t-2xl">
                            <div className="w-full mr-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide border ${selectedJob.type === 'Tech' ? 'bg-blue-900/30 text-blue-300 border-blue-800' : 'bg-emerald-900/30 text-emerald-300 border-emerald-800'}`}>
                                        {selectedJob.type}
                                    </span>
                                    <input 
                                        value={selectedJob.role} 
                                        onChange={(e) => updateJob(selectedJob.id, 'role', e.target.value)}
                                        className="bg-transparent text-xl font-bold text-white focus:outline-none w-full placeholder-slate-500"
                                        placeholder="Job Role Title"
                                    />
                                </div>
                                <input 
                                    value={selectedJob.company} 
                                    onChange={(e) => updateJob(selectedJob.id, 'company', e.target.value)}
                                    className="bg-transparent text-lg text-blue-400 focus:outline-none w-full placeholder-blue-900/50 font-bold"
                                    placeholder="Company Name"
                                />
                            </div>
                            <button onClick={() => setDetailsModalOpen(false)} className="text-slate-500 hover:text-white transition bg-slate-800 p-2 rounded-full"><Icons.Trash /></button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0f172a]">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Status</label>
                                    <select 
                                        value={selectedJob.status} 
                                        onChange={(e) => updateJob(selectedJob.id, 'status', e.target.value)} 
                                        className={`w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 font-bold ${selectedJob.status === 'Interview' ? 'text-green-400 border-green-500' : 'text-slate-300'}`}
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
                                            value={selectedJob.url || ''} 
                                            onChange={(e) => updateJob(selectedJob.id, 'url', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-blue-400 focus:outline-none"
                                            placeholder="https://..."
                                        />
                                        {selectedJob.url && (
                                            <a href={selectedJob.url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded flex items-center justify-center">
                                                <Icons.ExternalLink />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Contact Email</label>
                                    <input 
                                        value={selectedJob.email || ''} 
                                        onChange={(e) => updateJob(selectedJob.id, 'email', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 text-sm text-white focus:outline-none"
                                        placeholder="recruiter@company.com"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Salary</label>
                                        <input 
                                            value={selectedJob.salary} 
                                            onChange={(e) => updateJob(selectedJob.id, 'salary', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 text-sm text-green-400 font-mono focus:outline-none"
                                            placeholder="N/A"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Platform</label>
                                        <select value={selectedJob.platform} onChange={(e) => updateJob(selectedJob.id, 'platform', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 mt-1 text-sm text-slate-300 focus:outline-none">
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
                                        value={selectedJob.fullJD || ''} 
                                        onChange={(e) => updateJob(selectedJob.id, 'fullJD', e.target.value)}
                                        className="w-full flex-1 bg-slate-800 border border-slate-700 rounded p-3 text-xs text-slate-300 font-mono focus:outline-none resize-none leading-relaxed"
                                        placeholder="Paste the full JD here for safekeeping..."
                                        style={{ minHeight: '150px' }}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Notes / Stack</label>
                                    <textarea 
                                        value={selectedJob.notes || ''} 
                                        onChange={(e) => updateJob(selectedJob.id, 'notes', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-sm text-white focus:outline-none h-24 resize-none"
                                        placeholder="Key tech stack, contact names, interview notes..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-700 bg-slate-900/50 rounded-b-2xl flex justify-between items-center">
                            <button onClick={() => deleteJob(selectedJob.id)} className="text-red-500 hover:text-red-400 text-sm font-bold flex items-center gap-2 px-4 py-2 hover:bg-red-900/20 rounded">
                                <Icons.Trash /> Delete Log
                            </button>
                            <button onClick={() => setDetailsModalOpen(false)} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded font-bold text-sm shadow-lg shadow-blue-900/50">
                                Save & Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PASTE MODAL */}
            {pasteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
                    <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Icons.Magic /> AI Job Parser
                        </h3>
                        <div className="mb-4">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Application Type</label>
                            <div className="flex gap-4 mt-2">
                                <button onClick={() => setJdType('Tech')} className={`px-4 py-2 rounded font-bold text-sm ${jdType === 'Tech' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Tech</button>
                                <button onClick={() => setJdType('Content')} className={`px-4 py-2 rounded font-bold text-sm ${jdType === 'Content' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Content</button>
                            </div>
                        </div>
                        <textarea 
                            className="w-full h-48 bg-slate-800 border border-slate-700 rounded p-4 text-sm text-white focus:outline-none focus:border-blue-500 mb-4 font-mono"
                            placeholder="Paste the full Job Description text here..."
                            value={rawJD}
                            onChange={(e) => setRawJD(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setPasteModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                            <button onClick={parseJD} disabled={isParsing} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold flex items-center gap-2 shadow-lg shadow-blue-900/50">
                                {isParsing ? 'Parsing...' : <><Icons.Magic /> Extract Info</>}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* NAV BAR */}
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
                        <NavBtn label="Mission Log" active={view === 'tracker'} onClick={() => setView('tracker')} icon={<Icons.Target/>} />
                        <NavBtn label="Intel & Launch" active={view === 'intel'} onClick={() => setView('intel')} icon={<Icons.Briefcase/>} />
                        <NavBtn label="Battle Plan" active={view === 'plan'} onClick={() => setView('plan')} icon={<Icons.Zap/>} />
                        <NavBtn label="Settings" active={view === 'settings'} onClick={() => setView('settings')} icon={<span className="text-xs">⚙️</span>} />
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto mt-6 px-4">
                
                {/* HUD */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Tech Apps" value={stats.tech} total="50" color="border-blue-500" />
                    <StatCard label="Content Apps" value={stats.content} total="50" color="border-emerald-500" />
                    <StatCard label="Interviews" value={stats.interview} color="border-purple-500" />
                    <div className="bg-slate-800/50 p-4 rounded border-l-4 border-orange-500 flex flex-col justify-center gap-2 backdrop-blur-md">
                        <button onClick={() => setPasteModalOpen(true)} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 rounded text-xs uppercase tracking-wide transition shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2">
                            <Icons.Magic /> AI Paste JD
                        </button>
                    </div>
                </div>

                {/* VIEW: TRACKER */}
                {view === 'tracker' && (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Icons.Target /> Mission Log
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={() => addJob('Tech')} className="bg-blue-600/20 text-blue-400 border border-blue-600/50 hover:bg-blue-600 hover:text-white px-3 py-1 rounded text-xs font-bold transition">
                                    + Tech Manual
                                </button>
                                <button onClick={() => addJob('Content')} className="bg-emerald-600/20 text-emerald-400 border border-emerald-600/50 hover:bg-emerald-600 hover:text-white px-3 py-1 rounded text-xs font-bold transition">
                                    + Content Manual
                                </button>
                                <button onClick={exportData} className="text-slate-500 hover:text-white p-2 rounded hover:bg-slate-800" title="Backup to JSON"><Icons.Download/></button>
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
                                            <tr><td colSpan="6" className="p-8 text-center text-slate-500 italic">No missions logged. Paste a JD or add manually.</td></tr>
                                        )}
                                        {jobs.map(job => (
                                            <tr key={job.id} onClick={() => openJobDetails(job)} className="hover:bg-slate-700/30 transition cursor-pointer group">
                                                <td className="p-4 font-mono text-xs text-slate-500">{job.date}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide border ${job.type === 'Tech' ? 'bg-blue-900/30 text-blue-300 border-blue-800' : 'bg-emerald-900/30 text-emerald-300 border-emerald-800'}`}>
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
                                                     <span className={`px-2 py-1 rounded text-xs font-bold ${job.status === 'Interview' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'text-slate-400 bg-slate-800/50'}`}>
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
                )}

                {/* VIEW: INTEL */}
                {view === 'intel' && (
                    <div className="animate-fade-in space-y-8">
                        
                        {/* 1. Launchpad */}
                        <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold text-white flex items-center gap-2 mb-4"><Icons.ExternalLink /> MISSION LAUNCHPAD</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {LAUNCH_LINKS.map((link, i) => (
                                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-lg transition group block text-center border-2 shadow-lg ${link.color}`}>
                                        <div className="flex justify-between items-start mb-2 opacity-80">
                                            <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded font-bold text-white/90">Tier {link.tier}</span>
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
                            <h3 className="font-bold text-white flex items-center gap-2 mb-4"><Icons.Search /> BOOLEAN SEARCH GENERATOR</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {SEARCH_STRINGS.map((s, i) => (
                                    <div key={i} onClick={() => copyToClip(s.val)} className="bg-slate-900 p-3 rounded border border-slate-700 cursor-pointer hover:border-blue-500 group transition">
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
                                    <h3 className="font-bold text-blue-400 flex items-center gap-2"><Icons.Code /> TECH CHEAT SHEET</h3>
                                </div>
                                <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                                    <AnswerCard title="Cover Letter Hook" text="I don't just write code; I fix scaling issues. At Trilogy, I reduced p95 latency from 280ms to 115ms and handled 8k concurrent users on FastAPI. I ship production code daily." onCopy={copyToClip} />
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
                                    <h3 className="font-bold text-emerald-400 flex items-center gap-2"><Icons.Briefcase /> CONTENT CHEAT SHEET</h3>
                                </div>
                                <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                                    <AnswerCard title="Cover Letter Hook" text="Most writers can't read code. I can. I am a Senior Full-Stack Engineer who writes. I build the API, then I write the documentation and the SEO strategy to sell it." onCopy={copyToClip} />
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
                )}

                {/* VIEW: PLAN */}
                {view === 'plan' && (
                    <div className="animate-fade-in max-w-3xl mx-auto">
                        <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-8 relative backdrop-blur-sm">
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-b border-slate-700 pb-4 text-white">
                                <Icons.Zap /> Daily Protocol (PDF1 + TT.pdf)
                            </h2>
                            <div className="absolute left-12 top-24 bottom-12 w-0.5 bg-slate-700"></div>
                            <div className="space-y-8">
                                {BATTLE_PLAN.map((item, i) => (
                                    <div key={i} className="relative pl-12">
                                        <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-2 ${item.color} bg-slate-900 flex items-center justify-center font-bold text-xs z-10 text-slate-300`}>{i + 1}</div>
                                        <div className={`bg-slate-800/50 p-4 rounded-lg border-l-4 ${item.color} hover:bg-slate-800 transition group`}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                                <span className="font-mono text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">{item.time}</span>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: SETTINGS */}
                {view === 'settings' && (
                    <div className="animate-fade-in max-w-xl mx-auto">
                        <div className="bg-[#1e293b]/40 border border-slate-700 rounded-xl p-8 space-y-6">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">Settings & Configuration</h2>
                            
                            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
                                <p className="text-xs text-blue-300 font-bold mb-2">📝 Configuration Note</p>
                                <p className="text-xs text-blue-400">Settings are loaded from <code className="bg-black/30 px-1 py-0.5 rounded">.env.local</code> file. Create this file in the project root with your credentials.</p>
                            </div>
                            
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Google Gemini API Key</label>
                                <input 
                                    type="password" 
                                    value={apiKey ? '•'.repeat(20) : ''} 
                                    readOnly
                                    disabled={!apiKey}
                                    className={`w-full bg-slate-900 border ${apiKey ? 'border-green-600' : 'border-slate-600'} rounded p-2 ${apiKey ? 'text-green-400' : 'text-slate-500'} focus:outline-none cursor-not-allowed`}
                                    placeholder={apiKey ? 'API Key loaded from .env.local' : 'Not set in .env.local'}
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    {apiKey ? '✅ Loaded from VITE_GEMINI_API_KEY' : '⚠️ Set VITE_GEMINI_API_KEY in .env.local file'}
                                </p>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-green-500 uppercase mb-2 block">MongoDB Connection String</label>
                                <input 
                                    type="text" 
                                    value={mongoString ? mongoString.substring(0, 30) + '...' : ''} 
                                    readOnly
                                    disabled={!mongoString}
                                    className={`w-full bg-slate-900 border ${mongoString ? 'border-green-600' : 'border-slate-600'} rounded p-2 ${mongoString ? 'text-green-400' : 'text-slate-500'} focus:outline-none font-mono text-xs cursor-not-allowed`}
                                    placeholder={mongoString ? 'Connection string loaded from .env.local' : 'Not set in .env.local'}
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    {mongoString ? '✅ Loaded from VITE_MONGODB_CONNECTION_STRING' : '⚠️ Set VITE_MONGODB_CONNECTION_STRING in .env.local file'}
                                </p>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mt-4">
                                <p className="text-xs font-bold text-slate-400 uppercase mb-2">📄 .env.local Template</p>
                                <pre className="text-xs text-slate-300 font-mono bg-black/30 p-3 rounded overflow-x-auto">
{`VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_MONGODB_CONNECTION_STRING=your_mongodb_connection_string_here`}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
