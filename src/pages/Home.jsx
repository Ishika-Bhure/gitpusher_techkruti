import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Users, PlusCircle, Wrench, MapPin, Star, Banknote, HardHat, Zap, Scissors, Hammer, PaintRoller } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()

  // Framer Motion Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="space-y-8 pb-4"
    >
      {/* Hero Section */}
      <motion.section 
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/30 relative overflow-hidden"
      >
        {/* Decorative background animations */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl origin-center"
        />
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"
        />
        
        <div className="relative z-10 space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold tracking-tight drop-shadow-md"
          >
            RozgarSaathi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-100 font-medium text-[15px] opacity-90 max-w-[250px]"
          >
            Kaam aapke paas, bina middleman.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-6 relative z-10 w-full">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="secondary" 
              className="w-full bg-white text-blue-700 hover:bg-slate-50 shadow-lg font-extrabold h-12"
              onClick={() => navigate('/jobs')}
            >
              <Briefcase className="mr-2 h-4 w-4" /> Wait for Work
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              className="w-full bg-blue-800 text-white shadow-lg border border-blue-500/50 font-extrabold h-12 relative overflow-hidden group"
              onClick={() => navigate('/workers')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Users className="mr-2 h-4 w-4" /> Find Workers
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Action Cards */}
      <motion.section variants={container} initial="hidden" animate="show">
        <h2 className="text-lg font-bold text-slate-900 mb-3 px-1">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 1, title: "Find Jobs", icon: <Briefcase className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-100", route: "/jobs" },
            { id: 2, title: "Post Job", icon: <PlusCircle className="w-5 h-5" />, color: "text-orange-600", bg: "bg-orange-100", route: "/post-job" },
            { id: 3, title: "Register as Worker", icon: <Wrench className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-100", route: "/worker-profile" },
            { id: 4, title: "View Workers", icon: <Users className="w-5 h-5" />, color: "text-indigo-600", bg: "bg-indigo-100", route: "/workers" },
          ].map((action) => (
            <motion.div key={action.id} variants={item} whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.96 }}>
              <Card 
                className="cursor-pointer border-transparent shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                onClick={() => navigate(action.route)}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${action.bg}`}></div>
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2 relative z-10">
                  <motion.div 
                    initial={{ rotate: -10 }}
                    whileInView={{ rotate: 0 }}
                    className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center ${action.color} mb-1 shadow-inner`}
                  >
                    {action.icon}
                  </motion.div>
                  <span className={`font-extrabold text-[13px] leading-tight ${action.color.replace('text-', 'group-hover:text-').replace('-600', '-900')}`}>
                    {action.title}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skill Badge Section */}
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg font-bold text-slate-900 mb-3 px-1">Browse by Skill</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Plumber", icon: <Wrench className="w-3.5 h-3.5 mr-1" /> },
            { name: "Electrician", icon: <Zap className="w-3.5 h-3.5 mr-1 text-yellow-500 fill-yellow-500" /> },
            { name: "Painter", icon: <PaintRoller className="w-3.5 h-3.5 mr-1 text-pink-500" /> },
            { name: "Mazdoor", icon: <HardHat className="w-3.5 h-3.5 mr-1 text-orange-500" /> },
            { name: "Carpenter", icon: <Hammer className="w-3.5 h-3.5 mr-1 text-amber-700" /> },
            { name: "Cleaner", icon: <Scissors className="w-3.5 h-3.5 mr-1 text-emerald-500" /> },
          ].map((skill, index) => (
            <motion.div 
              key={skill.name} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF", color: "#4F46E5" }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white border-2 border-slate-100 text-[13px] font-extrabold text-slate-700 shadow-sm cursor-pointer"
              onClick={() => navigate(`/workers?skill=${skill.name.toLowerCase()}`)}
            >
              {skill.icon}
              {skill.name}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Nearby Jobs Preview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold text-slate-900 flex items-center">
             <MapPin className="w-5 h-5 mr-1.5 text-blue-600 animate-bounce" /> Nearby Priority Jobs
          </h2>
          <motion.span 
            whileHover={{ x: 3 }}
            className="text-[13px] font-extrabold text-blue-600 cursor-pointer uppercase tracking-wide" 
            onClick={() => navigate('/jobs')}
          >
            See all
          </motion.span>
        </div>
        <div className="space-y-3">
          {[
            { id: 1, title: "Need a Plumber for leaked pipe", location: "Sitabuldi, 2km", pay: "₹500", time: "Today, 4 PM" },
            { id: 2, title: "Wall painting for 2 BHK flat", location: "Dharampeth, 5km", pay: "₹3000", time: "Tomorrow" },
          ].map((job) => (
            <motion.div key={job.id} whileHover={{ x: 5, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Card className="cursor-pointer border-transparent shadow-md hover:shadow-lg bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all overflow-hidden" onClick={() => navigate(`/job/${job.id}`)}>
                <div className="w-1 h-full bg-blue-500 absolute left-0 top-0"></div>
                <CardContent className="p-4 pl-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-extrabold text-[15px] text-slate-900 leading-tight pr-2">{job.title}</h3>
                    <div className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-extrabold border border-green-200 whitespace-nowrap shadow-sm">
                      {job.pay}
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 font-bold space-x-3">
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span className="text-blue-600">{job.time}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Nearby Workers Preview */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pb-4"
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold text-slate-900 flex items-center">
             <Star className="w-5 h-5 mr-1.5 text-orange-500 fill-orange-500 animate-pulse" /> Top Workers Nearby
          </h2>
          <motion.span 
            whileHover={{ x: 3 }}
            className="text-[13px] font-extrabold text-blue-600 cursor-pointer uppercase tracking-wide" 
            onClick={() => navigate('/workers')}
          >
            See all
          </motion.span>
        </div>
        <div className="space-y-3">
          {[
            { id: 101, name: "Ramesh Kumar", role: "Electrician", rating: 4.8, jobs: 45, distance: "1.2km away" },
            { id: 103, name: "Amit Patel", role: "Painter", rating: 4.9, jobs: 120, distance: "0.8km away" },
          ].map((worker) => (
            <motion.div key={worker.id} whileHover={{ x: 5, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Card className="cursor-pointer border-transparent shadow-md hover:shadow-lg bg-white transition-all overflow-hidden" onClick={() => navigate(`/worker/${worker.id}`)}>
                <CardContent className="p-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-extrabold text-lg mr-3 shadow-inner border border-slate-200">
                    {worker.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-[15px] text-slate-900 leading-tight">{worker.name}</h3>
                    <p className="text-xs font-bold text-blue-600">{worker.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-[14px] font-extrabold text-slate-800">
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500 mr-1" />
                      {worker.rating}
                    </div>
                    <p className="text-[11px] font-bold text-slate-400">{worker.jobs} jobs</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
