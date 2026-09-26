import WhatsAppIcon from './WhatsAppIcon'

const WHATSAPP_FALLBACK = '905345983646'

export default function WhatsAppButton({ number, label = 'WhatsApp' }) {
  const phone = (number || WHATSAPP_FALLBACK).replace(/\D/g, '')
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/20 transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
