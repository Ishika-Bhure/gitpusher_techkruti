import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Briefcase, Zap, User, Clock, CheckCircle2, AlertTriangle, PlusCircle, Search, Activity, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import JobCard from "@/components/shared/JobCard"
import WorkerCard from "@/components/shared/WorkerCard"
import SectionHeader from "@/components/shared/SectionHeader"

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const role = searchParams.get('role') || 'worker'

  const toggleRole = () => {
    setSearchParams({ role: role === 'worker' ? 'customer' : 'worker' })
  }

  // Header Switcher for easy demo purposes
  const DemoRoleSwitcher = () => (
    <div className="flex justify-end mb-4">
      <div className="bg-slate-100 p-1 rounded-lg flex items-center text-[12px] font-bold">
         <button 
           onClick={() => setSearchParams({ role: 'worker' })}
           className={`px-3 py-1.5 rounded-md transition-colors ${role === 'worker' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
         >
           Worker View
         </button>
         <button 
           onClick={() => setSearchParams({ role: 'customer' })}
           className={`px-3 py-1.5 rounded-md transition-colors ${role === 'customer' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
         >
           Customer View
         </button>
      </div>
    </div>
  )

  return (
    <div className="pb-24 pt-2">
      <DemoRoleSwitcher />
      {role === 'worker' ? <WorkerDashboard /> : <CustomerDashboard />}
    </div>
  )
}

// ==========================================
// WORKER DASHBOARD
// ==========================================
function WorkerDashboard() {
  const navigate = useNavigate()
  const [isAvailable, setIsAvailable] = useState(true)

  // Demo Data
  const nearbyJobs = [
    { id: 10, title: "Emergency Water Pipe Fix", category: "Plumbing", location: "Sitabuldi", pay: "₹800", time: "ASAP", urgent: true },
    { id: 11, title: "Wiring for new AC", category: "Electrician", location: "Manish Nagar", pay: "₹450", time: "Tomorrow" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Profile Summary & Availability Toggle */}
      <Card className="border-slate-200 overflow-hidden shadow-sm relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
        <CardContent className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-start">
             <div>
                <h1 className="text-xl font-extrabold text-slate-900 leading-tight">Amit Patel</h1>
                <p className="text-[13px] font-bold text-blue-600 flex items-center mt-0.5">
                  Professional Painter <span className="mx-2 text-slate-300">•</span> ★ 4.9
                </p>
             </div>
             <Button variant="outline" size="sm" className="font-bold text-xs shadow-sm" onClick={() => navigate('/worker-profile')}>
               <User className="w-3.5 h-3.5 mr-1" /> Edit
             </Button>
          </div>

          <div className="bg-green-50/50 border border-green-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
             <div className="flex flex-col">
               <span className="text-[14px] font-extrabold text-green-700 flex items-center">
                 <CheckCircle2 className="w-4 h-4 mr-1.5" /> Working Today?
               </span>
               <span className="text-[12px] font-medium text-slate-600">Turn on to get live job alerts</span>
             </div>
             <Switch 
               checked={isAvailable} 
               onCheckedChange={setIsAvailable}
               className="data-[state=checked]:bg-green-600 shadow-sm" 
             />
          </div>
        </CardContent>
      </Card>

      {/* Boost Box */}
      <div 
        onClick={() => navigate('/boost-profile')}
        className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-lg shadow-orange-500/30 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform active:scale-95"
      >
        <div className="flex-1 pr-3">
          <h3 className="font-extrabold text-[16px] mb-0.5 flex items-center shadow-orange-900/10 drop-shadow-sm">
            <Zap className="w-4 h-4 mr-1.5 fill-white" /> Upgrade to Premium
          </h3>
          <p className="text-[12px] font-semibold text-orange-50 leading-tight">
            Appear at the top of customer searches.
          </p>
        </div>
        <div className="w-10 h-10 bg-white text-orange-600 rounded-full flex items-center justify-center shrink-0 shadow-inner font-extrabold text-sm">
          GO
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 gap-3">
         <Button 
           variant="outline"
           className="h-14 rounded-xl flex flex-col items-center justify-center gap-1 bg-white border-blue-100 hover:bg-blue-50 hover:border-blue-200 text-blue-700 shadow-sm"
           onClick={() => navigate('/jobs')}
         >
           <Search className="w-5 h-5" />
           <span className="text-[12px] font-extrabold">Find Jobs</span>
         </Button>
         <Button 
           variant="outline"
           className="h-14 rounded-xl flex flex-col items-center justify-center gap-1 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
           onClick={() => navigate('/dashboard')}
         >
           <Briefcase className="w-5 h-5" />
           <span className="text-[12px] font-extrabold">My Earnings</span>
         </Button>
      </div>

      {/* Nearby Jobs Section */}
      <div>
        <SectionHeader title="Live Nearby Jobs" action="View Map" onAction={() => navigate('/map')} />
        <div className="space-y-3 mt-3">
          {nearbyJobs.map(job => (
             <JobCard key={job.id} job={job} onClick={() => navigate(`/job/${job.id}`)} />
          ))}
        </div>
      </div>

      {/* Explicit SOS Button (As per request) */}
      <div className="fixed bottom-[80px] right-4 z-[99]">
         <Button 
           size="icon"
           className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-xl shadow-red-600/40 border-2 border-white flex items-center justify-center animate-bounce"
           onClick={() => navigate('/sos')}
         >
           <AlertTriangle className="w-7 h-7 text-white" />
         </Button>
      </div>

    </div>
  )
}

// ==========================================
// CUSTOMER DASHBOARD
// ==========================================
function CustomerDashboard() {
  const navigate = useNavigate()

  // Demo Data
  const recentWorkers = [
    { id: 1, name: "Suresh Singh", role: "Plumber", rating: 4.8, jobsCompleted: 42, distance: "1.2 km", availableToday: true, verified: true, skills: ["Pipe fitting", "Leak repair"] }
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Primary Action Hero */}
      <div className="bg-indigo-600 rounded-3xl p-5 text-white shadow-lg shadow-indigo-600/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full blur-2xl opacity-50"></div>
        <div className="relative z-10 space-y-4">
          <div>
            <h1 className="text-2xl font-extrabold mb-1 tracking-tight">Need a professional?</h1>
            <p className="text-indigo-100 text-[14px] font-medium leading-snug pr-4">
              Post your issue immediately and get verified workers reaching out to you in minutes.
            </p>
          </div>
          <Button 
            className="w-full h-12 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold shadow-sm flex gap-2 text-[15px]"
            onClick={() => navigate('/post-job')}
          >
            <PlusCircle className="w-5 h-5 line-height-none" /> Post Job Request Now
          </Button>
        </div>
      </div>

      {/* Summary Analytics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-slate-200 bg-slate-50/50 shadow-sm">
          <CardContent className="p-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
              <Briefcase className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-wider mb-0.5">Active Jobs</p>
            <p className="text-2xl font-extrabold text-slate-900">2</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-slate-50/50 shadow-sm">
          <CardContent className="p-4 flex flex-col justify-between" onClick={() => navigate('/workers')}>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
              <User className="w-4 h-4" />
            </div>
            <div>
               <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-wider mb-0.5">Saved Workers</p>
               <p className="text-2xl font-extrabold text-slate-900">14</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggested Workers / Nearby Workers */}
      <div>
        <SectionHeader title="Workers Near You" action="View All" onAction={() => navigate('/workers')} />
        <div className="space-y-3 mt-3">
          {recentWorkers.map(worker => (
             <WorkerCard key={worker.id} worker={worker} onClick={() => navigate(`/worker/${worker.id}`)} />
          ))}
        </div>
      </div>

      {/* Recent Activity Mini-Feed */}
      <div>
         <SectionHeader title="Recent Activity" />
         <Card className="mt-3 border-slate-200 shadow-sm overflow-hidden">
           <div className="p-4 flex items-start gap-4 border-b border-slate-100 bg-white">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                 <p className="text-[14px] font-bold text-slate-900 leading-tight mb-1">Amit connected with your Water Pipe request.</p>
                 <p className="text-[12px] font-medium text-slate-500 flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 10 mins ago</p>
              </div>
           </div>
           
           <div className="p-4 flex items-start flex-row gap-4 bg-slate-50/50">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                 <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1">
                 <p className="text-[14px] font-bold text-slate-600">You updated your profile information.</p>
                 <p className="text-[12px] font-medium text-slate-400 mt-1">Yesterday</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 font-bold ml-auto" onClick={() => navigate('/customer-profile')}>Edit</Button>
           </div>
         </Card>
      </div>
    </div>
  )
}
