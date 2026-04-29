import Navbar from "../constants/Navbar"
import HomeContent from "../pages/LandingContent"

const Home = () => {
  return (
    <div className='h-screen w-screen overflow-x-hidden relative'>
        <Navbar />
        <HomeContent />
    </div>
  )
}

export default Home
