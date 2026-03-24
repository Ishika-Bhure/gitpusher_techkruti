import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star, MapPin, Zap, Phone, CheckCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function WorkerCard({ worker, onClick, onHire, onCall }) {
  if (!worker) return null;

  const initials = worker.name ? worker.name.charAt(0).toUpperCase() : "?"

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }} 
      whileTap={{ scale: 0.96 }}
      layout
    >
      <Card className={`cursor-pointer transition-all overflow-hidden ${worker.boosted ? 'border-orange-300 shadow-orange-100/50 shadow-md' : 'hover:border-blue-300 hover:shadow-lg shadow-sm border-slate-200'} relative group`} onClick={onClick}>
        {!worker.boosted && <div className="absolute inset-x-0 top-0 h-1 bg-transparent group-hover:bg-blue-500 transition-colors duration-300"></div>}
      <CardContent className="p-4 relative">
        {worker.boosted && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-red-500 text-white px-2 py-0.5 rounded-bl-xl font-bold text-[10px] uppercase tracking-wider flex items-center shadow-sm">
            <Zap className="w-3 h-3 mr-0.5 fill-white" /> Promoted
          </div>
        )}

        <div className="flex items-start mb-3 mt-1">
          <Avatar className="w-14 h-14 mr-4 border-2 border-slate-100 shadow-sm">
            <AvatarImage src={worker.image} alt={worker.name} />
            <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 font-bold text-xl">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="font-extrabold text-[16px] text-slate-900 leading-tight">{worker.name}</h3>
              {worker.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
            </div>
            
            <p className="text-[13px] font-bold text-slate-500 mb-1">{worker.role}</p>

            <div className="flex flex-wrap gap-1 mb-2">
              {worker.skills?.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                  {skill}
                </span>
              ))}
              {worker.skills?.length > 3 && (
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                  +{worker.skills.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex items-center text-[12px] text-slate-500 font-medium">
              <MapPin className="w-3 h-3 mr-1 text-slate-400" />
              {worker.location}
              {worker.distance && <span className="ml-1 text-slate-400">({worker.distance})</span>}
            </div>
          </div>
          
          <div className="text-right flex flex-col items-end justify-start pr-1 pt-1">
            {worker.rating && (
              <div className="flex items-center font-bold text-sm text-slate-800 mb-1 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500 mr-1" />
                {worker.rating}
              </div>
            )}
            {worker.jobs !== undefined && (
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                {worker.jobs} JOBS
              </p>
            )}
          </div>
        </div>
        
        {worker.availableToday && (
          <div className="mt-3 inline-flex items-center px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-[11px] font-extrabold w-full justify-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            AVAILABLE TODAY
          </div>
        )}
      </CardContent>
      
      {(onHire || onCall) && (
        <CardFooter className="p-3 bg-slate-50 mt-auto border-t border-slate-100 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {onHire && (
            <Button onClick={onHire} className="flex-1 h-9 rounded-lg text-[13px] bg-blue-600 hover:bg-blue-700 shadow-sm border border-blue-600">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Hire Now
            </Button>
          )}
          {onCall && (
            <Button onClick={onCall} variant="outline" className="flex-1 h-9 rounded-lg text-[13px] text-slate-700 bg-white border-slate-200 shadow-sm">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Call
            </Button>
          )}
        </CardFooter>
      )}
      </Card>
    </motion.div>
  )
}
