import projects from '../data/projects.js'
import GridCard from './GridCard.jsx'

function ProjectGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {projects.map((p) => (
        <GridCard
          key={p.id}
          image={p.images?.[0]}
          top={p.kind}
          title={p.title}
          subtitle={p.tag}
          onClick={() => onSelect?.(p)}
        />
      ))}
    </div>
  )
}

export default ProjectGrid
