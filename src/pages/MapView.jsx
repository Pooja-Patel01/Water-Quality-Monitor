import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

// --- FIX FOR MISSING MARKER ICONS ---
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;
// ------------------------------------

const MapView = () => {
  const navigate = useNavigate();

  // Example marker data
  const locations = [
    { id: 1, name: "Hyderabad Central", pos: [17.385, 78.4867], ph: 7.2, status: "Excellent" },
    { id: 2, name: "Secunderabad Station", pos: [17.4399, 78.502], ph: 6.8, status: "Good" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <div className="bg-sky-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-sky-600 px-4 py-1.5 rounded-lg font-bold shadow hover:bg-sky-50 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-xl font-bold font-sans">Live Water Quality Map</h2>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 bg-white border-r border-sky-100 p-6 hidden lg:block overflow-y-auto">
          <h3 className="font-bold text-sky-700 mb-4 border-b pb-2">Location Insights</h3>
          <div className="space-y-4">
            <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 text-center">
              <p className="text-sm font-bold text-gray-600">Active Sensors</p>
              <p className="text-2xl font-bold text-sky-600">{locations.length}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Map Legend</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Excellent Quality</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Requires Attention</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full"></span> Critical Alert</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 p-4">
          <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <MapContainer center={[17.385, 78.4867]} zoom={12} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {locations.map((loc) => (
                <Marker key={loc.id} position={loc.pos}>
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-sky-700">{loc.name}</h3>
                      <p className="text-sm"><b>pH Level:</b> {loc.ph}</p>
                      <p className={`text-sm font-bold mt-1 ${loc.status === 'Excellent' ? 'text-green-600' : 'text-yellow-600'}`}>
                        Status: {loc.status}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
