import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, {
        duration: 2,
      });
    }
  }, [position, map]);

  return null;
}

export default function LocationPicker() {
  const [position, setPosition] = useState([23.2599, 77.4126]); // Bhopal

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([
          location.coords.latitude,
          location.coords.longitude,
        ]);
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  return (
    <section className="py-20 bg-slate-100">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-bold">
              Live Location
            </h2>

            <p className="text-slate-500">
              Detect your current location instantly.
            </p>

          </div>

          <button
            onClick={detectLocation}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <Navigation size={18} />
            Use My Location
          </button>

        </div>

        <div className="overflow-hidden rounded-3xl shadow-2xl">

          <MapContainer
            center={position}
            zoom={13}
            style={{
              height: "500px",
              width: "100%",
            }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>
                Your Current Location
              </Popup>
            </Marker>

            <FlyToLocation position={position} />

          </MapContainer>

        </div>

        <div className="mt-6 rounded-xl bg-white p-5 shadow">

          <h3 className="font-bold text-xl">
            Coordinates
          </h3>

          <p className="mt-2">
            Latitude : {position[0]}
          </p>

          <p>
            Longitude : {position[1]}
          </p>

        </div>

      </div>

    </section>
  );
}