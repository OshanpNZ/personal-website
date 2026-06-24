import projects from '../data/projects.js'

function ProjectGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {projects.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect?.(p)}
          className="relative aspect-square cursor-pointer overflow-hidden bg-[repeating-linear-gradient(45deg,#1c1c1c_0_14px,#161616_14px_28px)] text-left"
        >
          <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent_55%)] p-4">
            <div className="mb-auto font-mono text-[11px] text-[#777]">{p.kind}</div>
            <div className="text-[15px] font-semibold">{p.title}</div>
            <div className="text-[13px] text-[#bbb]">{p.tag}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ProjectGrid
