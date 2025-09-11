import { useState } from 'react'

function App() {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('1부터 100 사이의 숫자를 맞춰보세요!')
  const [attempts, setAttempts] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const guessNumber = parseInt(guess)
    
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setMessage('1부터 100 사이의 숫자를 입력해주세요!')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (guessNumber === targetNumber) {
      setMessage(`정답입니다! ${newAttempts}번 만에 맞추셨네요!`)
      setGameOver(true)
    } else if (guessNumber < targetNumber) {
      setMessage(`더 큰 숫자입니다! (시도: ${newAttempts}번)`)
    } else {
      setMessage(`더 작은 숫자입니다! (시도: ${newAttempts}번)`)
    }

    setGuess('')
  }

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setMessage('1부터 100 사이의 숫자를 맞춰보세요!')
    setAttempts(0)
    setGameOver(false)
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>숫자 맞추기 게임</h1>
      <p>{message}</p>
      
      {!gameOver ? (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="숫자를 입력하세요"
            min="1"
            max="100"
            style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
            추측하기
          </button>
        </form>
      ) : (
        <button onClick={resetGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
          새 게임 시작
        </button>
      )}
    </div>
  )
}

export default App