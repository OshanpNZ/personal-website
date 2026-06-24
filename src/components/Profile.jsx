import projects from '../data/projects.js'
import friends from '../data/friends.js'

function Stat({ value, label, onClick }) {
  return (
    <div onClick={onClick} className={onClick ? 'cursor-pointer' : undefined}>
      <b>{value}</b> <span className="text-[#a8a8a8]">{label}</span>
    </div>
  )
}

function Profile({ onFriends }) {
  return (
    <section className="mb-11 flex flex-wrap items-center gap-[30px]">
      <div className="h-[150px] w-[150px] flex-none rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] p-1">
        <img
          src="/pfp.jpg"
          alt="Oshan Premkumar"
          className="h-full w-full rounded-full border-[3px] border-black object-cover"
        />
      </div>
      
      <div className="min-w-[260px] flex-1 basis-[320px]">
        <div className="mb-[18px] flex flex-wrap items-center gap-[18px]">
          <h1 className="m-0 text-[21px] font-medium">Oshan Premkumar</h1>
          <a
            href="/CV.pdf"
            download
            className="cursor-pointer rounded-lg bg-[#262626] px-4 py-[7px] text-sm font-semibold text-white no-underline"
          >
            Resume ↓
          </a>
        </div>

        <div className="mb-4 flex gap-[34px] text-[15px]">
          <Stat value={projects.length} label="projects" />
          <Stat value="1" label="yrs experience" />
          <Stat value={friends.length} label="friends" onClick={onFriends} />
        </div>

        <div className="leading-[1.5]">
          
          <div className="text-[#d8d8d8]">Software Engineer</div>
          
          <a href="https://github.com/OshanpNZ" className="text-[#e0a3ff] no-underline">
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Profile
