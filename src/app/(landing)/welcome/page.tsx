'use client'

// import type { Metadata } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client"
import RedButton from "@/app/components/RedButton";


// export const metadata: Metadata = {
//   title: "100 Words — The #1 Habit for Mental Health",
//   description:
//     "A private journal with one rule: write 100 words a day. No ads, no algorithms, no AI ghostwriting. Just you and your thoughts.",
//   openGraph: {
//     title: "100 Words — Journal for Mental Health",
//     description: "100 words a day. That's all it takes.",
//     url: "https://100words.app",
//   },
// };

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconPen = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const IconHeart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconSun = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMirror = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5" /><path d="M12 13v8" /><path d="M9 18h6" />
  </svg>
);
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconLeaf = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 0 0 4.83 21C7.18 20.19 12.2 17.84 17 8z" />
    <path d="M17 8L3 21" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconFlame = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c4.418 0 8-3.582 8-8 0-3.5-2-6.5-5-8 .5 2-1 4-3 5-1-3-3.5-4-3.5-7C6 6.5 4 9.5 4 14c0 4.418 3.582 8 8 8z" />
  </svg>
);
const IconPhone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ─── Shared class strings ─────────────────────────────────────────────────────

// Card shell
const card = "bg-[rgb(28,28,28)] rounded-[32px] border-t border-t-[rgb(40,40,40)] border-l border-l-[rgb(36,36,36)] border-r border-r-[rgb(36,36,36)] border-b border-b-[rgb(22,22,22)]";

// Section wrapper
const section = "px-10 py-32 max-w-[1200px] mx-auto";

// Section label
const label = "text-[13px] text-[#555] tracking-[0.08em] uppercase mb-5";

// Section h2
const sectionH2 = "text-[clamp(32px,4.5vw,58px)] font-light tracking-[-0.03em] leading-[1.1] mb-16";

// Divider
const divider = "h-px bg-[rgb(22,22,22)] max-w-[1200px] mx-auto";

// Icon wrapper
const iconWrap = "w-12 h-12 rounded-2xl bg-[rgb(36,36,36)] flex items-center justify-center mb-6 shrink-0";

// Primary button
const btnP = "inline-flex items-center font-semibold gap-2.5 bg-[#e8e6e3] text-[#0f0e0e] rounded-full px-8 py-4 text-base font-medium transition-all duration-200 hover:opacity-85 hover:-translate-y-px whitespace-nowrap cursor-pointer";

// Ghost button
const btnG = "inline-block bg-transparent text-[#666] border border-[rgb(42,42,42)] rounded-full px-8 py-4 text-base font-normal transition-all duration-200 hover:border-[rgb(66,66,66)] hover:text-[#e8e6e3] whitespace-nowrap";

// ─── Data ─────────────────────────────────────────────────────────────────────

const quotes = [
  { name: "Leo Tolstoy", label: "Author — kept diaries for 63 years", text: "I write to understand what I think. A thought unwritten is a thought half-formed. The diary is not a record of life — it is life itself, examined." },
  { name: "Virginia Woolf", label: "Author — wrote journals from age 15", text: "The habit of writing for my eye is good practice. It loosens the ligaments. Never mind the misses and the stumbles." },
  { name: "Marcus Aurelius", label: "Roman Emperor — Meditations, 161 AD", text: "You have power over your mind, not outside events. Realize this, and you will find strength. The journal is where I found mine." },
  { name: "Carl Jung", label: "Psychiatrist — wrote the Red Book for 16 years", text: "Until you make the unconscious conscious, it will direct your life and you will call it fate. Writing is how I made it conscious." },
];

const science = [
  { label: "Reduced symptoms of depression", text: "A meta-analysis based on 26,927 participants found that higher gratitude was significantly associated with lower depression. Daily journaling is among the most reliable ways to cultivate that habit.", url: "https://jamanetwork.com/journals/jama/2024" },
  { label: "Reduced psychological distress", text: "A 2023 meta-analysis found that journaling significantly reduced symptoms of psychological distress. The effect was strongest when people wrote consistently in short, focused sessions.", url: "https://pubmed.ncbi.nlm.nih.gov/articles/PMC10730594/" },
  { label: "Wide-ranging benefits", text: "A 2023 meta-analysis found that expressive writing produced statistically significant improvements across depression, generalized anxiety, quality of life, mental disorder symptoms, and post-traumatic stress.", url: "https://www.jmir.org/2023/1/e43862" },
];

const whyItems = [
  { Icon: IconLock, title: "Fully private", desc: "No ads, no algorithms, no one reading over your shoulder. Your journal is yours — stored securely and never shared." },
  { Icon: IconPen, title: "100 words, no more", desc: "The constraint is the feature. A short, achievable daily goal makes journaling sustainable for years, not days." },
  { Icon: IconHeart, title: "No AI ghostwriting", desc: "We don't suggest what to write or complete your sentences. The reflection is entirely yours — that's what makes it work." },
  { Icon: IconSun, title: "Built-in momentum", desc: "Streaks, word counts, and gentle nudges keep you showing up every day. Habit science baked in from day one." },
];

const forWhom = [
  { Icon: IconMirror, title: "Self-reflectors", desc: "People who want to understand themselves better and watch how they change over time." },
  { Icon: IconBook, title: "Writers", desc: "A daily practice that sharpens craft, clears creative blocks, and captures raw material." },
  { Icon: IconGlobe, title: "Language learners", desc: "Write in your target language every day. 100 words is the perfect daily challenge." },
  { Icon: IconLeaf, title: "Anyone under stress", desc: "Five quiet minutes to empty your mind onto the page can genuinely change your day." },
];

const features = [
  { Icon: IconGlobe, title: "Works everywhere", desc: "Sign in with Google. No install required. Your journal is accessible from any device, any browser." },
  { Icon: IconPen, title: "Ultra-minimalist", desc: "No formatting, no distracting prompts, no AI suggestions. Just an empty page and your words." },
  { Icon: IconShield, title: "Fully private", desc: "Your data is encrypted at the high-security database. This means the second your 100 words hit the database, they are instantly scrambled into unreadable code (AES-256-GCM)." },
  { Icon: IconFlame, title: "Streak & habit tracking", desc: "Visual streaks and writing patterns help you build a habit that actually sticks over time." },
  { Icon: IconZap, title: "Designed constraints", desc: "The 100-word limit makes journaling feel focused and achievable. Constraints create freedom." },
  { Icon: IconPhone, title: "Export", desc: "Export entries as plain text at any time you want" },
];

const faq = [
  { q: "Will my journal entries stay private?", a: "We use AES-256-GCM authenticated encryption to protect every entry. Your data is encrypted at the database level, meaning even if someone gained access to the raw database, your words would look like a chaotic string of random characters. With Row-Level Security (RLS) combined with encryption, only your authenticated session can trigger the decryption process." },
  { q: "Is the app available for Android and iOS?", a: "100 Words is a Progressive Web App. Install it on Android or iOS directly from your browser — no app store required. It works offline, too." },
  { q: "Can I export my journal entries?", a: "Yes. Download all your data in plain text or CSV at any time. Your journal is yours — we never lock you in. Export is free on all plans." },
  { q: "Does the Pro plan use AI to write for me?", a: "No. AI in Pro only reads and reflects back — it offers insights and patterns after you've written. It never writes entries for you. The words are always yours." },
];

const freeFeatures = ["Unlimited notes", "No ads", "Export your data", "Privacy first", "Unlimited devices"];
const proFeatures = ["Everything in Free", "Daily AI review", "Weekly AI review", "Random note feature", "And more.."];

const streakDays = [true, true, true, true, true, true, false];

function handleSubmit() {

}

// ─── Scroll-reveal word-by-word text ─────────────────────────────────────────

function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordsTotal = text.split(" ").length;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const start = windowHeight * 0.2;
      const end = windowHeight * 0.8;

      const rawProgress = 1 - (rect.top - start) / (end - start);
      const clamped = Math.min(1, Math.max(0, rawProgress));
      const nextVisible = Math.round(clamped * wordsTotal);

      setVisibleWords(nextVisible);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [text]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, index) => {
        const isVisible = index < visibleWords;
        if (!isVisible) return null;
        return (
          <span
            key={index}
            className="transition-opacity duration-200"
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
      <span className="inline-block w-0.5 h-[22px] bg-[#555] ml-0.5 align-middle animate-blink" />
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })

    if (error) {
      console.error('Google OAuth Error:', error)
    }
  }

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      {/* <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-[rgba(15,14,14,0.9)] backdrop-blur-md border-t border-neutral-800 m-4 rounded-full w-[600px] mx-auto">

        <div className="flex gap-2 items-center"><Image src="/icon1.png" alt="100words logo" width={32} height={32} />
          <span className="text-base font-medium tracking-[-0.01em]">100 words</span>
        </div>
        <div className="flex items-center gap-10">
          <a href="#why" className="hidden sm:block text-[15px] text-[#555] transition-colors hover:text-[#e8e6e3]">Why</a>
          <a href="#science" className="hidden sm:block text-[15px] text-[#555] transition-colors hover:text-[#e8e6e3]">Science</a>
          <a href="#pricing" className="hidden sm:block text-[15px] text-[#555] transition-colors hover:text-[#e8e6e3]">Pricing</a>
          <a onClick={handleGoogleLogin}
            className="inline-flex items-center gap-2 bg-[#e8e6e3] text-[#0f0e0e] rounded-[11px] px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85">
            Start writing →
          </a>
        </div>
      </nav> */}

      <main className="pt-[32px]">

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pb-20">
        <div className="flex flex-col items-center gap-2">
        <Image src="/icon1.png" alt="100words logo" width={64} height={64} />
100words.app
        </div>

          <p className="animate-fade-up italic py-2 px-4 delay-50 tracking-[0.08em] uppercase mb-4 text-neutral-600">
            "The #1 habit for mental health"
          </p>

          <h1 className="animate-fade-up delay-180 text-[clamp(52px,9vw,112px)] font-black tracking-[-0.04em] leading-[1.02] max-w-[1000px] mb-7">
            Write 100 words.<br />
            <span className="text-[rgb(72,72,72)]">Every day.</span>
          </h1>

          <p className="animate-fade-up delay-300 text-xl text-[#666] max-w-[520px] leading-[1.72] mb-12 font-light">
            A private journal with one simple rule. No ads, no algorithms, no AI ghostwriting. Just you and your thoughts.
          </p>

          <div className="animate-fade-up delay-420 flex gap-3.5 flex-wrap justify-center">
            <a onClick={handleGoogleLogin} className={btnP}>
              <IconGoogle /> Log in with Google
            </a>
            <a href="#why" className={btnG}>See how it works</a>
          </div>

          {/* Mockup */}
          {/* <div className="animate-fade-up delay-580 mt-20 w-full max-w-[800px]">
            <div className="bg-[rgb(18,18,18)] rounded-[28px] border border-[rgb(30,30,30)] overflow-hidden shadow-[0_56px_100px_rgba(0,0,0,0.55)]"> */}
          {/* title bar */}
          {/* <div className="bg-[rgb(20,20,20)] px-5 py-4 flex items-center gap-1.5 border-b border-[rgb(27,27,27)]">
              </div> */}
          {/* body */}
          {/* <div className="px-14 py-12">
                <p className="text-[12px] text-[#333] mb-5 tracking-[0.08em] uppercase">Wednesday, March 4</p>
                <ScrollRevealText
                  className="text-xl leading-[1.88] font-light"
                  text="tbh today was just a massive grind. spent way too many hours staring at my screen just trying to make things click and getting caught in the usual loop of tweaking pixels. it’s weird how i can spend all day building these perfect, organized systems in a digital world while my real-life desk is just a graveyard of coffee cups. Yeah, i’m so f*** tired of screens. i just want to head out to a local spot, grab a drink, and actually see people in 3D."
                />
                <div className="mt-9 flex items-center justify-center">
                  <span className="text-[13px] text-[#333]">
                    <span className="text-[rgb(150,148,144)]">100</span> / 100 words
                  </span>
                </div>
              </div>
              
            </div>
            
          </div> */}


          {/* <button
            onClick={handleSubmit}
            className="flex w-[80px] h-[80px] bg-neutral-300 text-neutral-900 rounded-full items-center justify-center mb-8 text-xl font-bold shadow-lg shadow-neutral-700 hover:scale-95 transition-all z-20"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="currentColor" d="M4.254 19.567c.307-.982.77-2.364 1.391-4.362c2.707-.429 3.827.341 5.546-2.729c-1.395.427-3.077-.792-2.987-1.321c.091-.528 3.913.381 6.416-3.173c-3.155.696-4.164-.836-3.757-1.067c.939-.534 3.726-.222 5.212-1.669c.766-.745 1.125-2.556.813-3.202c-.374-.781-2.656-1.946-3.914-1.836c-1.258.109-3.231 4.79-3.817 4.754c-.584-.037-.703-2.098.319-4.013c-1.077.477-3.051 1.959-3.67 3.226c-1.153 2.357.108 7.766-.296 7.958c-.405.193-1.766-2.481-2.172-3.694c-.555 1.859-.568 3.721 1.053 6.194c-.611 1.623-.945 3.491-.996 4.441c-.024.759.724.922.859.493z" /></svg>
            
        </button> */}

        </section>

        {/* ── WHY ─────────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section id="why" className={`${section} flex flex-col items-center`}>
          <p className=' px-4 py-2 mb-8 tracking-[0.08em] uppercase mb-8 text-neutral-600'>This is really important</p>
          <h2 className={`${sectionH2} max-w-[600px]`}>Why journal in 2026?</h2>
          <ScrollRevealText
                  className="max-w-[560px] text-2xl leading-[1.6] text-neutral-500 text-center"
                  text="Journaling isn't about writing Dear Diary and crying over a crush — it’s the original brain hack. Right now, we’re living in a permanent state of brain fog because we’ve outsourced our thinking to algorithms that don't actually care about us. When you journal, you’re reclaiming your headspace. It’s the only place left where the content is 100% yours—no filters, no likes, and no AI hallucinating your life for you. It’s a tradition that goes back centuries because it works."
                />
        </section>

           {/* ── HOW IT WORKS ─────────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section id="why" className={`${section} flex flex-col items-center`}>
          <p className=' px-4 py-2 mb-8 tracking-[0.08em] uppercase mb-8 text-neutral-600'>Principles</p>
          <h2 className={`${sectionH2} max-w-[600px] text-center`}>This isn't an average diary. It's got character.</h2>
          <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
            <div className="component-bg p-12">
              <div className="w-12 h-12 text-2xl font-bold text-white rounded-2xl bg-[rgb(38,38,38)] flex items-center justify-center mb-6 shrink-0">1</div>
            <p className="text-[18px] font-medium mb-1.5">One Note Per Day</p>
                <p className="text-md text-neutral-600 mb-7">Your life isn’t a Twitter feed. By forcing a single daily entry, we stop the "micro-posting" habit. It forces you to actually synthesize your day into one meaningful snapshot rather than a series of disconnected, impulsive thoughts.</p>
            </div>
            <div className="component-bg p-12">
            <div className="w-12 h-12 text-2xl font-bold text-white rounded-2xl bg-[rgb(38,38,38)] flex items-center justify-center mb-6 shrink-0">2</div>
            <p className="text-[18px] font-medium mb-1.5">No Edits*</p>
                <p className="text-md text-neutral-600 mb-7">Real life doesn't have an "undo" button. When you can’t polish or delete your past, you’re forced to accept your own growth—messy drafts and all. It’s an authentic 3D receipt of who you were at that exact moment. <span className="text-neutral-400 flex mt-2 italic">* You can edit note before end of the day</span></p>
            </div>
            <div className="component-bg p-12">
            <div className="w-12 h-12 text-2xl font-bold text-white rounded-2xl bg-[rgb(38,38,38)] flex items-center justify-center mb-6 shrink-0">3</div>
            <p className="text-[18px] font-medium mb-1.5">The 100-Word Minimum</p>
                <p className="text-md text-neutral-600 mb-7">Anything less is just a status update. Reaching 100 words forces your brain to move past surface-level "I'm tired" venting and actually start digging into why. It’s the threshold where "complaining" turns into actual self-reflection.</p>
            </div>
          </div>
        </section>

        {/* ── QUOTES ──────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section className={`${section} flex flex-col items-center text-center`}>
          <p className="mb-8 tracking-[0.08em] uppercase mb-8 text-neutral-600">Prominent voices</p>
          <h2 className={sectionH2}>They understood<br />the power of writing.</h2>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {quotes.map((q) => (
              <div key={q.name} className="component-bg p-12">
                <p className="text-[18px] font-medium mb-1.5">{q.name}</p>
                <p className="text-[13px] text-neutral-600 mb-7 tracking-[0.02em]">{q.label}</p>
                <p className="text-[18px] text-neutral-300 italic font-light leading-[1.82]">"{q.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOR WHOM ────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section className={`${section} flex flex-col items-center text-center`}>
          <p className={label}>Who it's for</p>
          <h2 className={sectionH2}>If you have thoughts,<br />this is for you.</h2>
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {forWhom.map(({ Icon, title, desc }) => (
              <div key={title} className="component-bg p-12 text-left">
                <div className={iconWrap}><Icon /></div>
                <p className="text-[18px] font-medium mb-3">{title}</p>
                <p className="text-[15px] text-[#555] font-light leading-[1.68]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section className={`${section} flex flex-col items-center text-center`}>
          <p className={label}>Features</p>
          <h2 className={sectionH2}>Everything you need.<br />Nothing you don't.</h2>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="component-bg p-12 text-left">
                <div className={iconWrap}><Icon /></div>
                <h3 className="text-[18px] font-medium mb-3">{title}</h3>
                <p className="text-[15px] text-[#666] font-light leading-[1.68]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ─────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section className={`${section} flex flex-col items-center text-center`}>
          <p className={label}>Pricing</p>
          <h2 className={`${sectionH2} mb-5`}>Simple. Fair. Honest.</h2>
          <p className="text-[#555] font-light max-w-[440px] mb-16 text-lg leading-[1.72]">
            Core features are free, always. Upgrade when you want more.
          </p>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {/* Free */}
            <div className="component-bg py-12 px-32 flex flex-col gap-9">
              <div>
                <p className="text-[13px] text-[#555] tracking-[0.08em] uppercase mb-4">Basic</p>
                <p className="text-[60px] font-light tracking-[-0.04em] leading-none">
                <sup className="text-[26px] align-super font-light">$</sup>
                0<span className="text-xl text-[#555] font-light"> / mo</span>
                </p>
              </div>
              <ul className="flex flex-col gap-4 list-none">
                {freeFeatures.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-[rgb(118,112,106)] font-light">
                    <span className="w-5 h-5 rounded-full bg-[rgb(38,38,38)] flex items-center justify-center shrink-0 text-[11px] text-[#777]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a onClick={handleGoogleLogin}
                className={`${btnG} text-center block`}>
                Get started
              </a>
            </div>
            {/* Pro */}
            <div className="component-bg p-12 flex flex-col gap-9 border border-white">
              <div>
                <p className="text-[13px] text-[#555] tracking-[0.08em] uppercase mb-4">Pro</p>
                <p className="text-[60px] font-light tracking-[-0.04em] leading-none">
                  <sup className="text-[26px] align-super font-light">$</sup>4.77
                  <span className="text-xl text-[#555] font-light"> / mo</span>
                </p>
              </div>
              <ul className="flex flex-col gap-4 list-none">
                {proFeatures.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-[rgb(118,112,106)] font-light">
                    <span className="w-5 h-5 rounded-full bg-[rgb(46,46,46)] flex items-center justify-center shrink-0 text-[11px] text-[#777]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a onClick={handleGoogleLogin}
                className={`${btnP} justify-center w-full`}>
                Get started
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section className={`${section} flex flex-col items-center text-center`}>
          <p className={label}>Questions</p>
          <h2 className={sectionH2}>Answers.</h2>
          <div className="w-[640px]">
            {faq.map((item) => (
              <div key={item.q} className="component-bg mb-6 px-12 py-6 cursor-pointer">
                <details open>
                <summary className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em]">{item.q}</summary>
                <p className="text-[17px] text-[#666] font-light leading-[1.78]">{item.a}</p>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        {/* <div className={divider} /> */}
        <section className="px-10 pt-24  pb-44 text-center">
          <div className=" max-w-[680px] mx-auto px-18 py-22 p-6">
            <p className="text-[13px] text-[#555] tracking-[0.08em] uppercase mb-6">Ready?</p>
            <h2 className="text-[clamp(52px,5vw,64px)] font-black tracking-[-0.035em] leading-[1.06] mb-6">
              Transform your<br />mental OS.
            </h2>
            <p className="text-[#666] font-light max-w-[360px] mx-auto mb-11 leading-[1.78] text-[19px]">
            Start with 100 words today and just see where it takes you.
            </p>
            <a onClick={handleGoogleLogin}
              className={`${btnP} text-lg px-10 py-5`}>
              Start writing — it's free
            </a>
            <p className="mt-7 text-[13px] text-[#333] tracking-[0.04em]">No credit card. No commitment.</p>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[rgb(22,22,22)] px-10 py-10 max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4">
        <span className="text-[15px] text-[#444]">100words — journal for mental health</span>
        <div className="flex gap-7">
          <a href="/privacy" className="text-[14px] text-[#555] transition-colors hover:text-[#e8e6e3]">Privacy</a>
          <a href="/tos" className="text-[14px] text-[#555] transition-colors hover:text-[#e8e6e3]">Terms</a>
          <a href="https://100words.app/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#555] transition-colors hover:text-[#e8e6e3]">
            100words.app
          </a>
        </div>
      </footer>
    </>
  );
}