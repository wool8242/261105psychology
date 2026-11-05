import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ParentingList from './pages/ParentingList'
import ParentingDetail from './pages/ParentingDetail'
import ResearchList from './pages/ResearchList'
import About from './pages/About'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/parenting" element={<ParentingList />} />
        <Route path="/parenting/:id" element={<ParentingDetail />} />
        <Route path="/research" element={<ResearchList />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
