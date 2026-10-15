import React, { useState, useEffect } from 'react';
import ConstructionWorkersScene from './ConstructionWorkersScene';
import { 
  ArrowUpRight, 
  Check, 
  Send, 
  HardHat, 
  Mail,
  Loader2
} from 'lucide-react';

export default function UnderConstruction() {
  // Countdown State: Exactly 3 days
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Subscription state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Check localStorage for previous subscription
  useEffect(() => {
    const saved = localStorage.getItem('arm_newsletter_subscribed');
    if (saved) {
      setSubscribed(true);
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

    // Save locally
    const existingList = JSON.parse(localStorage.getItem('arm_subscribers_list') || '[]');
    if (!existingList.includes(trimmed)) {
      existingList.push({ email: trimmed, date: new Date().toISOString() });
      localStorage.setItem('arm_subscribers_list', JSON.stringify(existingList));
    }
    localStorage.setItem('arm_newsletter_subscribed', trimmed);

    // Send an email to nhempire1717@gmail.com with the subscriber's email as content
    try {
      await fetch('https://formsubmit.co/ajax/nhempire1717@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New ARM Website Launch Notification Request: ${trimmed}`,
          from_name: 'ARM Website Notification System',
          _replyto: trimmed,
          subscriber_email: trimmed,
          message: `A new user has submitted their email address to be notified when the ARM website goes live.\n\nSubscriber Email: ${trimmed}\nTimestamp: ${new Date().toLocaleString()}\nPlatform: ARM (Automation & Robotics Club)`
        })
      });
    } catch (err) {
      // In case of network errors or adblock, it is already safely saved in local storage
      console.warn('Email dispatch network notification warning:', err);
    } finally {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col justify-between selection:bg-neutral-900 selection:text-white relative">
      {/* Subtle Architectural Grid */}
      <div className="fixed inset-0 bg-architect-grid pointer-events-none opacity-40 z-0" />

      {/* ============================================================ */}
      {/* 1. MINIMALIST TOP BAR                                        */}
      {/* ============================================================ */}
      <header className="relative z-10 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl tracking-tight text-neutral-900">
              ARM.
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-500 uppercase tracking-widest pl-3 border-l border-neutral-300">
              Automation & Robotics Club
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
            <span className="uppercase tracking-wider">Status: Under Construction</span>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT                                              */}
      {/* ============================================================ */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 sm:py-16 flex flex-col items-center text-center">
        
        {/* Editorial Subheader */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4">
          <HardHat className="w-3.5 h-3.5 text-amber-500" />
          <span>Work in Progress</span>
          <span aria-hidden="true">·</span>
          <span>Launch Target: 3 Days</span>
        </div>

        {/* Primary Clean Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-950 mb-5 leading-[1.1] max-w-3xl text-balance">
          Website is under construction.
        </h1>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed mb-8 font-normal">
          Our crew is hard at work assembling the new digital home for the Automation & Robotics Club. 
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
          <div className="w-full p-5 mb-8 bg-neutral-50/80 border border-neutral-200 rounded-sm">
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
              <div className="p-4 bg-neutral-50 border border-neutral-300 rounded-sm flex items-center justify-center gap-3">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-medium text-neutral-900 text-left">
                  Thank you! Your notification request has been logged and dispatched to <span className="font-semibold text-neutral-950">nhempire1717@gmail.com</span>.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white border border-neutral-300 focus:border-neutral-900 focus:outline-none text-sm text-neutral-900 placeholder:text-neutral-400 rounded-sm transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm whitespace-nowrap shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
      <footer className="relative z-10 w-full border-t border-neutral-200 bg-white py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 ARM · Automation & Robotics Club
          </div>

          <div className="flex items-center gap-6 font-medium text-neutral-600">
            <a 
              href="mailto:contact@arm-robotics.org"
              className="hover:text-neutral-900 transition-colors"
            >
              contact@arm-robotics.org
            </a>
            <span className="text-neutral-300">·</span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <span className="text-neutral-300">·</span>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-neutral-900 transition-colors flex items-center gap-1"
            >
              <span>Discord</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
