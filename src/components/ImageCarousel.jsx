import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ImageCarousel({ images, alt = '' }) {
  const [i, setI] = useState(0)
  const count = images.length

  useEffect(() => {
    setI(0)
  }, [images])

  return (
    <div className="absolute inset-0 bg-black">
      <img src={images[i]} alt={`${alt} ${i + 1}`} className="h-full w-full object-contain" />

      {count > 1 && (
        <>
          {i > 0 && (
            <button
              type="button"
              onClick={() => setI(i - 1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/50 text-white"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {i < count - 1 && (
            <button
              type="button"
              onClick={() => setI(i + 1)}
              aria-label="Next image"
              className="absolute top-1/2 right-2 grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-black/50 text-white"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* counter */}
          <div className="absolute top-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-[12px] font-medium text-white">
            {i + 1}/{count}
          </div>

          {/* dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((src, idx) => (
              <span
                key={src}
                className={`h-1.5 w-1.5 rounded-full ${idx === i ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCarousel
