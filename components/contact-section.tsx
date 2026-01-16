"use client"

import { motion } from "framer-motion"
import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const contactLinks = [
  {
    label: "Email",
    value: "guagetru.bla@gmail.com",
    href: "mailto:guagetru.bla@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+8210 8387 2508",
    href: "tel:+821083872508",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "sergey1ee",
    href: "https://www.linkedin.com/in/sergey1ee/",
    icon: Linkedin,
  },
]

export function ContactSection() {
  return (
    <section className="px-6 py-20" id="contact">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-primary" />
            <h3 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Contact</h3>
          </div>

          <h4 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{"Let's work together"}</h4>

          <p className="text-muted-foreground mb-12 max-w-xl">
            {
              "I'm open to global remote opportunities. Feel free to reach out if you'd like to discuss a project or just say hello."
            }
          </p>

          <div className="space-y-4">
            {contactLinks.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={contact.href}
                  target={contact.label === "LinkedIn" ? "_blank" : undefined}
                  rel={contact.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between py-4 border-b border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <contact.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <span className="text-sm text-muted-foreground">{contact.label}</span>
                      <p className="text-foreground font-medium">{contact.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
