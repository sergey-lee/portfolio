import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <div id="about">
          <HeroSection />
        </div>
        <SkillsSection />
        <ContactSection />
        <footer className="px-6 py-8 border-t border-border">
          <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            © 2026 Sergey Lee. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  )
}
