import education from '../data/education.js'
import GridCard from './GridCard.jsx'

function EducationGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {education.map((e) => (
        <GridCard
          key={e.id}
          image={e.images?.[0]}
          top={e.period}
          title={e.degree}
          subtitle={e.school}
          onClick={() => onSelect?.(e)}
        />
      ))}
    </div>
  )
}

export default EducationGrid
