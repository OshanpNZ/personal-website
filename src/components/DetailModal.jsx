import { useEffect, useRef, useState } from 'react'
import { Heart, MessageCircle, Bookmark, User } from 'lucide-react'
import ImageCarousel from './ImageCarousel.jsx'

const EMPTY = { liked: false, saved: false, comments: [] }

function DetailModal({ item, onClose, handle = 'Oshanp', interaction, onInteract }) {
  const [commentText, setCommentText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!item) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])


  useEffect(() => {
    setCommentText('')
  }, [item])

  if (!item) return null

  const { liked, saved, comments } = interaction ?? EMPTY

  function addComment(e) {
    e.preventDefault()
    const text = commentText.trim()
    if (!text) return
    onInteract({ comments: [...comments, { id: crypto.randomUUID(), text }] })
    setCommentText('')
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 animate-[fadeIn_0.2s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-[1280px] flex-col overflow-hidden rounded-xl border border-[#262626] bg-black animate-[popIn_0.25s_cubic-bezier(0.2,0.8,0.2,1)] md:flex-row"
      >
        {/* Visual pane */}
        <div className="relative flex min-h-[340px] flex-1 items-center justify-center bg-[repeating-linear-gradient(45deg,#1c1c1c_0_16px,#141414_16px_32px)] font-mono text-[11px] text-[#777] md:min-h-[620px] md:basis-[60%]">
          {item.images?.length ? (
            <ImageCarousel images={item.images} alt={item.title} />
          ) : (
            <span>{item.kind} visual</span>
          )}
        </div>

        {/* Details pane */}
        <div className="flex flex-1 flex-col p-[26px] md:min-w-[320px] md:basis-[40%]">
          <div className="flex items-center gap-3 border-b border-[#262626] pb-4">
            <img
              src="/pfp.jpg"
              alt={handle}
              className="h-[38px] w-[38px] rounded-full object-cover"
            />
            <div className="text-sm font-semibold">{handle}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-auto cursor-pointer text-[22px] leading-none text-[#a8a8a8]"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-[18px] leading-[1.6] text-[#d8d8d8]">
            <div className="mb-1.5 font-mono text-[11px] text-[#777]">{item.kind}</div>
            <h2 className="m-0 text-xl text-white">{item.title}</h2>
            <div className="mt-1 mb-3.5 text-[13px] text-[#888]">{item.tag}</div>
            <p className="m-0 text-sm whitespace-pre-line">{item.desc}</p>

            {/* Comments */}
            {comments.length > 0 && (
              <div className="mt-5 flex flex-col gap-3">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#262626] text-[#777]">
                      <User size={15} />
                    </div>
                    <div className="text-sm leading-snug">
                      <span className="font-semibold text-white">You</span>{' '}
                      <span className="text-[#d8d8d8]">{c.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instagram-style action bar */}
          <div className="border-t border-[#262626] pt-3.5">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onInteract({ liked: !liked })}
                aria-label={liked ? 'Unlike' : 'Like'}
                aria-pressed={liked}
                className="cursor-pointer transition-transform active:scale-90"
              >
                <Heart
                  size={26}
                  className={liked ? 'fill-[#ed4956] text-[#ed4956]' : 'text-white'}
                />
              </button>
              <button
                type="button"
                onClick={() => inputRef.current?.focus()}
                aria-label="Comment"
                className="cursor-pointer transition-transform active:scale-90"
              >
                <MessageCircle size={24} className="text-white" />
              </button>
              <button
                type="button"
                onClick={() => onInteract({ saved: !saved })}
                aria-label={saved ? 'Remove from saved' : 'Save'}
                aria-pressed={saved}
                className="ml-auto cursor-pointer transition-transform active:scale-90"
              >
                <Bookmark size={26} className={saved ? 'fill-white text-white' : 'text-white'} />
              </button>
            </div>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-[#0095f6] no-underline"
              >
                View project →
              </a>
            )}

            {/* Add a comment */}
            <form onSubmit={addComment} className="mt-3 flex items-center gap-2 border-t border-[#262626] pt-3">
              <input
                ref={inputRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment…"
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#777]"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="cursor-pointer text-sm font-semibold text-[#0095f6] disabled:cursor-default disabled:opacity-40"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailModal
