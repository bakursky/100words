// app/page.tsx — Next.js 16, App Router, Server Component
// Styled exclusively with Tailwind utility classes
'use client'

import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client"


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
const btnP = "inline-flex items-center gap-2.5 bg-[#e8e6e3] text-[#0f0e0e] rounded-[14px] px-8 py-4 text-base font-medium transition-all duration-200 hover:opacity-85 hover:-translate-y-px whitespace-nowrap cursor-pointer";

// Ghost button
const btnG = "inline-block bg-transparent text-[#666] border border-[rgb(42,42,42)] rounded-[14px] px-8 py-4 text-base font-normal transition-all duration-200 hover:border-[rgb(66,66,66)] hover:text-[#e8e6e3] whitespace-nowrap";

// ─── Data ─────────────────────────────────────────────────────────────────────

const quotes = [
  { name: "Leo Tolstoy",     label: "Author — kept diaries for 63 years",           text: "I write to understand what I think. A thought unwritten is a thought half-formed. The diary is not a record of life — it is life itself, examined." },
  { name: "Virginia Woolf",  label: "Author — wrote journals from age 15",            text: "The habit of writing for my eye is good practice. It loosens the ligaments. Never mind the misses and the stumbles." },
  { name: "Marcus Aurelius", label: "Roman Emperor — Meditations, 161 AD",            text: "You have power over your mind, not outside events. Realize this, and you will find strength. The journal is where I found mine." },
  { name: "Carl Jung",       label: "Psychiatrist — wrote the Red Book for 16 years", text: "Until you make the unconscious conscious, it will direct your life and you will call it fate. Writing is how I made it conscious." },
];

const science = [
  { label: "Reduced symptoms of depression",  text: "A meta-analysis based on 26,927 participants found that higher gratitude was significantly associated with lower depression. Daily journaling is among the most reliable ways to cultivate that habit.",                                                                      url: "https://jamanetwork.com/journals/jama/2024" },
  { label: "Reduced psychological distress",  text: "A 2023 meta-analysis found that journaling significantly reduced symptoms of psychological distress. The effect was strongest when people wrote consistently in short, focused sessions.",                                                                              url: "https://pubmed.ncbi.nlm.nih.gov/articles/PMC10730594/" },
  { label: "Wide-ranging benefits",           text: "A 2023 meta-analysis found that expressive writing produced statistically significant improvements across depression, generalized anxiety, quality of life, mental disorder symptoms, and post-traumatic stress.",                                                      url: "https://www.jmir.org/2023/1/e43862" },
];

const whyItems = [
  { Icon: IconLock,  title: "Fully private",      desc: "No ads, no algorithms, no one reading over your shoulder. Your journal is yours — stored securely and never shared." },
  { Icon: IconPen,   title: "100 words, no more", desc: "The constraint is the feature. A short, achievable daily goal makes journaling sustainable for years, not days." },
  { Icon: IconHeart, title: "No AI ghostwriting", desc: "We don't suggest what to write or complete your sentences. The reflection is entirely yours — that's what makes it work." },
  { Icon: IconSun,   title: "Built-in momentum",  desc: "Streaks, word counts, and gentle nudges keep you showing up every day. Habit science baked in from day one." },
];

const forWhom = [
  { Icon: IconMirror, title: "Self-reflectors",    desc: "People who want to understand themselves better and watch how they change over time." },
  { Icon: IconBook,   title: "Writers",             desc: "A daily practice that sharpens craft, clears creative blocks, and captures raw material." },
  { Icon: IconGlobe,  title: "Language learners",   desc: "Write in your target language every day. 100 words is the perfect daily challenge." },
  { Icon: IconLeaf,   title: "Anyone under stress", desc: "Five quiet minutes to empty your mind onto the page can genuinely change your day." },
];

const features = [
  { Icon: IconGlobe,  title: "Works everywhere",       desc: "Sign in with Google. No install required. Your journal is accessible from any device, any browser." },
  { Icon: IconPen,    title: "Zero friction writing",   desc: "No formatting, no distracting prompts, no AI suggestions. Just an empty page and your words." },
  { Icon: IconShield, title: "Fully private",           desc: "Your entries are encrypted before they leave your device. We cannot read them — even if we wanted to." },
  { Icon: IconFlame,  title: "Streak & habit tracking", desc: "Visual streaks and writing patterns help you build a habit that actually sticks over time." },
  { Icon: IconZap,    title: "Designed constraints",    desc: "The 100-word limit makes journaling feel focused and achievable. Constraints create freedom." },
  { Icon: IconPhone,  title: "Write from anywhere",     desc: "The experience is optimized for mobile — write in bed, on a walk, whenever the mood arrives." },
];

const faq = [
  { q: "Will my journal entries stay private?",     a: "Yes, completely. Your entries are encrypted before leaving your device. End-to-end encryption means even we cannot read your journal. Your words belong to you alone." },
  { q: "Is the app available for Android and iOS?", a: "100 Words is a Progressive Web App. Install it on Android or iOS directly from your browser — no app store required. It works offline, too." },
  { q: "Can I export my journal entries?",          a: "Yes. Download all your data in plain text or CSV at any time. Your journal is yours — we never lock you in. Export is free on all plans." },
  { q: "Why exactly 100 words?",                    a: "100 words is long enough to express a complete thought, and short enough to do every single day. Most people finish in 4–6 minutes. The constraint is the feature." },
  { q: "Does the Pro plan use AI to write for me?", a: "No. AI in Pro only reads and reflects back — it offers insights and patterns after you've written. It never writes entries for you. The words are always yours." },
];

const freeFeatures = ["Unlimited notes", "No ads", "Export your data", "Privacy first", "Unlimited devices"];
const proFeatures  = ["Everything in Free", "AI review & insights", "Writing suggestions", "Analytics & charts", "Entry search"];

const streakDays = [true, true, true, true, true, true, false];

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
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 bg-[rgba(15,14,14,0.92)] backdrop-blur-2xl border-b border-[rgb(22,22,22)]">
       
      <div className="flex gap-2 items-center"><Image src="/icon1.png" alt="100words logo" width={32} height={32} /> 
        <span className="text-base font-medium tracking-[-0.01em]">100 words</span>
      </div>
        <div className="flex items-center gap-10">
          <a href="#why"     className="hidden sm:block text-[15px] text-[#555] transition-colors hover:text-[#e8e6e3]">Why</a>
          <a href="#science" className="hidden sm:block text-[15px] text-[#555] transition-colors hover:text-[#e8e6e3]">Science</a>
          <a href="#pricing" className="hidden sm:block text-[15px] text-[#555] transition-colors hover:text-[#e8e6e3]">Pricing</a>
          <a onClick={handleGoogleLogin}
            className="inline-flex items-center gap-2 bg-[#e8e6e3] text-[#0f0e0e] rounded-[11px] px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85">
            Start writing →
          </a>
        </div>
      </nav>

      <main className="pt-[88px]">

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-24 pb-20">

          <p className="animate-fade-up delay-50 text-[13px] text-[#444] tracking-[0.08em] uppercase mb-8 font-normal">
            The #1 habit for mental health
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
          <div className="animate-fade-up delay-580 mt-20 w-full max-w-[800px]">
            <div className="bg-[rgb(18,18,18)] rounded-[28px] border border-[rgb(30,30,30)] overflow-hidden shadow-[0_56px_100px_rgba(0,0,0,0.55)]">
              {/* title bar */}
              <div className="bg-[rgb(20,20,20)] px-5 py-4 flex items-center gap-1.5 border-b border-[rgb(27,27,27)]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block" />
              </div>
              {/* body */}
              <div className="px-14 py-12">
                <p className="text-[12px] text-[#333] mb-5 tracking-[0.08em] uppercase">Wednesday, March 4</p>
                <p className="text-[19px] text-[rgb(144,138,132)] leading-[1.88] font-light">
                  Woke up with that familiar weight again, but this time I noticed it instead of just
                  carrying it. Funny how writing forces you to actually look at things. The meeting went
                  fine — I was overthinking it, as usual. Took a walk after lunch, the light was different
                  today. Softer. I want to remember that feeling.
                  <span className="inline-block w-0.5 h-[22px] bg-[#555] ml-0.5 align-middle animate-blink" />
                </p>
                <div className="mt-9 flex items-center justify-between">
                  <span className="text-[13px] text-[#333]">
                    <span className="text-[rgb(150,148,144)]">78</span> / 100 words
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY ─────────────────────────────────────────────────────────────── */}
        <div className={divider} />
        <section id="why" className={section}>
          <p className={label}>Why journal?</p>
          <h2 className={`${sectionH2} max-w-[600px]`}>Your mind needs<br />a private space.</h2>
          <div className="grid grid-cols-2 gap-[3px] max-sm:grid-cols-1">
            {whyItems.map(({ Icon, title, desc }, i) => (
              <div key={title} className={`bg-[rgb(28,28,28)] border border-[rgb(34,34,34)] p-12 ${
                i === 0 ? "rounded-tl-[32px]" :
                i === 1 ? "rounded-tr-[32px]" :
                i === 2 ? "rounded-bl-[32px]" :
                          "rounded-br-[32px]"
              } max-sm:rounded-none first:max-sm:rounded-t-[32px] last:max-sm:rounded-b-[32px]`}>
                <div className={iconWrap}><Icon /></div>
                <h3 className="text-xl font-medium mb-3.5 tracking-[-0.015em]">{title}</h3>
                <p className="text-base text-[#666] font-light leading-[1.72]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUOTES ──────────────────────────────────────────────────────────── */}
        <div className={divider} />
        <section className={section}>
          <p className={label}>Prominent voices</p>
          <h2 className={sectionH2}>They understood<br />the power of writing.</h2>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {quotes.map((q) => (
              <div key={q.name} className={`${card} p-12`}>
                <p className="text-[18px] font-medium mb-1.5">{q.name}</p>
                <p className="text-[13px] text-[#444] mb-7 tracking-[0.02em]">{q.label}</p>
                <p className="text-[18px] text-[rgb(118,112,106)] italic font-light leading-[1.82]">"{q.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCIENCE ─────────────────────────────────────────────────────────── */}
        <div className={divider} />
        <section id="science" className={section}>
          <p className={label}>Scientifically proven</p>
          <h2 className={`${sectionH2} mb-5`}>The research is clear.</h2>
          <p className="text-[#555] font-light max-w-[520px] mb-16 text-lg leading-[1.72]">
            Three independent meta-analyses confirm what every seasoned journaler already knows — writing works.
          </p>
          <div className="flex flex-col gap-4">
            {science.map((s) => (
              <div key={s.label} className={`${card} px-12 py-11`}>
                <p className="text-[13px] text-[#555] tracking-[0.06em] uppercase mb-4">{s.label}</p>
                <p className="text-lg text-[rgb(138,132,126)] leading-[1.8] font-light mb-5 max-w-[760px]">{s.text}</p>
                <p className="text-xs text-[rgb(46,46,46)] break-all">{s.url}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOR WHOM ────────────────────────────────────────────────────────── */}
        <div className={divider} />
        <section className={section}>
          <p className={label}>Who it's for</p>
          <h2 className={sectionH2}>If you have thoughts,<br />this is for you.</h2>
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {forWhom.map(({ Icon, title, desc }) => (
              <div key={title} className={`${card} p-10`}>
                <div className={iconWrap}><Icon /></div>
                <p className="text-[18px] font-medium mb-3">{title}</p>
                <p className="text-[15px] text-[#555] font-light leading-[1.68]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────────────────── */}
        <div className={divider} />
        <section className={section}>
          <p className={label}>Features</p>
          <h2 className={sectionH2}>Everything you need.<br />Nothing you don't.</h2>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className={`${card} p-10`}>
                <div className={iconWrap}><Icon /></div>
                <h3 className="text-[18px] font-medium mb-3">{title}</h3>
                <p className="text-[15px] text-[#666] font-light leading-[1.68]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ─────────────────────────────────────────────────────────── */}
        <div className={divider} />
        <section id="pricing" className={section}>
          <p className={label}>Pricing</p>
          <h2 className={`${sectionH2} mb-5`}>Simple. Fair. Honest.</h2>
          <p className="text-[#555] font-light max-w-[440px] mb-16 text-lg leading-[1.72]">
            Core features are free, always. Upgrade when you want more.
          </p>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {/* Free */}
            <div className={`${card} p-12 flex flex-col gap-9`}>
              <div>
                <p className="text-[13px] text-[#555] tracking-[0.08em] uppercase mb-4">Basic</p>
                <p className="text-[60px] font-light tracking-[-0.04em] leading-none">
                  $0<span className="text-xl text-[#555] font-light"> / mo</span>
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
            <div className={`${card} p-12 flex flex-col gap-9 !border-[rgb(52,52,52)] !border-t-[rgb(62,62,62)]`}>
              <div>
                <p className="text-[13px] text-[#555] tracking-[0.08em] uppercase mb-4">Pro</p>
                <p className="text-[60px] font-light tracking-[-0.04em] leading-none">
                  <sup className="text-[26px] align-super font-light">$</sup>2
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
        <div className={divider} />
        <section className={section}>
          <p className={label}>Questions</p>
          <h2 className={sectionH2}>Answers.</h2>
          <div className="max-w-[840px]">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-[rgb(26,26,26)] py-9 first:border-t first:border-t-[rgb(26,26,26)]">
                <p className="text-xl font-normal text-[#e8e6e3] mb-3.5 tracking-[-0.015em]">{item.q}</p>
                <p className="text-[17px] text-[#666] font-light leading-[1.78]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────────── */}
        <div className={divider} />
        <section className="px-10 pt-32 pb-44 text-center">
          <div className={`${card} max-w-[680px] mx-auto px-18 py-22 p-6`}>
            <p className="text-[13px] text-[#555] tracking-[0.08em] uppercase mb-6">Ready?</p>
            <h2 className="text-[clamp(36px,5vw,64px)] font-black tracking-[-0.035em] leading-[1.06] mb-6">
              Transform your<br />mental OS.
            </h2>
            <p className="text-[#666] font-light max-w-[360px] mx-auto mb-11 leading-[1.78] text-[19px]">
              Start with 100 words today. The hardest part is opening the page — we made that easy.
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
          <a href="#" className="text-[14px] text-[#555] transition-colors hover:text-[#e8e6e3]">Privacy</a>
          <a href="#" className="text-[14px] text-[#555] transition-colors hover:text-[#e8e6e3]">Terms</a>
          <a href="https://100words.app/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#555] transition-colors hover:text-[#e8e6e3]">
            100words.app
          </a>
        </div>
      </footer>
    </>
  );
}