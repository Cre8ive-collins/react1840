import HeaderComponent from "../components/HeaderComponent"
import TaskBoard from "../components/TaskBoard"

const Homepage = () => {
    return (
        <div className="w-full p-0 m-0 ">
            <div className=" shadow-md  px-5 md:px-14">
                <HeaderComponent />
            </div>
            <div className="px-5 md:px-14 mt-2"> 
                <TaskBoard />
            </div>
        </div>
    )
}

export default Homepage