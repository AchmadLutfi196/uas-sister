import { useEffect, useRef } from 'react'
import { Text, Box } from '@mantine/core'
import styles from './GlowingText.module.css'

interface GlowingTextProps {
    text: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

export function GlowingText({ text, size = 'xl', className }: GlowingTextProps) {
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const textElement = textRef.current
        if (!textElement) return

        let animationFrame: number
        let currentPosition = 0

        const animate = () => {
            currentPosition = (currentPosition + 0.5) % 360
            textElement.style.setProperty('--glow-position', `${currentPosition}deg`)
            animationFrame = requestAnimationFrame(animate)
        }

        animate()

        return () => cancelAnimationFrame(animationFrame)
    }, [])

    const sizeClasses = {
        sm: styles.sizeSm,
        md: styles.sizeMd,
        lg: styles.sizeLg,
        xl: styles.sizeXl,
    }

    return (
        <Box className={styles.container}>
            <Text
                ref={textRef}
                component="span"
                className={`${styles.glowingText} ${sizeClasses[size]} ${className || ''}`}
                fw={800}
            >
                {text}
            </Text>
        </Box>
    )
}
