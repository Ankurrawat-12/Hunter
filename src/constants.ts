export const SEARCH_STRINGS = [
    { label: "Tech (Indeed)", val: 'title:(Python OR FastAPI) AND (Remote) AND ("Contract" OR "Global" OR "US Shift") -hybrid' },
    { label: "Content (Indeed)", val: 'title:("Technical Writer" OR "Content Strategist") AND (SaaS OR B2B) AND (Remote)' },
    { label: "Tech Freelance (Reddit)", val: '[Hiring] (FastAPI OR Python OR React) remote' },
    { label: "Tech (LinkedIn - 24h)", val: '"Python" AND "Remote" AND ("Contract" OR "Freelance")' },
    { label: "SaaS Content (LinkedIn)", val: '"Technical Writer" AND "SaaS" AND "Remote"' },
    { label: "Global Tech (Wellfound)", val: 'Location: Worldwide; Role: Backend Engineer; Salary: >$50k' },
    { label: "Freelance (Twitter/X)", val: '"hiring" AND ("writer" OR "developer") AND "remote" -is:retweet' },
    { label: "Content Marketing (Superpath)", val: 'Role: Content Strategist; Type: B2B SaaS' },
    { label: "React Contract (Indeed)", val: 'title:(React OR "Frontend Engineer") AND (Remote) AND (Contract) -Senior' }
];

export const LAUNCH_LINKS = [
    { name: "Remote Rocketship", url: "https://remoterocketship.com", type: "Tech/Content", tier: "A", color: "bg-blue-600 hover:bg-blue-500 border-blue-500" },
    { name: "Wellfound (AngelList)", url: "https://wellfound.com/jobs", type: "Tech", tier: "A", color: "bg-slate-700 hover:bg-slate-600 border-slate-500" },
    { name: "Superpath", url: "https://superpath.co/jobs", type: "Content", tier: "A", color: "bg-purple-600 hover:bg-purple-500 border-purple-500" },
    { name: "We Work Remotely", url: "https://weworkremotely.com", type: "Tech/Content", tier: "A", color: "bg-red-600 hover:bg-red-500 border-red-500" },
    { name: "Indeed (US)", url: "https://www.indeed.com", type: "Volume", tier: "B", color: "bg-blue-500 hover:bg-blue-400 border-blue-400" },
    { name: "ProBlogger", url: "https://problogger.com/jobs/", type: "Content", tier: "B", color: "bg-orange-600 hover:bg-orange-500 border-orange-500" },
    { name: "Upwork", url: "https://upwork.com", type: "Freelance", tier: "B", color: "bg-emerald-600 hover:bg-emerald-500 border-emerald-500" },
    { name: "Hacker News (Jobs)", url: "https://news.ycombinator.com/jobs", type: "Tech", tier: "A", color: "bg-orange-500 hover:bg-orange-400 border-orange-400" },
    { name: "Reddit (ForHire)", url: "https://www.reddit.com/r/forhire/", type: "Freelance", tier: "B", color: "bg-orange-700 hover:bg-orange-600 border-orange-600" },
    { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", type: "Volume", tier: "B", color: "bg-blue-700 hover:bg-blue-600 border-blue-600" }
];

export const CHEAT_SHEET = {
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

export const BATTLE_PLAN = [
    { time: "09:00", title: "Wake Up & Reset", desc: "Cold water. No phone. Mental prep.", color: "border-slate-500" },
    { time: "10:00 - 12:00", title: "Study Block", desc: "LeetCode + System Design + English. NO APPS.", color: "border-yellow-500" },
    { time: "12:00 - 14:00", title: "TECH App Engine", desc: "25 Tier A (Rocketship/Wellfound) + 25 Tier B (Indeed). Resume: Python.pdf", color: "border-blue-500" },
    { time: "14:00 - 16:00", title: "CONTENT App Engine", desc: "50 Apps. Superpath + WWR + ProBlogger. Resume: Content.pdf", color: "border-emerald-500" },
    { time: "16:00 - 18:00", title: "Tech Freelance", desc: "Upwork (FastAPI) + Discord Hunting. NO Content Freelance.", color: "border-purple-500" },
    { time: "18:30", title: "Physical Reset", desc: "MMA / Heavy Lifting.", color: "border-red-500" }
];
