"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">South Korea</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">Sergey Lee</h1>

          <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8">iOS Developer</h2>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            iOS Developer with 5 years of experience building scalable and user-friendly apps. Passionate about{" "}
            <span className="text-foreground font-medium">Swift</span>,{" "}
            <span className="text-foreground font-medium">SwiftUI</span>, and{" "}
            <span className="text-foreground font-medium">mobile architecture</span>.
          </p>

          <p className="text-lg text-muted-foreground mt-4 leading-relaxed max-w-2xl">
            Worked on projects with hundreds of thousands of users, optimizing performance and implementing modern UI/UX
            solutions. Open to global remote opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
