import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import NumberGame from './pages/NumberGame'

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/number-game" element={<NumberGame />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App