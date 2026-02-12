import { Metadata } from "next";
import DecryptedText from "@/components/DecryptedText";
import AnimatedDescription from "@/components/AnimatedDescription";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Yamen Creates - Contact",
};

export default function Contact() {
  return (
    <div className="mt-32 px-5 md:px-10 lg:px-20 space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h1 className="font-bold text-[clamp(2rem,4vw,4rem)] leading-none">
            <DecryptedText
              text="Let's Create"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
            />
          </h1>
          <h1 className="font-bold text-[clamp(2rem,4vw,4rem)] leading-none">
            <DecryptedText
              text="Something Amazing"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
            />
          </h1>
          <div className="space-y-5 max-w-[600px]">
            <AnimatedDescription
              text="Ready to bring your vision to life? Whether you're a founder, CEO, or leadership team looking to build your brand, we're here to help."
              delay={0.2}
            />
            <AnimatedDescription
              text="Reach out to start a conversation about your project."
              delay={0.4}
            />
          </div>
          <div className="space-y-4 pt-5">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-white/70" />
              <p className="text-white/80">hello@yamencreates.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-white/70" />
              <p className="text-white/80">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-white/70" />
              <p className="text-white/80">New York, NY</p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-white/10 border border-white/30 rounded-full text-white font-light hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
