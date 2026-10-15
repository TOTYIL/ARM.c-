export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 bg-[#020202] z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="font-display font-bold text-2xl tracking-tighter text-white">ARM.</span>
            <p className="text-white/40 text-sm mt-2 max-w-xs">
              Automation & Robotics Club<br />
              College of Engineering
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30">
          <p>&copy; {new Date().getFullYear()} ARM. All systems operational.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
