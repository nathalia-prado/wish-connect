import { Outlet } from 'react-router-dom'
import Nav from './nav-bar.tsx'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
