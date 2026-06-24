function Tabs({ tabs, active, onChange }) {
  return (
    <nav className="-mb-px flex justify-center gap-11 overflow-x-auto border-t border-[#262626]">
      {tabs.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`-mt-px cursor-pointer border-t py-4 text-[13px] font-semibold tracking-[0.04em] uppercase ${
              isActive ? 'border-white text-white' : 'border-transparent text-[#a8a8a8]'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}

export default Tabs
