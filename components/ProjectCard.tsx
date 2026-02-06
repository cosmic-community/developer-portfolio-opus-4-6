import Link from 'next/link'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const featuredImage = project.metadata?.featured_image
  const skillsUsed = project.metadata?.skills_used
  const projectUrl = project.metadata?.project_url
  const githubUrl = project.metadata?.github_url

  return (
    <div className="group bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden card-hover">
      {/* Image */}
      {featuredImage && (
        <Link href={`/projects/${project.slug}`}>
          <div className="relative overflow-hidden aspect-video">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={project.title}
              width={600}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-xl font-bold text-white group-hover:text-brand-400 transition-colors mb-3">
            {project.title}
          </h3>
        </Link>

        {/* Skills Tags */}
        {skillsUsed && skillsUsed.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {skillsUsed.map((skill) => (
              <span
                key={skill.id}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20"
              >
                {skill.metadata?.name || skill.title}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
          >
            View Details →
          </Link>
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}