import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { FloatingCode } from "@/components/floating-code"
import { SwiftLogoDecoration } from "@/components/swift-logo-decoration"
import { CodeBrackets } from "@/components/code-brackets"
import { TechIconsFloat } from "@/components/tech-icons-float"

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <FloatingCode />
      <SwiftLogoDecoration />
      <CodeBrackets />
      <TechIconsFloat />
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
