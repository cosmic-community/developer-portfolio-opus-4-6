import type { WorkExperience } from '@/types'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface ExperienceTimelineProps {
  experiences: WorkExperience[]
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return 'Present'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-800 hidden sm:block" />

      <div className="space-y-12">
        {experiences.map((exp, index) => {
          const companyLogo = exp.metadata?.company_logo
          const startDate = exp.metadata?.start_date
          const endDate = exp.metadata?.end_date
          const description = exp.metadata?.description
          const company = exp.metadata?.company || ''
          const role = exp.metadata?.role || ''

          return (
            <div key={exp.id} className="relative flex gap-6 sm:gap-8">
              {/* Timeline dot */}
              <div className="hidden sm:flex flex-shrink-0 w-16 h-16 items-center justify-center relative z-10">
                {companyLogo ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-800 bg-gray-900">
                    <img
                      src={`${companyLogo.imgix_url}?w=112&h=112&fit=crop&auto=format,compress`}
                      alt={company}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-brand-600/20 border-2 border-brand-500/30 flex items-center justify-center">
                    <span className="text-brand-400 font-bold text-lg">
                      {company.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Card */}
              <div
                className="flex-1 bg-gray-900/60 border border-gray-800 rounded-xl p-6 sm:p-8 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{role}</h3>
                    <p className="text-brand-400 font-medium">{company}</p>
                  </div>
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {formatDate(startDate)} — {formatDate(endDate)}
                  </span>
                </div>

                {/* Mobile logo */}
                {companyLogo && (
                  <div className="sm:hidden mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-800 bg-gray-900">
                      <img
                        src={`${companyLogo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                        alt={company}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {description && (
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <MarkdownRenderer content={description} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}