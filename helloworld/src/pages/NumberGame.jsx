import { useState, useRef } from 'react'
import NumberGuessingGame from '../utils/NumberGuessingGame'

/**
 * 숫자 맞추기 게임 컴포넌트
 * NumberGuessingGame 클래스를 사용하여 UI만 담당
 */
function NumberGame() {
  // 게임 인스턴스 생성 (컴포넌트 생명주기 동안 유지)
  const gameRef = useRef(new NumberGuessingGame(1, 100))
  
  // UI 상태 관리
  const [guess, setGuess] = useState('') // 사용자 입력값
  const [message, setMessage] = useState('1부터 100 사이의 숫자를 맞춰보세요!') // 게임 메시지
  const [gameState, setGameState] = useState(gameRef.current.getGameState()) // 게임 상태

  /**
   * 숫자 추측 제출 처리
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const guessNumber = parseInt(guess)
    
    // 게임 로직 처리
    const result = gameRef.current.makeGuess(guessNumber)
    
    // UI 상태 업데이트
    setMessage(result.message)
    setGameState(gameRef.current.getGameState())
    
    // 유효한 입력인 경우에만 입력값 초기화
    if (result.isValid) {
      setGuess('')
    }
  }

  /**
   * 게임 재시작
   */
  const resetGame = () => {
    gameRef.current.reset()
    setGuess('')
    setMessage('1부터 100 사이의 숫자를 맞춰보세요!')
    setGameState(gameRef.current.getGameState())
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      
      <h1>숫자 맞추기 게임</h1>
      <p>{message}</p>
      
      {!gameState.isGameOver ? (
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

export default NumberGame