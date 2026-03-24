import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Search, Map as MapIcon, Users, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import WorkerCard from "@/components/shared/WorkerCard"
import SkillBadge from "@/components/shared/SkillBadge"
import FilterPanel from "@/components/shared/FilterPanel"
import EmptyState from "@/components/shared/EmptyState"

// Expanded dummy worker data
const MOCK_WORKERS = [
  { id: 101, name: "Ramesh Kumar", role: "Electrician", skills: ["Wiring", "Inverter setup", "Panel Repair"], rating: 4.8, jobs: 45, location: "Sitabuldi", distance: "1.2km away", availableToday: true, boosted: true, verified: true },
  { id: 102, name: "Suresh Singh", role: "Plumber", skills: ["Pipe fitting", "Motor installation", "Drain cleaning"], rating: 4.5, jobs: 32, location: "Dharampeth", distance: "2.5km away", availableToday: false, boosted: false, verified: true },
  { id: 103, name: "Amit Patel", role: "Painter", skills: ["Wall painting", "Texture design", "Waterproofing", "Exterior coating"], rating: 4.9, jobs: 120, location: "Manish Nagar", distance: "0.8km away", availableToday: true, boosted: true, verified: true },
  { id: 104, name: "Raju Dev", role: "Mazdoor", skills: ["Heavy lifting", "Shifting", "Site cleanup"], rating: 4.2, jobs: 15, location: "IT Park", distance: "6km away", availableToday: true, boosted: false, verified: false },
  { id: 105, name: "Deepak Sharma", role: "Carpenter", skills: ["Furniture making", "Door locks", "Cabinet repair"], rating: 4.7, jobs: 88, location: "Sadar", distance: "4.1km away", availableToday: false, boosted: false, verified: true },
]

export default function Workers() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(true)

  // Auto-set filter based on incoming query parameter from Home
  useEffect(() => {
    const skillParam = searchParams.get("skill")
    if (skillParam) {
      // Capitalize first letter to match our filter cases
      const formattedSkill = skillParam.charAt(0).toUpperCase() + skillParam.slice(1)
      setActiveFilter(formattedSkill)
    }
  }, [searchParams])

  // Simulate Network Fetch
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // 800ms UI delay simulation
    return () => clearTimeout(timer)
  }, [searchQuery, activeFilter])

  // Advanced search/filtering logic
  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    // Check main search bar against name, role, and internal skills explicitly
    const lowercaseQuery = searchQuery.toLowerCase()
    const matchesSearch = worker.name.toLowerCase().includes(lowercaseQuery) || 
                          worker.role.toLowerCase().includes(lowercaseQuery) ||
                          worker.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
    
    if (activeFilter === "All") return matchesSearch
    if (activeFilter === "Available Today") return matchesSearch && worker.availableToday
    if (activeFilter === "Top Rated") return matchesSearch && worker.rating >= 4.7
    return matchesSearch && worker.role === activeFilter
  })

  // Action handlers
  const handleHire = (id) => {
    alert(`Initiating hire request to worker ID ${id}...`)
  }

  const handleCall = (id) => {
    window.location.href = "tel:0000000000"
  }

  return (
    <div className="space-y-6 pb-6 pt-2">
      {/* Header & Map Action */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Find Workers</h1>
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

      {/* Global Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-all shadow-sm font-medium text-slate-900"
          placeholder="Search skill (e.g. 'Wiring', 'Texture'...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Dynamic Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <FilterPanel title="Worker Filters">
            {/* Extended native filtering settings visually popped from Sheet */}
            <div className="space-y-6">
               <div>
                 <p className="font-semibold text-slate-700 mb-2">Location Boundary (km)</p>
                 <input type="range" className="w-full accent-blue-600" min="1" max="25" defaultValue="5" />
                 <div className="flex justify-between text-xs text-slate-500 font-bold mt-1">
                   <span>1km</span><span>25km</span>
                 </div>
               </div>
               <div>
                  <p className="font-semibold text-slate-700 mb-2">Requirements</p>
                  <div className="flex flex-wrap gap-2">
                    <SkillBadge name="Verified Only" />
                    <SkillBadge name="Available Now" />
                    <SkillBadge name="Rated 4.5+" />
                  </div>
               </div>
               <Button className="w-full mt-6 text-[15px] h-12 shadow-md">Show Results</Button>
            </div>
        </FilterPanel>

        {/* Horizon Quick Filters */}
        {["All", "Available Today", "Top Rated", "Plumber", "Electrician", "Painter", "Carpenter"].map((filter) => (
          <SkillBadge 
            key={filter}
            name={filter}
            active={activeFilter === filter}
            onClick={(name) => setActiveFilter(name)}
          />
        ))}
      </div>

      {/* Responsive View Grid */}
      <div className="space-y-4">
        <p className="font-medium text-[13px] text-slate-500">
          {isLoading ? (
             <Skeleton className="h-4 w-32" />
          ) : (
            `Showing ${filteredWorkers.length} ${filteredWorkers.length === 1 ? 'professional' : 'professionals'} nearby`
          )}
        </p>

        {isLoading ? (
          // Skeleton Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-4 border border-slate-100 p-4 rounded-xl bg-white shadow-sm overflow-hidden relative">
                <div className="flex gap-4 items-start">
                  <Skeleton className="h-16 w-16 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1 pt-1">
                    <Skeleton className="h-5 w-2/3 rounded-md" />
                    <Skeleton className="h-4 w-1/3 rounded-md" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWorkers.map((worker) => (
              <WorkerCard 
                key={worker.id} 
                worker={worker}
                onClick={() => navigate(`/worker/${worker.id}`)}
                onHire={() => handleHire(worker.id)}
                onCall={() => handleCall(worker.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Users}
            title="No workers found"
            description="We couldn't connect you with any available workers for this specific query."
            actionText="Clear All Filters"
            onAction={() => {
              setSearchQuery("")
              setActiveFilter("All")
              navigate('/workers', { replace: true }) // remove query param if exists
            }}
          />
        )}
      </div>
    </div>
  )
}
