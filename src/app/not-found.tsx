import Link from "next/link"
import { ArrowRight, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center pt-20">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 404 Number */}
        <div className="font-special-gothic-expanded text-[clamp(4rem,15vw,12rem)] font-extrabold leading-none">
          404
        </div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-[clamp(1.5rem,4vw,3rem)] font-extralight">
            Page Not Found
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] font-extralight text-foreground/70">
            Looks like you've wandered into uncharted territory. 
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link 
            href="/"
            className="px-6 py-3 border border-foreground/20 rounded-full font-light hover:bg-foreground/10 hover:border-foreground/40 transition-all duration-300 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link 
            href="/work"
            className="px-6 py-3 border border-foreground/20 rounded-full font-light hover:bg-foreground/10 hover:border-foreground/40 transition-all duration-300 flex items-center gap-2"
          >
            View Our Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Optional: Add some visual interest */}
        <div className="pt-12 text-sm font-extralight text-foreground/50">
          Error Code: 404 | Lost in the digital void
        </div>
      </div>
    </div>
  )
}
