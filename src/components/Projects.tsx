import { motion } from 'motion/react';
import { Cpu, Rocket, Crosshair } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Project ARES',
    description: 'Autonomous surface exploration rover utilizing LIDAR SLAM and stereo vision for obstacle avoidance in unstructured terrain.',
    icon: Rocket,
    specs: ['ROS2', 'C++', 'NVIDIA Jetson'],
  },
  {
    id: 2,
    title: 'Kinetic Platform X',
    description: '15lb competitive combat robotics platform featuring a custom-machined titanium chassis and high-torque kinetic weapon.',
    icon: Crosshair,
    specs: ['SolidWorks', 'CNC', 'Telemetry'],
  },
  {
    id: 3,
    title: 'Neural Node',
    description: 'Distributed mesh network of environmental sensors running edge ML models for predictive campus energy analysis.',
    icon: Cpu,
    specs: ['TinyML', 'ESP32', 'React'],
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative border-t border-white/5 bg-[#030303]/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-white/20" />
            <span className="font-mono text-sm tracking-widest text-white/50 uppercase">Active Systems</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium text-white"
          >
            Research & Deployment
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/[0.02] border border-white/10 p-8 hover:bg-white/[0.04] transition-colors group relative flex flex-col"
            >
              <div className="mb-12">
                <project.icon className="w-8 h-8 text-white/40 group-hover:text-white transition-colors mb-6" />
                <h3 className="text-2xl font-display font-medium text-white mb-4">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="mt-auto pt-8 border-t border-white/10 flex flex-wrap gap-3">
                {project.specs.map(spec => (
                  <span key={spec} className="text-xs font-mono text-white/40">
                    // {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
