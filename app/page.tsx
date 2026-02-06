import { getProjects, getSkills, getWorkExperience } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import ProjectCard from '@/components/ProjectCard'
import SkillCard from '@/components/SkillCard'
import ExperienceTimeline from '@/components/ExperienceTimeline'

export default async function HomePage() {
  const [projects, skills, experiences] = await Promise.all([
    getProjects(),
    getSkills(),
    getWorkExperience(),
  ])

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
              Featured Projects
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              A selection of projects that showcase my skills and passion for
              building great software.
            </p>
          </div>

          {projects.length === 0 ? (
            <p className="text-center text-gray-500">
              No projects found. Add some in your Cosmic dashboard!
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
              Expertise
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
              Skills & Technologies
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              Technologies and tools I work with on a daily basis.
            </p>
          </div>

          {skills.length === 0 ? (
            <p className="text-center text-gray-500">
              No skills found. Add some in your Cosmic dashboard!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
              Career
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
              Work Experience
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              My professional journey and the companies I&apos;ve had the
              privilege to work with.
            </p>
          </div>

          {experiences.length === 0 ? (
            <p className="text-center text-gray-500">
              No work experience found. Add some in your Cosmic dashboard!
            </p>
          ) : (
            <ExperienceTimeline experiences={experiences} />
          )}
        </div>
      </section>
    </div>
  )
}