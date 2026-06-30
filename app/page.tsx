import HeroSection from "@/components/Hero"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="min-h-svh">
      <HeroSection />
      <div className="h-svh bg-red-100 "></div>
      <div className="bg-amber-900 h-svh"></div>

    </div>
  )
}
