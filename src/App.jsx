import { useState } from 'react'
import Header from './components/Header.jsx'
import Profile from './components/Profile.jsx'
import ContactModal from './components/ContactModal.jsx'

const EMAIL = 'oshan.premkumar@gmail.com'

function App() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] antialiased">
      <Header handle="Oshanp" onContact={() => setContactOpen(true)} />
      <main className="mx-auto max-w-[935px] px-5 pt-[34px] pb-20">
        <Profile onFriends={() => {}} />
      </main>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} email={EMAIL} />
    </div>
  )
}

export default App
