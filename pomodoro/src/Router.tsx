import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home/Home'
import { History } from './pages'
import { DefaultLayout } from './layouts'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={< Home />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  )
}