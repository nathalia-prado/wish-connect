import { Outlet } from 'react-router-dom'
import Nav from './Nav.tsx'

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
