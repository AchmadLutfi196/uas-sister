import { useRef, useEffect, useState } from 'react'
import { Box, useMantineColorScheme } from '@mantine/core'
import styles from './AnimatedBackground.module.css'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    opacity: number
}

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const particlesRef = useRef<Particle[]>([])
    const animationFrameRef = useRef<number | undefined>(undefined)
    const { colorScheme } = useMantineColorScheme()

    const isDark = colorScheme === 'dark'

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || dimensions.width === 0) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = dimensions.width
        canvas.height = dimensions.height

        // Initialize particles
        const particleCount = Math.floor((dimensions.width * dimensions.height) / 18000)
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 0.8,
            opacity: Math.random() * 0.4 + 0.15,
        }))

        // Color configuration based on theme
        const particleColor = isDark
            ? { r: 139, g: 92, b: 246 }  // Violet for dark
            : { r: 124, g: 58, b: 237 }   // Slightly darker violet for light

        const baseOpacity = isDark ? 1 : 0.7
        const connectionOpacity = isDark ? 0.12 : 0.06

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height)

            particlesRef.current.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx
                particle.y += particle.vy

                // Wrap around edges
                if (particle.x < 0) particle.x = dimensions.width
                if (particle.x > dimensions.width) particle.x = 0
                if (particle.y < 0) particle.y = dimensions.height
                if (particle.y > dimensions.height) particle.y = 0

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${particle.opacity * baseOpacity})`
                ctx.fill()

                // Draw connections
                particlesRef.current.slice(i + 1).forEach((other) => {
                    const dx = particle.x - other.x
                    const dy = particle.y - other.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 130) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(other.x, other.y)
                        ctx.strokeStyle = `rgba(${particleColor.r}, ${particleColor.g}, ${particleColor.b}, ${connectionOpacity * (1 - distance / 130)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                })
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [dimensions, isDark])

    return (
        <Box className={styles.container} data-theme={colorScheme}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={`${styles.gradientOverlay} ${isDark ? styles.gradientDark : styles.gradientLight}`} />
        </Box>
    )
}
