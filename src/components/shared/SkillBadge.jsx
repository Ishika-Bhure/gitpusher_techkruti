export default function SkillBadge({ name, icon: Icon, active, onClick }) {
  return (
    <button 
      className={`inline-flex items-center px-3 py-1.5 rounded-full border text-[13px] font-semibold transition-all shadow-sm active:scale-95 ${
        active 
          ? "bg-blue-100 border-blue-200 text-blue-700" 
          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
      }`}
      onClick={() => onClick && onClick(name)}
      type="button"
    >
      {Icon && <Icon className="w-3.5 h-3.5 mr-1.5" strokeWidth={2.5} />}
      {name}
    </button>
  )
}
