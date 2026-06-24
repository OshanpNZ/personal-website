import highlights from '../data/highlights.js'

function Highlights({ onSelect }) {
  return (
    <section className="mb-10">
      <div className="flex gap-[22px] overflow-x-auto pb-1.5">
        {highlights.map((h) => (
          <button
            key={h.label}
            type="button"
            onClick={() => onSelect?.(h)}
            className="flex w-[72px] flex-none cursor-pointer flex-col items-center gap-2 bg-transparent"
          >
            <div className="h-16 w-16 rounded-full border border-[#363636] p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[repeating-linear-gradient(45deg,#1e1e1e_0_6px,#161616_6px_12px)] text-[#d8d8d8]">
                <h.Icon size={24} strokeWidth={1.75} />
              </div>
            </div>
            <span className="max-w-[72px] truncate text-xs text-[#d8d8d8]">{h.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default Highlights
