import { useEffect, useState } from 'react'

const DURATION = 5000 // ms each story is shown
const STEP = 50 // progress tick interval

function StoryViewer({ highlight, onClose }) {
  const [s, setS] = useState(0)
  const [progress, setProgress] = useState(0)

  const stories = highlight?.stories ?? []
  const count = stories.length

  // Restart at the first story whenever a different highlight opens.
  useEffect(() => {
    setS(0)
    setProgress(0)
  }, [highlight])

  // Reset the progress bar each time the story changes.
  useEffect(() => {
    setProgress(0)
  }, [s])

  // Auto-advance: tick the current story's progress up to 100%.
  useEffect(() => {
    if (!highlight) return
    const id = setInterval(() => {
      setProgress((p) => Math.min(1, p + STEP / DURATION))
    }, STEP)
    return () => clearInterval(id)
  }, [highlight, s])

  // When a story's progress completes, move on (or close after the last).
  useEffect(() => {
    if (progress < 1) return
    if (s < count - 1) setS(s + 1)
    else onClose()
  }, [progress, s, count, onClose])

  // Keyboard navigation.
  useEffect(() => {
    if (!highlight) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') setS((v) => (v < count - 1 ? v + 1 : v))
      else if (e.key === 'ArrowLeft') setS((v) => Math.max(0, v - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [highlight, count, onClose])

  if (!highlight || count === 0) return null

  const story = stories[s]
  const { Icon } = highlight

  const next = () => (s < count - 1 ? setS(s + 1) : onClose())
  const prev = () => setS(Math.max(0, s - 1))

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-5 animate-[fadeIn_0.2s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-[9/16] h-[88vh] max-h-[820px] max-w-full overflow-hidden rounded-[14px] bg-[repeating-linear-gradient(45deg,#1c1c1c_0_18px,#141414_18px_36px)] animate-[popIn_0.25s_cubic-bezier(0.2,0.8,0.2,1)]"
      >
        {story.image && (
          <img src={story.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}

        {/* Progress bars */}
        <div className="absolute top-0 right-0 left-0 z-20 flex gap-1 p-2.5">
          {stories.map((_, idx) => (
            <div key={idx} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${(idx < s ? 1 : idx === s ? progress : 0) * 100}%` }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 right-3.5 left-3.5 z-20 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white">
            <Icon size={16} />
          </div>
          <div className="text-sm font-semibold text-white">{highlight.label}</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto cursor-pointer text-[22px] leading-none text-white"
          >
            ✕
          </button>
        </div>

        {/* Text */}
        {story.text &&
          (story.image ? (
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16 text-center text-base leading-snug whitespace-pre-line text-white">
              {story.text}
            </div>
          ) : (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 text-center text-xl leading-relaxed whitespace-pre-line text-white">
              {story.text}
            </div>
          ))}

        {/* Tap zones */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous story"
          className="absolute top-0 bottom-0 left-0 z-10 w-[35%] cursor-pointer"
        />
        <button
          type="button"
          onClick={next}
          aria-label="Next story"
          className="absolute top-0 right-0 bottom-0 z-10 w-[35%] cursor-pointer"
        />
      </div>
    </div>
  )
}

export default StoryViewer
