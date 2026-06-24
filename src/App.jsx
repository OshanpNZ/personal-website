import { useState } from 'react'
import Header from './components/Header.jsx'
import Profile from './components/Profile.jsx'
import Highlights from './components/Highlights.jsx'
import Tabs from './components/Tabs.jsx'
import ProjectGrid from './components/ProjectGrid.jsx'
import ExperienceGrid from './components/ExperienceGrid.jsx'
import EducationGrid from './components/EducationGrid.jsx'
import About from './components/About.jsx'
import DetailModal from './components/DetailModal.jsx'
import StoryViewer from './components/StoryViewer.jsx'
import FriendsModal from './components/FriendsModal.jsx'
import ContactModal from './components/ContactModal.jsx'

const EMAIL = 'oshan.premkumar@gmail.com'

const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'about', label: 'About' },
]

function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [friendsOpen, setFriendsOpen] = useState(false)
  const [tab, setTab] = useState('projects')
  const [detail, setDetail] = useState(null)
  const [story, setStory] = useState(null)
  // Per-card like/save/comment state, keyed by card id. Lives until refresh.
  const [interactions, setInteractions] = useState({})

  const updateInteraction = (key, patch) =>
    setInteractions((prev) => ({
      ...prev,
      [key]: { liked: false, saved: false, comments: [], ...prev[key], ...patch },
    }))

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] antialiased">
      <Header handle="Oshanp" onContact={() => setContactOpen(true)} />
      <main className="mx-auto max-w-[1200px] px-5 pt-[34px] pb-20">
        <Profile onFriends={() => setFriendsOpen(true)} />
        <Highlights onSelect={(h) => h.stories?.length && setStory(h)} />
        <Tabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === 'projects' && (
          <div className="mt-1">
            <ProjectGrid onSelect={(p) => setDetail({ ...p, key: `project-${p.id}` })} />
          </div>
        )}
        {tab === 'experience' && (
          <div className="mt-1">
            <ExperienceGrid
              onSelect={(e) =>
                setDetail({
                  key: `experience-${e.id}`,
                  kind: e.kind,
                  title: e.role,
                  tag: `${e.company} · ${e.period}`,
                  desc: e.desc,
                  images: e.images,
                })
              }
            />
          </div>
        )}
        {tab === 'education' && (
          <div className="mt-1">
            <EducationGrid
              onSelect={(e) =>
                setDetail({
                  key: `education-${e.id}`,
                  kind: e.kind,
                  title: e.degree,
                  tag: `${e.school} · ${e.period}`,
                  desc: e.desc,
                  images: e.images,
                })
              }
            />
          </div>
        )}
        {tab === 'about' && <About />}
      </main>
      <DetailModal
        item={detail}
        onClose={() => setDetail(null)}
        handle="Oshanp"
        interaction={detail ? interactions[detail.key] : undefined}
        onInteract={(patch) => detail && updateInteraction(detail.key, patch)}
      />
      <StoryViewer highlight={story} onClose={() => setStory(null)} />
      <FriendsModal open={friendsOpen} onClose={() => setFriendsOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} email={EMAIL} />
    </div>
  )
}

export default App
