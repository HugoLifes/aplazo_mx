// Título de sección con acción opcional a la derecha ("Ver todos", etc.)
export default function SectionHeader({ title, sub, action, onAction }) {
  return (
    <div className="section-title">
      <div>
        <h3>{title}</h3>
        {sub && <p>{sub}</p>}
      </div>
      {action && <button type="button" onClick={onAction}>{action}</button>}
    </div>
  )
}
