import about from '../data/about.js'

function About() {
  return (
    <div className="flex flex-wrap gap-9 py-10 animate-[fadeIn_0.3s_ease]">
      <img
        src="/pfp.jpg"
        alt="Oshan Premkumar"
        className="h-[340px] w-[280px] flex-none rounded-xl object-cover"
      />
      <div className="min-w-[280px] flex-1 basis-[300px] text-[15px] leading-[1.7] text-[#d4d4d4]">
        <h2 className="m-0 mb-3.5 text-xl text-white">About</h2>
        <p className="m-0 whitespace-pre-line">{about.text}</p>

        <h3 className="mt-6 mb-2.5 text-[15px] text-white">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {about.skills.map((s) => (
            <span
              key={s}
              className="rounded-[20px] border border-[#303030] bg-[#1f1f1f] px-3.5 py-1.5 text-[13px] text-[#e0e0e0]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
