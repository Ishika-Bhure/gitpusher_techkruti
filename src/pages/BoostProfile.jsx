import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Zap, CheckCircle2, TrendingUp, Search, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BoostProfile() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("premium")

  const plans = [
    { id: "basic", name: "24 Hours Boost", price: "₹49", badge: false, benefits: ["Appear above non-boosted workers", "Valid for 1 day"] },
    { id: "premium", name: "7 Days Premium", price: "₹199", badge: true, tag: "POPULAR", benefits: ["Top #3 in Search Results", "Exclusive 'PROMOTED' Badge", "SMS Alerts for new jobs nearby", "Valid for 7 days"] },
    { id: "pro", name: "30 Days Pro", price: "₹499", badge: true, benefits: ["Guaranteed #1 Spot", "Exclusive 'PROMOTED' Badge", "Instant Call priority", "Valid for 30 days"] },
  ]

  const handleActivate = () => {
    alert(`Successfully activated ${plans.find(p => p.id === selectedPlan).name}! You are now boosted.`)
    navigate("/dashboard?role=worker")
  }

  return (
    <div className="pb-24 pt-2 max-w-2xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-2 px-1">
        <button 
          onClick={() => navigate('/worker-profile')}
          className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Profile
        </button>
      </div>

      {/* Hero Explainer */}
      <div className="text-center space-y-3 pt-2">
        <div className="w-16 h-16 bg-gradient-to-tr from-orange-400 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-orange-500/30">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Boost Your Earnings</h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-[280px] mx-auto mt-2 leading-relaxed">
            Get up to <strong className="text-orange-600">5x more job requests</strong> by appearing at the very top of customer searches.
          </p>
        </div>
      </div>

      {/* Preview Badge Display */}
      <Card className="bg-slate-900 border-transparent shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500"></div>
        <CardContent className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-slate-400 mb-1">How customers see you:</p>
            <div className="flex items-center">
              <span className="text-white font-extrabold text-[16px] mr-3">Amit Patel</span>
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-2.5 py-0.5 rounded-full font-extrabold text-[10px] uppercase flex items-center shadow-lg shadow-orange-500/30">
                <Zap className="w-3 h-3 mr-1 fill-white" /> Promoted
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Selection Cards */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-extrabold text-slate-900 px-1">Select a Boost Plan</h2>
        
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id
          
          return (
            <Card 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-orange-500 shadow-md shadow-orange-500/10 ring-1 ring-orange-500 bg-orange-50/30' 
                  : 'border-slate-200 hover:border-orange-300 bg-white'
              }`}
            >
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider flex items-center z-10 shadow-lg">
                  <Crown className="w-3.5 h-3.5 text-yellow-400 mr-1.5 fill-yellow-400" /> {plan.tag}
                </div>
              )}
              
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-500' : 'border-slate-300'}`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
                    </div>
                    <div>
                      <h3 className={`font-extrabold text-[16px] leading-none ${isSelected ? 'text-orange-700' : 'text-slate-900'}`}>
                        {plan.name}
                      </h3>
                    </div>
                  </div>
                  <div className={`font-extrabold text-xl ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                    {plan.price}
                  </div>
                </div>

                <div className="pl-8 space-y-2 mt-2">
                  {plan.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start text-[13px] font-medium text-slate-600">
                      <CheckCircle2 className={`w-4 h-4 mr-2 shrink-0 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Fixed Bottom Action Container */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 md:relative md:bg-transparent md:border-t-0 md:p-0 md:shadow-none md:mt-8">
        <Button 
          onClick={handleActivate}
          className="w-full h-[54px] rounded-xl text-[16px] font-extrabold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-orange-600/30 shadow-lg border-none text-white transition-transform active:scale-95"
        >
          <Zap className="w-5 h-5 mr-2 fill-white" /> Activate Boost Now
        </Button>
      </div>

    </div>
  )
}
