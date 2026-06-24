import { useState } from 'react'
import Header from './components/Header.jsx'
import Profile from './components/Profile.jsx'
import Highlights from './components/Highlights.jsx'
import Tabs from './components/Tabs.jsx'
import ProjectGrid from './components/ProjectGrid.jsx'
import ExperienceGrid from './components/ExperienceGrid.jsx'
import ContactModal from './components/ContactModal.jsx'

const EMAIL = 'oshan.premkumar@gmail.com'

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
]

function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [tab, setTab] = useState('projects')

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] antialiased">
      <Header handle="Oshanp" onContact={() => setContactOpen(true)} />
      <main className="mx-auto max-w-[935px] px-5 pt-[34px] pb-20">
        <Profile onFriends={() => {}} />
        <Highlights onSelect={() => {}} />
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === 'projects' && (
          <div className="mt-1">
            <ProjectGrid onSelect={() => {}} />
          </div>
        )}
        {tab === 'experience' && (
          <div className="mt-1">
            <ExperienceGrid onSelect={() => {}} />
          </div>
        )}
        {tab === 'about' && (
          <div className="py-10 text-center text-[#a8a8a8]">About — coming next.</div>
        )}
      </main>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} email={EMAIL} />
    </div>
  )
}

export default App
