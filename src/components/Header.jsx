function Header({ handle = 'Oshanp', onContact }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#1c1c1c] bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[935px] items-center justify-between gap-4 px-5 py-3.5">
        <div className="text-[22px] font-bold tracking-[-0.02em]">{handle}</div>
        <nav className="flex items-center gap-[22px] text-sm text-[#a8a8a8]">
          <button
            type="button"
            onClick={onContact}
            className="cursor-pointer rounded-lg bg-[#0095f6] px-4 py-[7px] text-sm font-semibold text-white"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
