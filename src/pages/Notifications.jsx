import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Bell, Briefcase, UserCheck, Info, ShieldAlert, Check, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EmptyState from "@/components/shared/EmptyState"

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "safety", title: "Emergency System Active", message: "Your SOS settings are configured and ready. Tap to review.", time: "10 mins ago", read: false },
  { id: 2, type: "job", title: "New Job Match: Painter Needed", message: "A customer in Manish Nagar is looking for a painter urgently.", time: "1 hr ago", read: false },
  { id: 3, type: "worker", title: "Amit accepted your request", message: "Your emergency water pipe issue has been accepted. View contact info.", time: "3 hrs ago", read: true },
  { id: 4, type: "system", title: "Profile Verified", message: "Your background verification is complete. Welcome to RozgarSaathi!", time: "1 day ago", read: true },
]

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type, read) => {
    const baseClass = `w-6 h-6 shrink-0`
    switch (type) {
      case 'job': return <Briefcase className={`${baseClass} text-blue-500`} />
      case 'worker': return <UserCheck className={`${baseClass} text-green-500`} />
      case 'safety': return <ShieldAlert className={`${baseClass} text-red-500`} />
      default: return <Info className={`${baseClass} text-slate-500`} />
    }
  }

  const getStyle = (type, read) => {
    if (read) return 'border-slate-100 bg-white'
    switch (type) {
      case 'safety': return 'border-red-200 bg-red-50/30'
      case 'job': return 'border-blue-200 bg-blue-50/50'
      case 'worker': return 'border-green-200 bg-green-50/50'
      default: return 'border-slate-200 bg-slate-50/80'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="pb-24 pt-2 max-w-2xl mx-auto space-y-5">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-1 px-1">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="mr-1 mt-0.5 active:scale-95 text-slate-500 hover:text-slate-900">
             <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
            Notifications {unreadCount > 0 && <span className="ml-2 bg-blue-600 text-white text-[11px] px-2 py-0.5 rounded-full font-bold">{unreadCount}</span>}
          </h1>
        </div>
        
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="text-[13px] font-bold text-blue-600 hover:text-blue-700">
            Mark all read
          </button>
        )}
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
           <EmptyState 
             icon={Bell} 
             title="No notifications yet" 
             message="You're all caught up! We'll alert you when there's activity."
           />
        ) : (
          notifications.map((notif) => (
            <Card key={notif.id} className={`shadow-sm transition-colors duration-200 relative overflow-hidden group ${getStyle(notif.type, notif.read)}`}>
              {!notif.read && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              )}
              <CardContent className="p-4 flex gap-4">
                {/* Icon Container */}
                <div className={`mt-0.5 shrink-0 ${!notif.read && notif.type === 'safety' ? 'animate-pulse' : ''}`}>
                  {getIcon(notif.type, notif.read)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-[15px] leading-tight ${notif.read ? 'font-bold text-slate-700' : 'font-extrabold text-slate-900'}`}>
                      {notif.title}
                    </h3>
                  </div>
                  <p className={`text-[13px] leading-snug mb-2 ${notif.read ? 'text-slate-500 font-medium' : 'text-slate-600 font-semibold'}`}>
                    {notif.message}
                  </p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {notif.time}
                  </p>
                  
                  {/* Action Buttons Mobile */}
                  <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100/50">
                    {!notif.read && (
                      <button 
                        onClick={() => markAsRead(notif.id)}
                        className="text-[12px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Mark Read
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="text-[12px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  )
}
