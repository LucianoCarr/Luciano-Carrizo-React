import { Outlet } from 'react-router-dom'
import './App.css'
import ContentWarppers from './components/ContentWarppers'
import SideBar from './components/SideBar'

function App() {
  return (
    <div id="wrapper">

		
		<SideBar/>
		
<Outlet/>
		
		<ContentWarppers/>
		

	</div>
  )
}

export default App
