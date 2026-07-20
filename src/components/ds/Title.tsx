import { cn } from '@/lib/utils'
import { type TitleGradient } from './types'
import { type ElementType, type ReactNode, type CSSProperties } from 'react'

interface TitleProps {
  as?: ElementType
  gradient?: TitleGradient
  animate?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
}

const gradientMap: Record<string, string> = {
  amber:  'linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b)',
  indigo: 'linear-gradient(90deg, #6366f1, #a5b4fc, #6366f1)',
  green:  'linear-gradient(90deg, #1DB954, #86efac, #1DB954)',
}

export function Title({
  as: Tag = 'h2',
  gradient = false,
  animate,
  className,
  style,
  children,
}: TitleProps) {
  return (
    <Tag
      className={cn(
        animate && 'reveal-up',
        'font-headline font-bold leading-tight',
        gradient
          ? 'text-transparent bg-clip-text'
          : 'text-gray-900 dark:text-white',
        className,
      )}
      style={{
        ...(gradient ? { backgroundImage: gradientMap[gradient] } : {}),
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
