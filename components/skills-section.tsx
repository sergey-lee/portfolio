"use client"

import { motion } from "framer-motion"

const skills = [
  { name: "Swift", level: 95 },
  { name: "SwiftUI", level: 90 },
  { name: "UIKit", level: 92 },
  { name: "Combine", level: 85 },
  { name: "Core Data", level: 80 },
  { name: "REST APIs", level: 88 },
]

const technologies = [
  "Xcode",
  "Git",
  "Firebase",
  "CocoaPods",
  "SPM",
  "TestFlight",
  "CI/CD",
  "MVVM",
  "Clean Architecture",
]

export function SkillsSection() {
  return (
    <section className="px-6 py-20" id="skills">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-primary" />
            <h3 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Skills</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-muted-foreground text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h4 className="text-foreground font-medium mb-6">Technologies & Tools</h4>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm border border-border hover:border-primary transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
