import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ParentingList from './pages/ParentingList'
import ParentingDetail from './pages/ParentingDetail'
import ResearchList from './pages/ResearchList'
import About from './pages/About'
// 관리자 화면은 필요할 때만 내려받아, 일반 방문자의 로딩을 가볍게 합니다.
const Admin = lazy(() => import('./pages/Admin'))
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
        <Route path="/admin" element={<Suspense fallback={<p role="status">불러오는 중입니다…</p>}><Admin /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
