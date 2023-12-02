import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"

const Layout = () => {
  return (
    <div id="wrapper">

		
    <SideBar/>
    

<Outlet/>

    

</div>
  )
}

export default Layout

