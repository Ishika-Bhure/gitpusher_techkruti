import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Clock, Banknote, ShieldCheck, Map as MapIcon, Phone, Send, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Simulated Single Job Fetch based on :id
  const job = {
    id,
    title: "Emergency Water Pipe Fix",
    category: "Plumbing",
    pay: "₹600 - ₹800",
    time: "Today, ASAP",
    urgent: true,
    description: "The main water pipe under the kitchen sink burst and is leaking heavily onto the cabinet floor. Need an experienced plumber immediately to replace the 2-inch pipe section and reseal it tightly. You will be fully reimbursed for any parts bought.",
    location: "Flat 402, Shivam Appts, Sitabuldi, Nagpur",
    distance: "1.2 km away",
    customer: { name: "Rajesh S.", rating: 4.8, memberSince: "2023" }
  }

  return (
    <div className="pb-24 pt-2 max-w-2xl mx-auto space-y-6">
      {/* Top Navigation */}
      <button 
        onClick={() => navigate('/jobs')}
        className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Jobs
      </button>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-3">
          <h1 className="text-[26px] font-extrabold text-slate-900 leading-tight tracking-tight">
            {job.title}
          </h1>
          {job.urgent && (
            <div className="bg-red-100 text-red-600 px-2.5 py-1 rounded-lg font-bold text-[11px] uppercase tracking-wider shrink-0 mt-1 shadow-sm border border-red-200">
              Urgent
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md text-[13px] border border-blue-100">
            {job.category}
          </span>
          <span className="text-sm font-medium text-slate-500 flex items-center">
            Posted 2 hrs ago
          </span>
        </div>
      </div>

      {/* Quick Details Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="hover:border-green-300">
          <CardContent className="p-4 flex flex-col items-start">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
              <Banknote className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-slate-500 uppercase">Payment</p>
            <p className="text-[15px] font-extrabold text-green-700">{job.pay}</p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-orange-300">
          <CardContent className="p-4 flex flex-col items-start">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-[12px] font-semibold text-slate-500 uppercase">When</p>
            <p className="text-[15px] font-extrabold text-slate-900">{job.time}</p>
          </CardContent>
        </Card>
      </div>

      {/* About Customer */}
      <Card className="bg-slate-50 border-transparent shadow-none">
        <CardContent className="p-4 flex items-center">
          <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-500 font-bold text-lg mr-3">
            {job.customer.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[15px] text-slate-900">{job.customer.name}</h3>
            <div className="flex items-center text-[12px] font-medium text-slate-500 gap-2">
              <span>★ {job.customer.rating} Rating</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-0.5" /> Verified</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center mb-2">
          <Info className="w-5 h-5 mr-2 text-slate-400" /> Description
        </h2>
        <Card>
          <CardContent className="p-4 text-[14px] leading-relaxed text-slate-600 font-medium">
            {job.description}
          </CardContent>
        </Card>
      </div>

      {/* Location & Map Preview */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center mb-2">
          <MapPin className="w-5 h-5 mr-2 text-slate-400" /> Location Details
        </h2>
        <Card className="overflow-hidden border-slate-200">
          {/* Mock Map Viewport */}
          <div className="h-32 bg-slate-100 w-full relative flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
             <div className="z-10 bg-white p-2 rounded-full shadow-lg border border-slate-200 animate-bounce">
                <MapPin className="w-6 h-6 text-blue-600" />
             </div>
          </div>
          <CardContent className="p-4 space-y-4">
            <div>
              <p className="font-bold text-[14px] text-slate-900">{job.distance}</p>
              <p className="text-[13px] font-medium text-slate-500 mt-0.5">{job.location}</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full font-bold shadow-sm"
              onClick={() => navigate('/map')}
            >
              <MapIcon className="w-4 h-4 mr-2 text-blue-600" /> View Full Map
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Actions Container */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 md:hidden flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1 h-12 rounded-xl text-[15px] font-bold text-slate-700 shadow-sm border-slate-200 bg-white hover:bg-slate-50"
          onClick={() => window.location.href="tel:000000"}
        >
          <Phone className="w-5 h-5 mr-2 text-blue-600" /> Call
        </Button>
        <Button 
          className="flex-1 h-12 rounded-xl text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 shadow-md border border-blue-600"
          onClick={() => alert(`Application for ${job.title} sent to ${job.customer.name}!`)}
        >
          <Send className="w-5 h-5 mr-2" /> Apply Now
        </Button>
      </div>

      {/* Desktop Actions Layout */}
      <div className="hidden md:flex gap-3 pt-4">
         <Button 
          variant="outline" 
          className="flex-1 h-14 rounded-2xl text-[16px] font-bold text-slate-700 shadow-sm border-slate-200 bg-white hover:bg-slate-50"
          onClick={() => window.location.href="tel:000000"}
        >
          <Phone className="w-5 h-5 mr-2 text-blue-600" /> Call Customer
        </Button>
        <Button 
          className="flex-1 h-14 rounded-2xl text-[16px] font-bold bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 shadow-md"
          onClick={() => alert(`Application for ${job.title} sent to ${job.customer.name}!`)}
        >
          <Send className="w-5 h-5 mr-2" /> Submit Application
        </Button>
      </div>
    </div>
  )
}
