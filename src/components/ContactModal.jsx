import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const inputClass =
  'rounded-[9px] border border-[#303030] bg-[#0d0d0d] px-[14px] py-3 text-sm text-white outline-none focus:border-[#0095f6] disabled:opacity-60'

function ContactModal({ open, onClose, email }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') 

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setForm({ name: '', email: '', message: '' })
      setStatus('idle')
    }
  }, [open])

  if (!open) return null

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, reply_to: form.email, message: form.message },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 p-5 animate-[fadeIn_0.2s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[400px] max-w-full overflow-hidden rounded-[14px] border border-[#2a2a2a] bg-[#1a1a1a] animate-[popIn_0.25s_cubic-bezier(0.2,0.8,0.2,1)]"
      >
        <div className="flex items-center border-b border-[#262626] px-[22px] py-5">
          <div className="text-base font-semibold">Get in touch</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto cursor-pointer text-[22px] leading-none text-[#a8a8a8]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[14px] p-[22px]">
          <p className="m-0 text-sm leading-[1.5] text-[#a8a8a8]">
            Want to have a chat or just want to say hi? Drop me a line.
          </p>
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={update('name')}
            disabled={sending}
            className={inputClass}
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={update('email')}
            disabled={sending}
            className={inputClass}
          />
          <textarea
            required
            placeholder="Message"
            rows={4}
            value={form.message}
            onChange={update('message')}
            disabled={sending}
            className={`${inputClass} resize-y`}
          />
          <button
            type="submit"
            disabled={sending}
            className="cursor-pointer rounded-[9px] bg-[#0095f6] p-3 text-[15px] font-semibold text-white disabled:cursor-default disabled:opacity-70"
          >
            {sending ? 'Sending…' : 'Send message'}
          </button>

          {status === 'sent' && (
            <div className="text-center text-[13px] text-[#4ade80]">
              Thanks! Your message has been sent.
            </div>
          )}
          {status === 'error' && (
            <div className="text-center text-[13px] text-[#f87171]">
              Something went wrong. Please email me directly below.
            </div>
          )}

          <div className="text-center text-[13px] text-[#777]">
            or email me at{' '}
            <a href={`mailto:${email}`} className="text-[#0095f6] no-underline">
              {email}
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactModal
