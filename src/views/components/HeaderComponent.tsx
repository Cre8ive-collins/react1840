
import CreateTask from "./CreateTask"
import SearchBox from "./SearchBox"

const HeaderComponent = () => {

    return (
        <div className=" md:flex  justify-between md:h-24 items-center pb-3 md:pb-0 ">
            <div className="flex justify-between items-center py-3">
                <h1 className=" font-bold">Logo</h1>
                <div className=" md:hidden ">
                    <CreateTask />
                </div>
            </div>
            <SearchBox />
            <div className=" hidden md:block">
                <CreateTask />
            </div>
        </div>
    )
}

export default HeaderComponent