import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Star, ShieldCheck, Zap, Phone, CheckCircle2, Award, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function WorkerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Simulated Single Worker Fetch based on :id
  const worker = {
    id,
    name: "Amit Patel",
    role: "Professional Painter",
    experience: "8+ Years",
    jobsCompleted: 120,
    rating: 4.9,
    reviews: 45,
    skills: ["Wall painting", "Texture design", "Waterproofing", "Exterior coating", "Wood polishing"],
    location: "Manish Nagar, Nagpur",
    distance: "0.8 km away",
    availableToday: true,
    boosted: true,
    verified: true,
    about: "I am a professional painter with over 8 years of experience in residential and commercial spaces. I specialize in high-quality texture designs, waterproofing, and quick turnaround times. Cleanliness and customer satisfaction are my top priorities."
  }

  const initials = worker.name.charAt(0).toUpperCase()

  return (
    <div className="pb-24 pt-2 max-w-2xl mx-auto space-y-5">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-2 px-1">
        <button 
          onClick={() => navigate('/workers')}
          className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Workers
        </button>
      </div>

      {/* Main Profile Header */}
      <Card className={`relative overflow-hidden border-2 shadow-sm ${worker.boosted ? 'border-orange-300 shadow-orange-100/50' : 'border-slate-100'}`}>
        {/* Dynamic Cover Photo / Gradient Header */}
        <div className={`h-24 w-full ${worker.boosted ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}></div>
        
        {worker.boosted && (
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full font-extrabold text-[11px] uppercase flex items-center shadow-lg">
            <Zap className="w-3.5 h-3.5 mr-1 fill-white" /> Promoted
          </div>
        )}

        <CardContent className="px-4 pb-6 pt-0 relative">
          <div className="flex flex-col items-center -mt-12 text-center">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-3">
              <AvatarImage src={worker.image} alt={worker.name} />
              <AvatarFallback className="bg-slate-100 text-slate-700 font-extrabold text-3xl">{initials}</AvatarFallback>
            </Avatar>
            
            <div className="flex items-center gap-1.5 justify-center mb-1">
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {worker.name}
              </h1>
              {worker.verified && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
            </div>
            
            <p className="text-[15px] font-bold text-slate-500 mb-4">{worker.role}</p>

            {worker.availableToday && (
              <div className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-[13px] font-extrabold shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                AVAILABLE TODAY
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-slate-50 border-slate-100">
          <CardContent className="p-3 flex flex-col items-center justify-center text-center">
            <div className="flex items-center text-orange-500 font-extrabold text-lg mb-0.5">
              <Star className="w-4 h-4 fill-orange-500 mr-1" /> {worker.rating}
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{worker.reviews} Reviews</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-50 border-slate-100">
          <CardContent className="p-3 flex flex-col items-center justify-center text-center">
            <div className="flex items-center text-slate-900 font-extrabold text-lg mb-0.5">
              <Briefcase className="w-4 h-4 text-blue-500 mr-1.5" /> {worker.jobsCompleted}
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Jobs Done</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 border-slate-100">
          <CardContent className="p-3 flex flex-col items-center justify-center text-center">
            <div className="flex items-center text-slate-900 font-extrabold text-lg mb-0.5">
              <Award className="w-4 h-4 text-emerald-500 mr-1.5" /> {worker.experience.split('+')[0]}+ 
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Years Exp.</p>
          </CardContent>
        </Card>
      </div>

      {/* Verification / Trust Line */}
      {worker.verified && (
        <div className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 py-2.5 rounded-xl font-bold text-[13px] shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          RozgarSaathi Background Verified
        </div>
      )}

      {/* Location Details */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-2 px-1">Location Details</h2>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[15px] text-slate-900">{worker.location}</p>
                <p className="text-[13px] font-semibold text-slate-500">{worker.distance}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="font-bold" onClick={() => navigate('/map')}>
              Map
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-2 px-1">Verified Skills</h2>
        <div className="flex flex-wrap gap-2">
          {worker.skills.map((skill, idx) => (
            <div key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-[13px] font-bold shadow-sm">
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* About Box */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-2 px-1">About {worker.name.split(" ")[0]}</h2>
        <Card>
          <CardContent className="p-4 text-[14px] leading-relaxed text-slate-600 font-medium">
            {worker.about}
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
          onClick={() => alert(`Initiating Hire sequence with ${worker.name}...`)}
        >
          <CheckCircle2 className="w-5 h-5 mr-2" /> Hire Now
        </Button>
      </div>

      {/* Desktop Actions Layout */}
      <div className="hidden md:flex gap-3 pt-4">
         <Button 
          variant="outline" 
          className="flex-1 h-14 rounded-2xl text-[16px] font-bold text-slate-700 shadow-sm border-slate-200 bg-white hover:bg-slate-50"
          onClick={() => window.location.href="tel:000000"}
        >
          <Phone className="w-5 h-5 mr-2 text-blue-600" /> Call Worker
        </Button>
        <Button 
          className="flex-1 h-14 rounded-2xl text-[16px] font-bold bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 shadow-md border border-blue-600"
          onClick={() => alert(`Initiating Hire sequence with ${worker.name}...`)}
        >
          <CheckCircle2 className="w-5 h-5 mr-2" /> Hire {worker.name.split(" ")[0]} Now
        </Button>
      </div>
    </div>
  )
}
