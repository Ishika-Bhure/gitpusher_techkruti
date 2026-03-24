import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Briefcase, User, Phone, Mail } from "lucide-react"

export default function SignInPage() {
  const navigate = useNavigate()

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-100 via-white to-cyan-100 overflow-hidden relative">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <Card className="w-full max-w-md shadow-2xl bg-white/80 backdrop-blur-xl border border-white/50 relative z-10 max-h-[96dvh] overflow-y-auto">
        <CardHeader className="text-center space-y-1 pb-4">
          <div className="mx-auto bg-gradient-to-br from-indigo-500 to-cyan-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-lg text-white">
            <Briefcase className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome to RozgarSaathi
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 font-medium">
            Find work or hire workers nearby
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3 pb-4">
          <Button 
            className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-md transition-all"
            onClick={() => navigate('/dashboard?role=worker')}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Continue as Worker
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-11 text-sm font-semibold border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm transition-all"
            onClick={() => navigate('/dashboard?role=customer')}
          >
            <User className="mr-2 h-4 w-4" />
            Continue as Customer
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-transparent px-2 text-slate-500 backdrop-blur-2xl rounded-full">Or continue with</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full h-10 text-slate-700 border-slate-200 hover:bg-slate-50/80 font-medium bg-white/50"
              onClick={() => {}}
            >
              <Phone className="mr-2 h-4 w-4 text-indigo-500" />
              Continue with Phone
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="w-full h-10 text-slate-700 border-slate-200 hover:bg-slate-50/80 font-medium bg-white/50"
                onClick={() => {}}
              >
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-10 text-slate-700 border-slate-200 hover:bg-slate-50/80 font-medium bg-white/50"
                onClick={() => {}}
              >
                <Mail className="mr-2 h-4 w-4 text-cyan-600" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 pt-0 pb-6">
          <Button 
            variant="ghost" 
            className="w-full h-10 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 font-medium"
            onClick={() => navigate('/home')}
          >
            Skip for now
          </Button>
          <p className="text-[11px] text-center text-slate-500 font-medium">
            You can explore the app without signing in
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
