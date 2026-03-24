import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MapPin, Clock, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function JobCard({ job, onClick, onApply, onCall }) {
  if (!job) return null;

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }} 
      whileTap={{ scale: 0.96 }}
      layout
    >
      <Card className="cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden relative group" onClick={onClick}>
        <div className="absolute inset-x-0 top-0 h-1 bg-transparent group-hover:bg-blue-500 transition-colors duration-300"></div>
      <CardContent className="p-4 relative">
        {job.urgent && (
          <div className="absolute top-0 right-0 bg-red-100 text-red-600 px-2 py-0.5 rounded-bl-xl font-bold text-[10px] uppercase tracking-wider">
            Urgent
          </div>
        )}
        
        <div className="flex justify-between items-start mb-1.5 pr-12">
          <h3 className="font-bold text-[16px] text-slate-900 leading-tight">{job.title}</h3>
        </div>
        
        {job.category && (
          <p className="text-blue-600 text-xs font-semibold mb-3">{job.category}</p>
        )}
        
        {job.pay && (
          <div className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-[13px] font-extrabold mb-4">
            {job.pay}
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-y-2 text-[12px] text-slate-500 font-medium">
          {job.location && (
            <div className="flex items-center w-full">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> 
              {job.location}
              {job.distance && (
                <span className="ml-1 text-slate-400">({job.distance})</span>
              )}
            </div>
          )}
          {job.time && (
            <div className="flex items-center w-full mt-1">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              {job.time}
            </div>
          )}
        </div>
      </CardContent>
      {(onApply || onCall) && (
        <CardFooter className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {onApply && (
            <Button onClick={onApply} className="flex-1 h-9 rounded-lg text-[13px]">
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Apply Now
            </Button>
          )}
          {onCall && (
            <Button onClick={onCall} variant="outline" className="flex-1 h-9 rounded-lg text-[13px] text-slate-700 bg-white border-slate-200">
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
