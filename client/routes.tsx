import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/layout/App.tsx'
import Home from './pages/home.tsx'

export const routes = createRoutesFromElements(
  <>
    <Route element={<App />}>
      <Route index element={<Home />} />
    </Route>
  </>
)
