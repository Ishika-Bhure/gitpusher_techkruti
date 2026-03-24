import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, User, Phone, MapPin, Zap, Save, CheckCircle2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import SkillBadge from "@/components/shared/SkillBadge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AVAILABLE_SKILLS = [
  "Plumber", "Electrician", "Painter", "Carpenter", 
  "Mazdoor", "Cleaner", "Driver", "AC Repair", 
  "Mason", "Pest Control", "Welder", "Gardener"
]

export default function WorkerProfile() {
  const navigate = useNavigate()
  const [selectedSkills, setSelectedSkills] = useState([])
  const [isAvailable, setIsAvailable] = useState(true)

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill.")
      return
    }
    alert("Profile saved successfully!")
    navigate("/dashboard?role=worker")
  }

  return (
    <div className="space-y-6 pb-24 pt-2 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Worker Profile</h1>
          <ShieldCheck className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-sm font-medium text-slate-500">
          Complete your profile to start receiving job requests instantly.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details Card */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-5 space-y-5">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <Input 
                  placeholder="e.g. Amit Patel" 
                  className="h-12 rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white pl-10"
                  required 
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Phone Number</label>
              <div className="relative">
                <Input 
                  type="tel"
                  placeholder="10-digit mobile number" 
                  className="h-12 rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white pl-10"
                  required 
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Details Card */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-5 space-y-6">
            {/* Multi-Select Skills Grid */}
            <div>
              <label className="text-[14px] font-bold text-slate-700 block mb-3">
                Select Your Skills <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SKILLS.map(skill => (
                  <SkillBadge 
                    key={skill}
                    name={skill}
                    active={selectedSkills.includes(skill)}
                    onClick={() => toggleSkill(skill)}
                  />
                ))}
              </div>
              {selectedSkills.length === 0 && (
                <p className="text-xs font-semibold text-red-500 mt-2">Select at least 1 skill to proceed.</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Years of Experience</label>
              <Select required>
                <SelectTrigger className="h-12 rounded-xl border-slate-300 font-medium bg-slate-50 focus:bg-white">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                  <SelectItem value="0-1">0 - 1 Years</SelectItem>
                  <SelectItem value="2-4">2 - 4 Years</SelectItem>
                  <SelectItem value="5-8">5 - 8 Years</SelectItem>
                  <SelectItem value="8+">8+ Years (Expertise)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Location & Availability Card */}
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-5 space-y-5">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Service Area / City Location</label>
              <div className="relative">
                <Input 
                  placeholder="e.g. Sitabuldi, Nagpur" 
                  className="h-12 rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white pl-10"
                  required 
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[14px] font-bold text-slate-700">Working Radius (km)</label>
                <span className="text-sm font-bold text-blue-600">10 km</span>
              </div>
              <input type="range" className="w-full accent-blue-600" min="1" max="50" defaultValue="10" />
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-xl shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[14px] font-extrabold text-green-700 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Available Today
                  </span>
                  <span className="text-[12px] font-medium text-slate-600">Show up in live searches</span>
                </div>
                <Switch 
                  checked={isAvailable} 
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-green-600 shadow-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Boost Banner */}
        <div 
          onClick={() => navigate('/boost-profile')}
          className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-5 text-white shadow-lg shadow-orange-500/30 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform active:scale-95"
        >
          <div className="flex-1 pr-4">
            <h3 className="font-extrabold text-[18px] mb-1 flex items-center shadow-orange-900/10 drop-shadow-sm">
              <Zap className="w-5 h-5 mr-1.5 fill-white" /> Boost Your Profile
            </h3>
            <p className="text-[13px] font-semibold text-orange-50 leading-tight">
              Get up to 5x more job requests. Show up at the top in customer searches!
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm shadow-inner border border-white/30">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Submit Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 md:relative md:bg-transparent md:border-t-0 md:p-0 md:shadow-none md:mt-8">
          <Button 
            type="submit"
            className="w-full h-[52px] rounded-xl text-[16px] font-extrabold bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 shadow-lg border border-blue-600"
          >
            <Save className="w-5 h-5 mr-2" /> Save Profile
          </Button>
        </div>
      </form>
    </div>
  )
}
