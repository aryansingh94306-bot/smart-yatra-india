import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Bus,
  MapPinned,
  Brain,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 text-white">
      {/* Background Blur */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-20">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300">
            🇮🇳 AI Powered Rural Mobility Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-7xl">
            Travel Smarter,
            <br />
            <span className="text-cyan-400">
              Connect Every Village.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            SmartYatra uses AI to help travelers discover the fastest,
            safest, and most affordable journeys between villages and
            cities across India.
            <div className="mt-6 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2">
  <span className="text-sm font-medium text-cyan-300">
    🚀 Designed & Developed by <span className="font-bold text-white">Aryan Singh</span>
  </span>
</div>
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/journey-planner"
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:scale-105"
            >
              Plan Journey
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/live-tracking"
              className="rounded-xl border border-white/30 px-6 py-3 transition hover:bg-white/10"
            >
              Live Tracking
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-cyan-400">850+</h2>
              <p className="text-sm text-slate-300">Daily Buses</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">520+</h2>
              <p className="text-sm text-slate-300">Villages</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">1.5M+</h2>
              <p className="text-sm text-slate-300">Passengers</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden flex-1 lg:flex justify-center"
        >
          <div className="grid gap-6">

            <FeatureCard
              icon={<Brain size={34} />}
              title="AI Journey Planner"
              text="Find the fastest and cheapest route instantly."
            />

            <FeatureCard
              icon={<Bus size={34} />}
              title="Live Bus Tracking"
              text="Track buses in real time with ETA."
            />

            <FeatureCard
              icon={<MapPinned size={34} />}
              title="Village Connectivity"
              text="Connect rural India with smart transportation."
            />

            <FeatureCard
              icon={<ShieldCheck size={34} />}
              title="Safe Travel"
              text="Verified buses, drivers and emergency support."
            />

          </div>
        </motion.div>

      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-xl"
    >
      <div className="mb-3 text-cyan-400">{icon}</div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-2 text-slate-300">{text}</p>
    </motion.div>
  );
}