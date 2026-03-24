import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AlertTriangle, MapPin, Phone, ShieldAlert, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SOS() {
  const navigate = useNavigate()
  const [alertSent, setAlertSent] = useState(false)
  const [locationStr, setLocationStr] = useState("Locating your device...")

  // Simulate Geolocation for UI purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocationStr("21.1458° N, 79.0882° E (Sitabuldi, Nagpur)")
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSOS = () => {
    // In prod: This triggers an actual SMS / Webhook Payload
    setAlertSent(true)
    setTimeout(() => {
      alert("Local authorities and your Emergency Contacts have been notified with your live coordinates.")
    }, 500)
  }

  return (
    <div className="pb-24 pt-2 max-w-2xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-2 px-1">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
        </button>
      </div>

      {/* Hero / Big Red Button */}
      <div className="text-center pt-2 pb-6 space-y-5">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center">
          <ShieldAlert className="w-6 h-6 mr-2 text-red-600" /> Emergency SOS
        </h1>
        
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          {/* Pulsing rings if NOT sent */}
          {!alertSent && (
            <>
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
              <div className="absolute inset-2 rounded-full bg-red-500 opacity-40 animate-pulse"></div>
            </>
          )}

          {/* Main Button */}
          <button 
            onClick={handleSOS}
            disabled={alertSent}
            className={`relative z-10 w-40 h-40 rounded-full flex flex-col items-center justify-center font-extrabold text-white shadow-2xl transition-all duration-300 active:scale-95 border-4
              ${alertSent 
                ? 'bg-slate-800 border-slate-700 shadow-none scale-95' 
                : 'bg-gradient-to-br from-red-600 to-red-700 border-red-500 hover:from-red-500 hover:to-red-600 shadow-red-600/50'
              }`}
          >
            {alertSent ? (
              <>
                <CheckCircle2 className="w-12 h-12 mb-2" />
                <span className="text-[18px] tracking-wide">SENT</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-14 h-14 mb-1 drop-shadow-md" />
                <span className="text-2xl tracking-widest drop-shadow-md">SOS</span>
              </>
            )}
          </button>
        </div>

        {/* Confirmation Status Text */}
        {alertSent ? (
          <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg font-bold shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Emergency Alert Sent Successfully!
          </div>
        ) : (
          <p className="text-[14px] font-bold text-red-600 px-8">
            Press the button above to alert emergency contacts and local authorities.
          </p>
        )}
      </div>

      {/* Current Location Lock */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-[14px] font-bold text-slate-800 uppercase tracking-wide">Live Location Feed</h2>
        </div>
        <CardContent className="p-4 bg-white">
          <p className={`text-[15px] font-medium ${locationStr.includes("Locating") ? "text-slate-400 italic" : "text-slate-900"}`}>
            {locationStr}
          </p>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
             <div className="h-full bg-blue-600 w-1/3 animate-pulse rounded-full"></div>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">Accuracy exactly: 5 meters</p>
        </CardContent>
      </Card>

      {/* Emergency Contacts Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 px-1">Quick Dial Authorities</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 shadow-sm"
            onClick={() => window.location.href="tel:100"}
          >
            <Phone className="w-5 h-5" />
            <span className="font-extrabold text-[13px]">Police (100)</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1 rounded-xl border-slate-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 shadow-sm"
            onClick={() => window.location.href="tel:108"}
          >
            <Phone className="w-5 h-5" />
            <span className="font-extrabold text-[13px]">Ambulance (108)</span>
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="w-full h-12 flex justify-start pl-4 gap-3 bg-white rounded-xl border-slate-200 shadow-sm text-slate-700"
          onClick={() => window.location.href="tel:181"}
        >
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
            <Phone className="w-4 h-4 text-pink-600" />
          </div>
          <span className="font-extrabold text-[14px]">Women's Helpline (181)</span>
        </Button>
      </div>

      {/* Safety Protocol */}
      <Card className="bg-amber-50 border-amber-200 shadow-none">
        <CardContent className="p-4 text-[13px] font-medium text-amber-900 space-y-2 leading-relaxed">
          <p className="font-bold flex items-center">
             <AlertTriangle className="w-4 h-4 mr-1.5" /> Safety Tips
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Move to a well-lit, populated area if possible.</li>
            <li>Do not disconnect the call if 100/108 answers. Let them hear the background noise if you cannot speak.</li>
            <li>Avoid confronting the aggressor physically if an escape route is available.</li>
          </ul>
        </CardContent>
      </Card>

    </div>
  )
}
