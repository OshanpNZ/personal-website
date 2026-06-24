// Shared square grid tile used by the Projects / Experience / Education grids.
function GridCard({ image, top, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-square cursor-pointer overflow-hidden bg-[repeating-linear-gradient(45deg,#1c1c1c_0_14px,#161616_14px_28px)] text-left"
    >
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent_58%)] p-2 sm:p-4">
        <div className="mb-auto font-mono text-[9px] text-[#777] sm:text-[11px]">{top}</div>
        <div className="line-clamp-2 text-[12px] leading-tight font-semibold sm:text-[15px]">
          {title}
        </div>
        <div className="truncate text-[10px] text-[#bbb] sm:text-[13px]">{subtitle}</div>
      </div>
    </button>
  )
}

export default GridCard
