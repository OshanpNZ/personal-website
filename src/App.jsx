import Header from './components/Header.jsx'
import Profile from './components/Profile.jsx'

function App() {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] antialiased">
      <Header handle="Oshanp" onContact={() => {}} />
      <main className="mx-auto max-w-[935px] px-5 pt-[34px] pb-20">
        <Profile onFriends={() => {}} />
      </main>
    </div>
  )
}

export default App
