"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: "dot" | "glow" | "star"
}

interface GlowOrb {
  x: number
  y: number
  radius: number
  color: string
  speed: number
  angle: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const glowOrbsRef = useRef<GlowOrb[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = {
      teal: "94, 234, 212",
      cyan: "34, 211, 238",
      blue: "59, 130, 246",
      purple: "139, 92, 246",
      pink: "236, 72, 153",
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createGlowOrbs = () => {
      const orbs: GlowOrb[] = []
      const orbColors = [colors.teal, colors.cyan, colors.blue, colors.purple]

      for (let i = 0; i < 5; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 300 + 200,
          color: orbColors[Math.floor(Math.random() * orbColors.length)],
          speed: Math.random() * 0.0005 + 0.0002,
          angle: Math.random() * Math.PI * 2,
        })
      }
      glowOrbsRef.current = orbs
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000)
      const colorKeys = Object.keys(colors) as (keyof typeof colors)[]

      for (let i = 0; i < particleCount; i++) {
        const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]
        const type = Math.random() < 0.7 ? "dot" : Math.random() < 0.5 ? "glow" : "star"

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: type === "star" ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[colorKey],
          type,
        })
      }
      particlesRef.current = particles
    }

    const drawStar = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2)
        ctx.moveTo(0, 0)
        ctx.lineTo(0, size * 2)
      }
      ctx.strokeStyle = `rgba(${color}, ${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()
    }

    const drawParticles = () => {
      timeRef.current += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      glowOrbsRef.current.forEach((orb) => {
        orb.angle += orb.speed
        orb.x += Math.cos(orb.angle) * 0.5
        orb.y += Math.sin(orb.angle * 0.7) * 0.3

        // Wrap around
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        gradient.addColorStop(0, `rgba(${orb.color}, 0.15)`)
        gradient.addColorStop(0.5, `rgba(${orb.color}, 0.05)`)
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`)

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      ctx.strokeStyle = "rgba(94, 234, 212, 0.03)"
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const pulseOpacity =
          particle.type === "glow"
            ? particle.opacity * (0.7 + 0.3 * Math.sin(timeRef.current * 2 + i))
            : particle.opacity

        if (particle.type === "star") {
          drawStar(particle.x, particle.y, particle.size, particle.color, pulseOpacity)
        } else if (particle.type === "glow") {
          const glowGradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 4,
          )
          glowGradient.addColorStop(0, `rgba(${particle.color}, ${pulseOpacity})`)
          glowGradient.addColorStop(1, `rgba(${particle.color}, 0)`)
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = glowGradient
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${particle.color}, ${pulseOpacity})`
          ctx.fill()
        }

        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const lineGradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y)
            const lineOpacity = 0.2 * (1 - distance / 150)
            lineGradient.addColorStop(0, `rgba(${particle.color}, ${lineOpacity})`)
            lineGradient.addColorStop(1, `rgba(${otherParticle.color}, ${lineOpacity})`)

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Mouse interaction
        const dx = particle.x - mouseRef.current.x
        const dy = particle.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = (200 - distance) / 200
          particle.vx += (dx / distance) * force * 0.03
          particle.vy += (dy / distance) * force * 0.03
        }

        particle.vx *= 0.99
        particle.vy *= 0.99
      })

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resizeCanvas()
    createGlowOrbs()
    createParticles()
    drawParticles()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createGlowOrbs()
      createParticles()
    })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}
