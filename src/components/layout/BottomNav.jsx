import { Link, useLocation } from "react-router-dom"
import { Home, Map as MapIcon, Briefcase, User } from "lucide-react"

export default function BottomNav() {
  const location = useLocation()
  
  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/jobs", icon: Briefcase, label: "Jobs" },
    { path: "/map", icon: MapIcon, label: "Map" },
    { path: "/dashboard", icon: User, label: "Profile" }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 md:hidden z-50 px-2 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname.startsWith(item.path)
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${
              isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {isActive && (
              <span className="absolute top-0 w-8 h-1 bg-blue-600 rounded-b-full shadow-sm shadow-blue-600/50"></span>
            )}
            <Icon className={`w-[22px] h-[22px] mt-1 ${isActive ? "drop-shadow-sm" : ""}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
