export default function InfoCard({ title, text }) {
  return (
    <div className="auth-info-card">
      <span className="auth-info-icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </span>
      <div className="auth-info-text">
        <b>{title}</b>
        <p>{text}</p>
      </div>
    </div>
  )
}
