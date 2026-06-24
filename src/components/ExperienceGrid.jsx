import experience from '../data/experience.js'
import GridCard from './GridCard.jsx'

function ExperienceGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {experience.map((e) => (
        <GridCard
          key={e.id}
          image={e.images?.[0]}
          top={e.period}
          title={e.role}
          subtitle={e.company}
          onClick={() => onSelect?.(e)}
        />
      ))}
    </div>
  )
}

export default ExperienceGrid
