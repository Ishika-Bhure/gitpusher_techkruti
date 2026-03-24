import { Link } from "react-router-dom"

export default function SectionHeader({ title, actionText = "See all", actionUrl, onAction }) {
  return (
    <div className="flex items-center justify-between mb-3 px-1 mt-6 first:mt-0">
      <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">{title}</h2>
      {actionUrl ? (
        <Link to={actionUrl} className="text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
          {actionText}
        </Link>
      ) : onAction ? (
        <button type="button" onClick={onAction} className="text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
          {actionText}
        </button>
      ) : null}
    </div>
  )
}
