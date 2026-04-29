import { Dot } from "lucide-react"


const HomeContent = () => {
  return (
    <div className="h-[120vh] w-full bg-[#f5f4f0] flex justify-center items-center flex-col ">
        <div className="h-full w-full  flex justify-center items-center flex-col ">
            <div className="h-[40vh] w-[55%]  m-5">
                <h2 className="font-space text-7xl font-bold tracking-normal ">Streamline your workflow.<span className="text-3xl text-blue-500">Code your productivity.</span></h2>
                <div className="w-75 bg-white flex rounded-xl mt-2">
                    <Dot color="blue" />
                    <span>Trusted by 12,000+ teams worldwide</span>
                </div>
            </div>
            <div className="h-full w-[70%] overflow-x-hidden bg-[#121212] rounded-xl  shadow-2xl">
                <img className="w-full h-full  object-cover object-top" src="/landing.jpg"/>
            </div>
        </div>
    </div>
  )
}

export default HomeContent
