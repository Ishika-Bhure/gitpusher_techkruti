import { Link } from "react-router-dom"
import { Bell, ShieldAlert } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm border-b border-slate-200 z-50 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-blue-600/20 shadow-sm">
          <span className="font-bold text-sm">RS</span>
        </div>
        <Link to="/home" className="text-xl font-bold tracking-tight text-slate-900">
          Rozgar<span className="text-blue-600">Saathi</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/sos" className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-sm hover:bg-red-100 transition-colors border border-red-100">
          <ShieldAlert className="w-5 h-5" />
        </Link>
        <Link to="/notifications" className="relative text-slate-500 hover:text-slate-900 transition-colors p-2">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-white"></span>
        </Link>
      </div>
    </nav>
  )
}
