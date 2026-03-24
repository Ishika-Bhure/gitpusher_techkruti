import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, User, Phone, MapPin, Save, Heart, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import WorkerCard from "@/components/shared/WorkerCard"
import JobCard from "@/components/shared/JobCard"

export default function CustomerProfile() {
  const navigate = useNavigate()

  // Simulated Saved/History Data
  const savedWorkers = [
    { id: 101, name: "Ramesh Kumar", role: "Electrician", rating: 4.8, jobs: 45, location: "Sitabuldi", verified: true, availableToday: true }
  ]

  const postedJobs = [
    { id: 10, title: "Emergency Water Pipe Fix", category: "Plumbing", location: "Sitabuldi", pay: "₹800", time: "Completed" },
    { id: 11, title: "Wall Painting for 2BHK", category: "Painter", location: "Sitabuldi", pay: "₹3000", time: "Pending" }
  ]

  const handleSave = (e) => {
    e.preventDefault()
    alert("Profile saved successfully!")
    navigate("/dashboard?role=customer")
  }

  return (
    <div className="space-y-6 pb-24 pt-2 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Profile</h1>
          <ShieldCheck className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-sm font-medium text-slate-500">
          Manage your contact info, saved workers, and job history.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details Card */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
             <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5 pt-0">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Full Name</label>
              <div className="relative">
                <Input 
                  placeholder="e.g. Rahul Sharma" 
                  defaultValue="Rahul Sharma"
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
                  defaultValue="9876543210"
                  className="h-12 rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white pl-10"
                  required 
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details Card */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2">
             <CardTitle className="text-lg">Address Details</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5 pt-0">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Detailed Address (Default)</label>
              <Textarea 
                placeholder="House No., Building, Landmark..." 
                defaultValue="Flat 402, Shivam Appts, Sitabuldi"
                className="min-h-[80px] rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white resize-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700">Preferred Search Area</label>
              <div className="relative">
                <Input 
                  placeholder="e.g. Sitabuldi, Nagpur" 
                  defaultValue="Sitabuldi, Nagpur"
                  className="h-12 rounded-xl border-slate-300 font-medium placeholder:text-slate-400 bg-slate-50 focus-visible:bg-white pl-10"
                  required 
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Action */}
        <div className="pt-2">
          <Button 
            type="submit"
            className="w-full h-[52px] rounded-xl text-[16px] font-extrabold bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 shadow-lg border border-blue-600"
          >
            <Save className="w-5 h-5 mr-2" /> Save Profile Info
          </Button>
        </div>
      </form>

      {/* Dynamic Activity Sections */}
      <div className="space-y-8 pt-6 border-t border-slate-200">
        
        {/* Saved Workers List */}
        <section>
          <div className="flex items-center mb-3">
             <Heart className="w-5 h-5 text-red-500 mr-2 fill-red-500" />
             <h2 className="text-lg font-bold text-slate-900">Saved Workers</h2>
          </div>
          <div className="space-y-3">
             {savedWorkers.map((worker) => (
                <WorkerCard 
                  key={worker.id} 
                  worker={worker} 
                  onClick={() => navigate(`/worker/${worker.id}`)}
                />
             ))}
          </div>
        </section>

        {/* Posted Jobs History List */}
        <section>
          <div className="flex items-center mb-3 pt-2">
             <History className="w-5 h-5 text-indigo-500 mr-2" />
             <h2 className="text-lg font-bold text-slate-900">Posted Jobs History</h2>
          </div>
          <div className="space-y-3">
             {postedJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onClick={() => navigate(`/job/${job.id}`)}
                />
             ))}
          </div>
        </section>

      </div>
    </div>
  )
}
