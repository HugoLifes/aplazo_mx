export default function AuthFooterLinks({ links }) {
  if (!links?.length) return null
  return (
    <div className="auth-footer-links">
      {links.map(l => (
        <a key={l.label} href={l.href || "#"} className="auth-link" onClick={e=>{ if(!l.href) e.preventDefault(); l.onClick?.()}}>
          {l.label}
        </a>
      ))}
    </div>
  )
}
