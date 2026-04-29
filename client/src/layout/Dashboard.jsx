
import Sidebar from '../constants/Sidebar'
import DashComponent from '../pages/DashComponent'

const Dashboard = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Sidebar />
        <DashComponent />
    </div>
  )
}

export default Dashboard
