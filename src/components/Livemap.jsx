import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const busIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LiveMap() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-3 text-center text-5xl font-bold">
          Live Bus Network
        </h2>

        <p className="mb-10 text-center text-slate-500">
          Real-time transport monitoring across Madhya Pradesh.
        </p>

        <div className="overflow-hidden rounded-3xl shadow-2xl">

          <MapContainer
            center={[23.2599, 77.4126]}
            zoom={7}
            style={{
              height: "550px",
              width: "100%",
            }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[23.2599, 77.4126]} icon={busIcon}>
              <Popup>Bhopal Bus Hub</Popup>
            </Marker>

            <Marker position={[22.7196, 75.8577]} icon={busIcon}>
              <Popup>Indore Smart Bus</Popup>
            </Marker>

            <Marker position={[23.2032, 77.0844]} icon={busIcon}>
              <Popup>Sehore Route</Popup>
            </Marker>

          </MapContainer>

        </div>

      </div>
    </section>
  );
}