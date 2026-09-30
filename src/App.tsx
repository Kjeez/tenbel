import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import MWCShowcase from './pages/MWCShowcase'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mwc" element={<MWCShowcase />} />
    </Routes>
  )
}
