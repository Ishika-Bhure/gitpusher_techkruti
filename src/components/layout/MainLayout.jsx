import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import BottomNav from "./BottomNav"

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      {/* 
        Main content wrapper. 
        pt-16 pushes content below the fixed Navbar 
        pb-20 pushes content above the fixed BottomNav on mobile.
      */}
      <main className="flex-1 w-full max-w-2xl mx-auto pt-16 pb-20 md:pt-20 md:pb-8 px-4 sm:px-6">
        <Outlet />
      </main>
      
      <BottomNav />
    </div>
  )
}
