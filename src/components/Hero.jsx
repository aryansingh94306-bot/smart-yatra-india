import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bus,
  Brain,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const stats = [
  { value: "850+", label: "Daily Buses" },
  { value: "520+", label: "Connected Villages" },
  { value: "1.5M+", label: "Passengers" },
  { value: "98%", label: "Travel Satisfaction" },
];

const features = [
  {
    icon: Brain,
    title: "AI Journey Planner",
    text: "Smart route suggestions based on time, fare and traffic.",
  },
  {
    icon: Bus,
    title: "Live Bus Tracking",
    text: "Know the live location and ETA of your bus.",
  },
  {
    icon: MapPinned,
    title: "Village Connectivity",
    text: "Connecting rural India with smart transport.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Travel",
    text: "Verified buses, trusted drivers and emergency support.",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-500 via-white to-green-600">

      {/* Background Blur */}
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-orange-300/40 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-green-400/30 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 font-medium text-blue-700 shadow">

              <Sparkles size={18} />

              AI Powered Rural Mobility Platform

            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">

              Travel Smarter.

              <br />

              <span className="bg-gradient-to-r from-orange-600 via-blue-700 to-green-700 bg-clip-text text-transparent">

                Connect Every Village.

              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700">

              SmartYatra is India's next-generation mobility platform that
              connects villages, towns and cities through buses, metro,
              auto, e-rickshaw and AI-powered route planning.

            </p>

            <div className="mt-8 rounded-2xl bg-white/70 p-5 shadow-xl">

              <h3 className="font-bold text-blue-700">

                🇮🇳 Smart India Hackathon 2026

              </h3>

              <p className="mt-2 text-slate-700">

                Designed & Developed by <b>Aryan Singh</b>

              </p>

            </div>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/journey-planner"
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-4 font-semibold text-white transition hover:scale-105 hover:bg-orange-600"
              >

                Plan Journey

                <ArrowRight size={20} />

              </Link>

              <Link
                to="/live-tracking"
                className="rounded-xl border-2 border-green-600 px-7 py-4 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
              >

                Live Tracking

              </Link>

            </div>

            <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">

              {stats.map((item) => (

                <div
                  key={item.label}
                  className="rounded-2xl bg-white/80 p-5 text-center shadow-xl"
                >

                  <h2 className="text-3xl font-bold text-orange-600">

                    {item.value}

                  </h2>

                  <p className="mt-2 text-sm text-slate-700">

                    {item.label}

                  </p>

                </div>

              ))}

            </div>

          </motion.div>
                    {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-6"
          >
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <FeatureCard
                  key={item.title}
                  icon={<Icon size={32} />}
                  title={item.title}
                  text={item.text}
                />
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-3xl bg-white/85 p-7 shadow-2xl backdrop-blur-xl border border-white"
    >
      <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-r from-orange-500 to-green-500 p-4 text-white">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {text}
      </p>
    </motion.div>
  );
}