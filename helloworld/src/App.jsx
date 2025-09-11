import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NumberGame from './pages/NumberGame'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/number-game" element={<NumberGame />} />
      </Routes>
    </Router>
  )
}

export default App