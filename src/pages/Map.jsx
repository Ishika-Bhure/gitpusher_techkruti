import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { ArrowLeft, LocateFixed, Briefcase, Users, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

// Custom HTML Markers to avoid missing asset bugs and provide premium colors
const createCustomIcon = (bgColor, innerIconClass) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="background-color: ${bgColor}; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); display: flex; align-items: center; justify-content: center;">
        <div class="inner-dot" style="width: 12px; height: 12px; border-radius: 50%; background: white; opacity: 0.8;"></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
}

const userIcon = createCustomIcon('#2563EB')   // Primary Blue
const workerIcon = createCustomIcon('#16A34A') // Success Green
const jobIcon = createCustomIcon('#F97316')    // Warning Orange

// Helper component to smoothly center map
function RecenterAutomatically({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.5 })
    }
  }, [position, map])
  return null
}

const MOCK_DATA = [
  { id: 1, type: "worker", lat: 21.1458, lng: 79.0882, name: "Amit Patel", role: "Painter", rating: 4.9 },
  { id: 2, type: "worker", lat: 21.1486, lng: 79.0830, name: "Suresh Singh", role: "Plumber", rating: 4.5 },
  { id: 3, type: "job", lat: 21.1450, lng: 79.0910, title: "Emergency Water Pipe Fix", pay: "₹800" },
  { id: 4, type: "job", lat: 21.1400, lng: 79.0860, title: "Wiring setup for clinic", pay: "₹2500" },
  { id: 5, type: "worker", lat: 21.1410, lng: 79.0930, name: "Raju Dev", role: "Mazdoor", rating: 4.2 },
  { id: 6, type: "job", lat: 21.1465, lng: 79.0880, title: "Deep cleaning 2BHK flat", pay: "₹1500" },
]

export default function MapPage() {
  const navigate = useNavigate()
  
  // Default fallback (Nagpur)
  const defaultCenter = [21.1458, 79.0882]
  const [userPosition, setUserPosition] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all") // 'all', 'workers', 'jobs'

  // Fetch current geographical location
  const locateUser = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.log("Geolocation error:", err),
        { enableHighAccuracy: true }
      )
    }
  }, [])

  useEffect(() => {
    locateUser()
  }, [locateUser])

  const filteredMarkers = MOCK_DATA.filter((item) => {
    if (activeFilter === "all") return true
    if (activeFilter === "workers") return item.type === "worker"
    if (activeFilter === "jobs") return item.type === "job"
    return true
  })

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] -mx-4 sm:-mx-6 pt-2">
      {/* Absolute Top Toolbar overlaid on map for a premium app feel */}
      <div className="absolute top-20 left-4 right-4 z-[400] flex flex-col gap-3 pointer-events-none">
        <div className="flex justify-between items-start">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-slate-200 text-slate-700 pointer-events-auto active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={locateUser}
            className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 font-bold pointer-events-auto active:scale-95 transition-transform border border-blue-500"
          >
            <LocateFixed className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Filters */}
        <div className="flex gap-2 pointer-events-auto self-center bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-slate-200 w-max">
           <button 
             onClick={() => setActiveFilter("all")}
             className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors ${activeFilter === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
           >
             All
           </button>
           <button 
             onClick={() => setActiveFilter("workers")}
             className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors flex items-center ${activeFilter === "workers" ? "bg-green-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
           >
             <Users className="w-3.5 h-3.5 mr-1" /> Workers
           </button>
           <button 
             onClick={() => setActiveFilter("jobs")}
             className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors flex items-center ${activeFilter === "jobs" ? "bg-orange-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
           >
             <Briefcase className="w-3.5 h-3.5 mr-1" /> Jobs
           </button>
        </div>
      </div>

      <div className="flex-1 w-full relative z-0">
        <MapContainer 
          center={userPosition || defaultCenter} 
          zoom={14} 
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          {/* Subtle minimal light mode map tiles for better marker visibility */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <RecenterAutomatically position={userPosition} />

          {/* Current User Exact Position */}
          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup className="font-sans">
                <div className="font-extrabold text-[14px] text-blue-700">You are here</div>
              </Popup>
            </Marker>
          )}

          {/* Render Items */}
          {filteredMarkers.map((marker) => (
            <Marker 
              key={`${marker.type}-${marker.id}`} 
              position={[marker.lat, marker.lng]} 
              icon={marker.type === "worker" ? workerIcon : jobIcon}
            >
              <Popup className="font-sans min-w-[180px]">
                {marker.type === "worker" ? (
                  <div className="flex flex-col p-1">
                    <div className="font-extrabold text-[15px] mb-0.5 text-slate-900">{marker.name}</div>
                    <div className="text-[13px] font-bold text-green-700 flex justify-between items-center mb-2">
                       {marker.role} 
                       <span className="text-orange-500">★ {marker.rating}</span>
                    </div>
                    <Button size="sm" className="w-full h-8 text-xs font-bold" onClick={() => navigate(`/worker/${marker.id}`)}>
                      View Profile
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col p-1">
                     <div className="font-extrabold text-[15px] mb-0.5 text-slate-900 leading-tight">{marker.title}</div>
                     <div className="text-[14px] font-extrabold text-orange-600 mb-2">{marker.pay}</div>
                     <Button size="sm" className="w-full h-8 text-xs font-bold bg-orange-600 hover:bg-orange-700" onClick={() => navigate(`/job/${marker.id}`)}>
                      View Job Details
                     </Button>
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
