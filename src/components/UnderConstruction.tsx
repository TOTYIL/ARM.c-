import React, { useState, useEffect } from 'react';
import ConstructionWorkersScene from './ConstructionWorkersScene';
import { 
  ArrowUpRight, 
  Check, 
  Send, 
  HardHat, 
  Mail,
  Loader2,
  Users,
  Instagram
} from 'lucide-react';

interface SubscriberRecord {
  email: string;
  date: string;
}

export default function UnderConstruction() {
  // Countdown State: Exactly 3 days
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Subscription state: defaults to false so email entry form is always visible
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [subscriberList, setSubscriberList] = useState<SubscriberRecord[]>([]);

  // Load saved subscribers without setting subscribed to true by default
  useEffect(() => {
    try {
      // Clear legacy subscribed flag so visitors always see the form
      localStorage.removeItem('arm_newsletter_subscribed');

      const rawList = localStorage.getItem('arm_subscribers_list');
      if (rawList) {
        const parsed = JSON.parse(rawList);
        if (Array.isArray(parsed)) {
          const normalized: SubscriberRecord[] = parsed.map((item: any) => {
            if (typeof item === 'string') {
              return { email: item, date: new Date().toISOString() };
            }
            return item;
          });
          setSubscriberList(normalized);
        }
      }
    } catch (e) {
      console.warn('Failed to parse subscribers list', e);
    }
  }, []);

  // Live countdown clock timer set to exactly 3 days from initial load
  useEffect(() => {
    // Check if target date is already stored to prevent resetting on page reload
    let storedTarget = localStorage.getItem('arm_target_launch_timestamp');
    let targetTime: number;

    if (storedTarget) {
      targetTime = parseInt(storedTarget, 10);
    } else {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 3);
      targetTime = targetDate.getTime();
      localStorage.setItem('arm_target_launch_timestamp', targetTime.toString());
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError('Please enter your email address.');
      return;
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setEmailError('Please provide a valid email format (e.g. name@domain.com).');
      return;
    }

    setIsSubmitting(true);

    const newRecord: SubscriberRecord = { email: trimmed, date: new Date().toISOString() };
    const updatedList = [newRecord, ...subscriberList.filter((item) => item.email !== trimmed)];
    setSubscriberList(updatedList);
    localStorage.setItem('arm_subscribers_list', JSON.stringify(updatedList));

    // 1. Dispatch via Netlify Forms (native on Netlify with zero activation step)
    try {
      const netlifyBody = new URLSearchParams({
        'form-name': 'launch-notify',
        'email': trimmed,
        'timestamp': new Date().toLocaleString(),
        'message': `ARM Launch Subscriber Email: ${trimmed}`
      });
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyBody.toString()
      });
    } catch {
      // Non-fatal if running outside of Netlify
    }

    // 2. Dispatch to FormSubmit with FIXED static parameters (no dynamic subject or captcha)
    // to prevent FormSubmit from continuously treating it as a new form requiring re-activation
    try {
      await fetch('https://formsubmit.co/ajax/nhempire1717@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'New ARM Website Launch Subscriber',
          _captcha: 'false',
          _template: 'table',
          _autoresponse: 'false',
          subscriber_email: trimmed,
          message: `A visitor entered their email address to be notified when the ARM website launches:\n\nEmail: ${trimmed}\nTime: ${new Date().toLocaleString()}`,
          recipient: 'nhempire1717@gmail.com'
        })
      });
    } catch (err) {
      console.warn('FormSubmit notification dispatch note:', err);
    } finally {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col justify-between selection:bg-neutral-900 selection:text-white relative w-full max-w-full overflow-x-clip">
      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-architect-grid pointer-events-none opacity-40 z-0" />

      {/* ============================================================ */}
      {/* 1. MINIMALIST TOP BAR                                        */}
      {/* ============================================================ */}
      <header className="relative z-10 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl tracking-tight text-neutral-900">
              ARM.
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-500 uppercase tracking-widest pl-3 border-l border-neutral-300">
              Automation Robotics Mechatronics Club
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
            <span className="uppercase tracking-wider text-[11px] sm:text-xs">Under Construction</span>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT                                              */}
      {/* ============================================================ */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-14 flex flex-col items-center text-center">
        
        {/* Editorial Subheader */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 font-mono text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider mb-3 px-2 max-w-full text-center">
          <HardHat className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Work in Progress</span>
        </div>

        {/* Primary Clean Headline */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-950 mb-3 sm:mb-5 leading-[1.15] max-w-3xl w-full text-balance">
          Website is under construction.
        </h1>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl w-full leading-relaxed mb-8 font-normal px-2">
          Our crew is hard at work assembling the new digital home for the Automation Robotics Mechatronics Club. 
          We're welding frameworks, torquing servos, and integrating live telemetry from the lab.
        </p>

        {/* ============================================================ */}
        {/* ANIMATED CONSTRUCTION WORKERS SCENE                          */}
        {/* ============================================================ */}
        <div className="w-full mb-10">
          <ConstructionWorkersScene />
        </div>

        {/* ============================================================ */}
        {/* 3-DAY COUNTDOWN & NOTIFICATION SECTION                       */}
        {/* ============================================================ */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
          
          {/* Tabular Countdown Timer (3 Days) */}
          <div className="w-full p-4 sm:p-5 mb-8 bg-neutral-50/80 border border-neutral-200 rounded-sm">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3 text-center">
              Target Launch Countdown
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-950 tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">
                  Days
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-950 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">
                  Hours
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-950 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">
                  Minutes
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-neutral-950 tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mt-0.5">
                  Seconds
                </div>
              </div>
            </div>
          </div>

          {/* Email Notification Form */}
          <div className="w-full">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
              Be the first to inspect the completed site
            </div>

            {subscribed ? (
              <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-300 rounded-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 w-full">
                <div className="flex items-start gap-3 text-left min-w-0">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-neutral-950">
                      Thank you! You're on the launch notification list.
                    </div>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      We'll dispatch an alert the moment the new website goes live.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setEmail('');
                  }}
                  className="text-xs font-mono text-neutral-500 hover:text-neutral-900 underline underline-offset-4 cursor-pointer shrink-0"
                >
                  Enter another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 w-full max-w-full">
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full min-w-0 px-4 py-3 bg-white border border-neutral-300 focus:border-neutral-900 focus:outline-none text-sm text-neutral-900 placeholder:text-neutral-400 rounded-sm transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm whitespace-nowrap shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Notify Me</span>
                      </>
                    )}
                  </button>
                </div>

                {emailError && (
                  <p className="text-xs text-rose-600 font-medium text-left">
                    {emailError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* 3. MINIMALIST CLEAN FOOTER                                    */}
      {/* ============================================================ */}
      <footer className="relative z-10 w-full border-t border-neutral-200 bg-white py-8 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-left">
          <div>
            © 2026 ARM · Automation Robotics Mechatronics Club
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-6 font-medium text-neutral-600">
            <div 
              className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-sm border border-neutral-200/80 select-none"
            >
              <Users className="w-3 h-3 text-neutral-500" />
              <span>Subscribers: {subscriberList.length}</span>
            </div>
            <span className="text-neutral-300">·</span>
            <a 
              href="mailto:armclub.btkit@gmail.com"
              className="hover:text-neutral-900 transition-colors"
            >
              armclub.btkit@gmail.com
            </a>
            <span className="text-neutral-300">·</span>
            <a 
              href="https://www.instagram.com/arm.clb/?utm_source=ig_web_button_share_sheet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
