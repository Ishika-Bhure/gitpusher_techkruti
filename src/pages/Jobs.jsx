import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Map as MapIcon, AlertCircle, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import JobCard from "@/components/shared/JobCard"
import SkillBadge from "@/components/shared/SkillBadge"
import FilterPanel from "@/components/shared/FilterPanel"
import EmptyState from "@/components/shared/EmptyState"

// Expanded dummy data 
const MOCK_JOBS = [
  { id: 101, title: "Emergency Water Pipe Fix", category: "Plumbing", location: "Sitabuldi", distance: "1.2 km", pay: "₹600 - ₹800", time: "ASAP", urgent: true },
  { id: 102, title: "Wiring setup for new clinic", category: "Electrician", location: "Dharampeth", distance: "3.5 km", pay: "₹2500", time: "Tomorrow, 10 AM", urgent: false },
  { id: 103, title: "Daily helper for shifting heavy boxes", category: "Mazdoor", location: "IT Park", distance: "6 km", pay: "₹800 / day", time: "Flexible", urgent: false },
  { id: 104, title: "Deep cleaning 2BHK flat", category: "Cleaner", location: "Sadar", distance: "4 km", pay: "₹1500", time: "Saturday, 9 AM", urgent: true },
  { id: 105, title: "Kitchen cabinet repair", category: "Carpenter", location: "Manish Nagar", distance: "2 km", pay: "₹1000", time: "Today, 4 PM", urgent: false },
]

export default function Jobs() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate Network Fetch
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // 800ms loading skeleton simulation
    return () => clearTimeout(timer)
  }, [searchQuery, activeFilter])

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === "All") return matchesSearch
    if (activeFilter === "Urgent") return matchesSearch && job.urgent
    return matchesSearch && job.category === activeFilter
  })

  const handleApply = (id) => {
    alert(`Application initiated for Job ${id}`)
  }

  const handleCall = (id) => {
    // In mobile, this typically triggers a tel: link
    window.location.href = "tel:0000000000"
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header & Map Action */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Find Jobs</h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 gap-2 shadow-sm border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg"
          onClick={() => navigate('/map')}
        >
          <MapIcon className="w-4 h-4" />
          <span className="font-bold">Map</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-all shadow-sm"
          placeholder="Search for 'Plumber', 'Wiring'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Chips Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <FilterPanel title="Advanced Filters">
            {/* Filter internals passed natively to the Sheet */}
            <div className="space-y-4">
               <div>
                 <p className="font-semibold text-slate-700 mb-2">Maximum Distance</p>
                 <input type="range" className="w-full accent-blue-600" min="1" max="50" defaultValue="10" />
               </div>
               <div>
                  <p className="font-semibold text-slate-700 mb-2">Job Type</p>
                  <div className="flex gap-2">
                    <SkillBadge name="Full Request" />
                    <SkillBadge name="Hourly" />
                  </div>
               </div>
               <Button className="w-full mt-6 text-[15px]">Apply Filters</Button>
            </div>
        </FilterPanel>

        {/* Quick Filters */}
        {["All", "Urgent", "Plumbing", "Electrician", "Mazdoor"].map((filter) => (
          <SkillBadge 
            key={filter}
            name={filter}
            active={activeFilter === filter}
            onClick={(name) => setActiveFilter(name)}
          />
        ))}
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <p className="font-medium text-[13px] text-slate-500">
          {isLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            `Showing ${filteredJobs.length} ${filteredJobs.length === 1 ? 'result' : 'results'}`
          )}
        </p>

        {isLoading ? (
          // Skeleton Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-3 border border-slate-100 p-4 rounded-xl bg-white shadow-sm">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-12 rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job}
                onClick={() => navigate(`/job/${job.id}`)}
                onApply={() => handleApply(job.id)}
                onCall={() => handleCall(job.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={AlertCircle}
            title="No jobs found"
            description="We couldn't find any jobs matching your current search or filters. Try removing some filters."
            actionText="Clear Filters"
            onAction={() => {
              setSearchQuery("")
              setActiveFilter("All")
            }}
          />
        )}
      </div>
    </div>
  )
}
