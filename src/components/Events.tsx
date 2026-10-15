import { motion } from 'motion/react';

const events = [
  {
    id: 1,
    title: 'Embedded Systems Workshop',
    date: 'SEP 15',
    status: 'OPEN',
    description: 'Introduction to bare-metal programming on STM32 microcontrollers.'
  },
  {
    id: 2,
    title: 'Fall Design Review',
    date: 'SEP 22',
    status: 'MEMBERS ONLY',
    description: 'Critical design review for Project ARES subsystems.'
  },
  {
    id: 3,
    title: 'Robotics Symposium',
    date: 'OCT 10',
    status: 'PUBLIC',
    description: 'Annual showcase of university robotics research and development.'
  }
];

export default function Events() {
  return (
    <section id="events" className="py-32 relative border-t border-white/5 bg-[#050505]/80">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-white/20" />
            <span className="font-mono text-sm tracking-widest text-white/50 uppercase">Operations</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium text-white"
          >
            Schedule
          </motion.h2>
        </div>

        <div className="border-t border-white/10">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group border-b border-white/10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors px-4 -mx-4"
            >
              <div className="flex items-start md:items-center gap-8 md:gap-16 w-full md:w-auto">
                <div className="font-mono text-white/40 w-20 shrink-0">
                  {event.date}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-2">{event.title}</h3>
                  <p className="text-white/50 text-sm max-w-xl">{event.description}</p>
                </div>
              </div>
              
              <div className="font-mono text-xs tracking-wider text-white/30 shrink-0 border border-white/10 px-3 py-1 self-start md:self-auto">
                {event.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
