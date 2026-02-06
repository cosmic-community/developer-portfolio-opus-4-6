import type { Skill, ProficiencyKey } from '@/types'

interface SkillCardProps {
  skill: Skill
}

function getProficiencyWidth(key?: ProficiencyKey): string {
  switch (key) {
    case 'expert':
      return 'w-full'
    case 'advanced':
      return 'w-3/4'
    case 'intermediate':
      return 'w-1/2'
    case 'beginner':
      return 'w-1/4'
    default:
      return 'w-1/2'
  }
}

function getProficiencyColor(key?: ProficiencyKey): string {
  switch (key) {
    case 'expert':
      return 'bg-brand-500'
    case 'advanced':
      return 'bg-brand-400'
    case 'intermediate':
      return 'bg-brand-300'
    case 'beginner':
      return 'bg-brand-200'
    default:
      return 'bg-brand-300'
  }
}

export default function SkillCard({ skill }: SkillCardProps) {
  const icon = skill.metadata?.icon
  const proficiency = skill.metadata?.proficiency
  const name = skill.metadata?.name || skill.title

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 card-hover">
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
            <img
              src={`${icon.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
          {proficiency && (
            <p className="text-sm text-gray-400">{proficiency.value}</p>
          )}
        </div>
      </div>

      {/* Proficiency Bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProficiencyWidth(proficiency?.key)} ${getProficiencyColor(proficiency?.key)}`}
        />
      </div>
    </div>
  )
}