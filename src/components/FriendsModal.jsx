import { useEffect } from 'react'
import friends from '../data/friends.js'

function FriendsModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 p-5 animate-[fadeIn_0.2s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[80vh] w-[400px] max-w-full flex-col overflow-hidden rounded-[14px] border border-[#2a2a2a] bg-[#1a1a1a] animate-[popIn_0.25s_cubic-bezier(0.2,0.8,0.2,1)]"
      >
        <div className="flex items-center border-b border-[#262626] px-[22px] py-[18px]">
          <div className="text-base font-semibold">Friends</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto cursor-pointer text-[22px] leading-none text-[#a8a8a8]"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto py-2">
          {friends.length === 0 && (
            <div className="px-[22px] py-8 text-center text-sm text-[#777]">No friends yet.</div>
          )}
          {friends.map((f) => (
            <div key={f.name} className="flex items-center gap-[13px] px-[22px] py-2.5">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[repeating-linear-gradient(45deg,#262626_0_6px,#1d1d1d_6px_12px)] text-[15px] font-semibold text-[#bbb]">
                {f.initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{f.name}</div>
                <div className="truncate text-[13px] text-[#a8a8a8]">{f.role}</div>
              </div>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none rounded-lg bg-[#0095f6] px-3.5 py-[7px] text-[13px] font-semibold text-white no-underline"
              >
                Visit
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FriendsModal
