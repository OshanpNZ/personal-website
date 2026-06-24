import experience from '../data/experience.js'

function ExperienceGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {experience.map((e) => (
        <button
          key={e.id}
          type="button"
          onClick={() => onSelect?.(e)}
          className="relative aspect-square cursor-pointer overflow-hidden bg-[repeating-linear-gradient(45deg,#1c1c1c_0_14px,#161616_14px_28px)] text-left"
        >
          <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent_58%)] p-4">
            <div className="mb-auto font-mono text-[11px] text-[#777]">{e.period}</div>
            <div className="text-[15px] font-semibold">{e.role}</div>
            <div className="text-[13px] text-[#bbb]">{e.company}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ExperienceGrid
