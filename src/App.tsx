import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import MWCShowcase from './pages/MWCShowcase'
import MWCShowcaseV2 from './pages/MWCShowcaseV2'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mwc" element={<MWCShowcase />} />
      <Route path="/mwc-v2" element={<MWCShowcaseV2 />} />
    </Routes>
  )
}
