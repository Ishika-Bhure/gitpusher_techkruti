import { Button } from "@/components/ui/button"

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionText, 
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 my-6">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm font-medium text-slate-500 mb-6 max-w-[250px]">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <Button onClick={onAction} className="shadow-sm">
          {actionText}
        </Button>
      )}
    </div>
  )
}
