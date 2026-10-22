import { useRef, useState } from 'react'
import site from '../../data/site.json'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import { IoLogoWhatsapp } from "react-icons/io5";

const FORM_ENDPOINT = 'https://formspree.io/f/myeklbgk'

const TEXT = {
  title: 'Send me a quick message',
  name: 'Your name',
  email: 'Your email',
  message: 'About your project',
  messagePh: 'What do you need built?',
  send: 'Send message',
  sending: 'Sending...',
  successTitle: 'Message sent!',
  success: "Thanks for reaching out. I'll get back to you soon.",
  again: 'Send another message',
  error: 'Your message was not sent. Please try again, or email me directly.',
  fixTitle: 'Please fix the highlighted fields:',
  errRequired: 'This field is required.',
  errName: 'Please enter your full name.',
  errEmail: 'Please enter a valid email address.',
  errMessage: 'Please write at least 10 characters.',
}

const inputBase =
  'w-full rounded-xl border bg-bg px-4 py-3 outline-none transition focus:border-brand2'

export default function Contact() {
  const c = site.contact
  const f = { ...TEXT, ...c.form }
  const [before, after] = c.title.split(c.highlight)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const card = useRef(null)

  const waLink = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.waMessage)}`

  const links = [
    { label: 'Email', value: c.email, href: `mailto:${c.email}` },
    { label: 'GitHub', value: c.github.replace(/^https?:\/\//, ''), href: c.github },
    { label: 'LinkedIn', value: c.linkedin.replace(/^https?:\/\//, ''), href: c.linkedin },
  ]

  const labels = { name: f.name, email: f.email, message: f.message }

  function validate(values) {
    const e = {}
    if (!values.name) e.name = f.errRequired
    else if (values.name.length < 2) e.name = f.errName
    if (!values.email) e.email = f.errRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) e.email = f.errEmail
    if (!values.message) e.message = f.errRequired
    else if (values.message.length < 10) e.message = f.errMessage
    return e
  }

  function clearError(key) {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  function showCard() {
    card.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return

    const values = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
    }

    const found = validate(values)
    setErrors(found)
    const firstKey = Object.keys(found)[0]
    if (firstKey) {
      setStatus('invalid')
      form.elements.namedItem(firstKey)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        const body = await res.json().catch(() => null)
        console.error('Form error', res.status, body)
        setStatus('error')
      }
    } catch (err) {
      console.error('Form network error', err)
      setStatus('error')
    }
    showCard()
  }

  const fieldClass = (key) =>
    `${inputBase} ${errors[key] ? 'border-red-400' : 'border-line'}`

  const errorKeys = Object.keys(errors).filter((k) => errors[k])

  return (
    <section id="contact" className="py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <Reveal>
            <SectionTitle eyebrow={c.eyebrow}>
              {before}
              <span className="bg-linear-to-r from-brand to-brand2 bg-clip-text text-transparent">
                {c.highlight}
              </span>
              {after}
            </SectionTitle>
            <p className="mt-5 max-w-md text-lg text-mut">{c.text}</p>
          </Reveal>

          <Reveal delay={100}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-lg font-bold text-[#06210F] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_#25D366]"
            >
              <IoLogoWhatsapp size={25}/>
              {c.waButton}
            </a>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-card px-5 py-4 font-semibold transition hover:border-brand2"
                >
                  <span>
                    {l.label}
                    <small className="block font-normal text-mut">{l.value}</small>
                  </span>
                  <span>→</span>
                </a>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-mut">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {c.note}
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} className="h-full">
          <div ref={card} className="h-full">
            {status === 'sent' ? (
              <div
                role="status"
                className="flex h-full min-h-96 flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-400/50 bg-card p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold">{f.successTitle}</h3>
                <p className="max-w-xs text-mut">{f.success}</p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle')
                    setErrors({})
                  }}
                  className="mt-2 rounded-xl border border-line px-5 py-2.5 font-semibold transition hover:border-brand2 hover:text-brand2"
                >
                  {f.again}
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-card p-8"
              >
                <h3 className="font-display text-2xl font-bold">{f.title}</h3>

                {status === 'invalid' && errorKeys.length > 0 && (
                  <div role="alert" className="rounded-xl border border-red-400/60 bg-red-400/10 p-4 text-sm text-red-400">
                    <p className="font-semibold">{f.fixTitle}</p>
                    <ul className="mt-1.5 list-disc pl-5">
                      {errorKeys.map((k) => (
                        <li key={k}>
                          {labels[k]}: {errors[k]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {status === 'error' && (
                  <div role="alert" className="rounded-xl border border-red-400/60 bg-red-400/10 p-4 text-sm font-semibold text-red-400">
                    {f.error}
                  </div>
                )}

                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

                <div>
                  <label htmlFor="cf-name" className="mb-2 block text-sm font-semibold">
                    {f.name}
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    onChange={() => clearError('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cf-name-err' : undefined}
                    className={fieldClass('name')}
                  />
                  {errors.name && (
                    <p id="cf-name-err" className="mt-1.5 text-sm font-semibold text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cf-email" className="mb-2 block text-sm font-semibold">
                    {f.email}
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={() => clearError('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'cf-email-err' : undefined}
                    className={fieldClass('email')}
                  />
                  {errors.email && (
                    <p id="cf-email-err" className="mt-1.5 text-sm font-semibold text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <label htmlFor="cf-message" className="mb-2 block text-sm font-semibold">
                    {f.message}
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    placeholder={f.messagePh}
                    onChange={() => clearError('message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'cf-message-err' : undefined}
                    className={`${fieldClass('message')} min-h-36 flex-1 resize-y`}
                  />
                  {errors.message && (
                    <p id="cf-message-err" className="mt-1.5 text-sm font-semibold text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-2xl bg-linear-to-r from-brand to-brand2 px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === 'sending' ? f.sending : f.send}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}