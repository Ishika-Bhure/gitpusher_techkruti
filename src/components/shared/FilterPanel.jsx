import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function FilterPanel({ title = "Filter Results", children, triggerElement }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {triggerElement || (
          <Button variant="outline" size="sm" className="h-9 gap-2 shadow-sm rounded-lg bg-white">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-700">Filters</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl min-h-[50vh] px-6 pb-12 pt-8 border-slate-200 shadow-2xl z-[100]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-extrabold text-slate-900">{title}</SheetTitle>
          <SheetDescription className="text-slate-500 font-medium">
            Refine your search by selecting options below.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          {children || (
            <p className="text-slate-400 italic text-sm text-center py-8">
              No filters configured.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
