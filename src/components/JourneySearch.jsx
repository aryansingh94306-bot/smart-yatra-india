import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function JourneySearch() {
  return (
    <section className="-mt-20 relative z-20 px-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-slate-800">
            Plan Your Journey
          </h2>

          <p className="mt-2 text-slate-500">
            Find the fastest and most affordable route across India.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">

          {/* From */}
          <div>
            <label className="mb-2 block font-medium">
              From
            </label>

            <div className="flex items-center rounded-xl border p-3">
              <MapPin className="mr-2 text-blue-600" size={20} />

              <input
                type="text"
                placeholder="Village / City"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* To */}
          <div>
            <label className="mb-2 block font-medium">
              To
            </label>

            <div className="flex items-center rounded-xl border p-3">
              <MapPin className="mr-2 text-green-600" size={20} />

              <input
                type="text"
                placeholder="Destination"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block font-medium">
              Date
            </label>

            <div className="flex items-center rounded-xl border p-3">
              <Calendar className="mr-2 text-orange-500" size={20} />

              <input
                type="date"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="mb-2 block font-medium">
              Passengers
            </label>

            <div className="flex items-center rounded-xl border p-3">
              <Users className="mr-2 text-purple-600" size={20} />

              <select className="w-full outline-none bg-transparent">
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3 Passengers</option>
                <option>4 Passengers</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-end">
            <Link
              to="/journey-planner"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              <Search size={20} />
              Search
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}