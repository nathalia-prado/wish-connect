import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/layout/App'
import Home from './pages/home'

export const routes = createRoutesFromElements(
  <>
    <Route element={<App />}>
      <Route index element={<Home />} />
    </Route>
  </>
)
