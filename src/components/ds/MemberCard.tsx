import { AccentCard } from './AccentCard'
import { Text } from './Text'
import { type Accent } from './types'

interface MemberCardProps {
  name: string
  role: string
  accent?: Accent
}

export function MemberCard({ name, role, accent = 'neutral' }: MemberCardProps) {
  return (
    <AccentCard accent={accent}>
      <Text size="sm" strength="primary" accent="neutral" className="font-semibold text-gray-900 dark:text-white">
        {name}
      </Text>
      <Text size="xs" strength="accent" accent={accent} className="mt-0.5">
        {role}
      </Text>
    </AccentCard>
  )
}
