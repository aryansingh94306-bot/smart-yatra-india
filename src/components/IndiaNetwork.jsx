import { Bus, MapPin, Route, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function IndiaNetwork() {
  const stats = [
    {
      icon: <Bus size={28} />,
      value: "850+",
      title: "Daily Buses",
    },
    {
      icon: <MapPin size={28} />,
      value: "520+",
      title: "Villages Connected",
    },
    {
      icon: <Route size={28} />,
      value: "2100+",
      title: "Routes",
    },
    {
      icon: <Wifi size={28} />,
      value: "24×7",
      title: "Live Tracking",
    },
  ];

  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            SmartYatra Network
          </h2>

          <p className="mt-5 text-lg text-slate-300">
            Connecting villages and cities with AI-powered transportation.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
          >
            <h3 className="mb-8 text-3xl font-bold">
              Coverage Overview
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-800 p-6 text-center"
                >
                  <div className="mb-4 flex justify-center text-cyan-400">
                    {item.icon}
                  </div>

                  <h4 className="text-3xl font-bold">
                    {item.value}
                  </h4>

                  <p className="mt-2 text-slate-400">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-blue-900 to-cyan-900 p-10"
          >
            <div className="text-center">
              <div className="text-8xl">🗺️</div>

              <h3 className="mt-6 text-3xl font-bold">
                Interactive India Map
              </h3>

              <p className="mt-4 text-slate-300">
                Live buses, AI routes, smart connectivity,
                and real-time travel information.
              </p>

              <button className="mt-8 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-900 transition hover:scale-105">
                Explore Network
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}