'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error)
  }, [error])

  return (
    // global-error must include html and body tags
    <html>
      <body className="min-h-screen flex items-center justify-center px-5 text-center pt-20">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Error Display */}
          <div className="relative">
            <div className="font-special-gothic-expanded text-[clamp(4rem,15vw,12rem)] font-extralight leading-none opacity-30">
              !
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-[clamp(1.5rem,4vw,3rem)] font-extralight">
              System Failure
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] font-extralight text-foreground/70">
              A critical error occurred. The system has been notified.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-4 bg-foreground/5 rounded-lg text-left">
                <p className="text-xs font-mono text-foreground/60 break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs font-mono text-foreground/40 mt-2">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Recovery Action */}
          <div className="pt-8">
            <button
              onClick={reset}
              className="px-6 py-3 border border-foreground/20 rounded-full font-light hover:bg-foreground/10 hover:border-foreground/40 transition-all duration-300"
            >
              Attempt Recovery
            </button>
          </div>

          {/* Error Details */}
          <div className="pt-12 text-sm font-extralight text-foreground/50">
            Error ID: {error.digest || 'unknown'} | Critical System Error
          </div>
        </div>
      </body>
    </html>
  )
}
