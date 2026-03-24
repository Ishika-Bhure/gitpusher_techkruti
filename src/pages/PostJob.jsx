import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Info, Send, Calendar, Clock, DollarSign, Map as MapIcon, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PostJob() {
  const navigate = useNavigate()
  const [isUrgent, setIsUrgent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation passing implicitly for demo
    alert(`Job successfully posted to the marketplace! Routing to Dashboard...`)
    navigate("/dashboard")
  }

  return (
    <div className="space-y-6 pb-24 pt-2 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Post a Job</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Hire verified local professionals for your task immediately.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Details */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" /> Basic Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Job Title <span className="text-red-500">*</span></label>
              <Input 
                placeholder="e.g. Repair leaking kitchen sink" 
                className="h-12 rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white"
                required 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Category <span className="text-red-500">*</span></label>
              <Select required>
                <SelectTrigger className="h-12 rounded-xl border-slate-300 font-medium bg-slate-50 focus:bg-white">
                  <SelectValue placeholder="Select skill category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                  <SelectItem value="plumber">Plumber</SelectItem>
                  <SelectItem value="electrician">Electrician</SelectItem>
                  <SelectItem value="painter">Painter</SelectItem>
                  <SelectItem value="cleaner">Cleaner</SelectItem>
                  <SelectItem value="carpenter">Carpenter</SelectItem>
                  <SelectItem value="helper">helper / Mazdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Detailed Description</label>
              <Textarea 
                placeholder="Describe exactly what you need done..." 
                className="min-h-[120px] rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white resize-none"
              />
            </div>
            
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between bg-red-50/50 border border-red-100 p-3 rounded-xl">
                <div className="flex flex-col">
                  <span className="text-[14px] font-extrabold text-red-600 flex items-center">
                    <Zap className="w-4 h-4 mr-1 fill-red-600" /> Mark as Urgent
                  </span>
                  <span className="text-[12px] font-medium text-slate-500">Notifies workers immediately</span>
                </div>
                <Switch 
                  checked={isUrgent} 
                  onCheckedChange={setIsUrgent}
                  className="data-[state=checked]:bg-red-600 shadow-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduling & Payment */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" /> Schedule & Pay
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-slate-700">Date <span className="text-red-500">*</span></label>
                <Input 
                  type="date"
                  className="h-12 rounded-xl border-slate-300 font-medium bg-slate-50 focus-visible:bg-white"
                  required 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-slate-700">Time</label>
                <div className="relative">
                   <Input 
                    type="time"
                    className="h-12 rounded-xl border-slate-300 font-medium bg-slate-50 focus-visible:bg-white pl-10"
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Budget (₹)</label>
              <div className="relative">
                <Input 
                  type="number"
                  placeholder="e.g. 500" 
                  className="h-12 rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white pl-10"
                />
                <DollarSign className="w-4 h-4 text-green-600 absolute left-3.5 top-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card className="shadow-sm border-slate-200 overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-50/50 opacity-50 z-0 pointer-events-none"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-600" /> Job Location
            </CardTitle>
            <CardDescription className="font-medium text-slate-500">
              Where should the worker arrive?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <Button 
              type="button" 
              variant="outline"
              className="w-full h-12 bg-white hover:bg-slate-50 border-blue-200 text-blue-700 font-extrabold shadow-sm rounded-xl"
              onClick={() => navigate('/map')}
            >
               <MapIcon className="w-4 h-4 mr-2" />
               Pick Location on Map
            </Button>
            
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Detailed Address <span className="text-red-500">*</span></label>
              <Textarea 
                placeholder="House No., Building, Landmark..." 
                className="min-h-[80px] rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-white focus-visible:bg-white resize-none shadow-sm"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 md:relative md:bg-transparent md:border-t-0 md:p-0 md:shadow-none md:mt-8">
          <Button 
            type="submit"
            className="w-full h-[52px] rounded-xl text-[16px] font-extrabold bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 shadow-lg border border-blue-600"
          >
            <Send className="w-5 h-5 mr-2" /> Post Job Request
          </Button>
        </div>
      </form>
    </div>
  )
}
