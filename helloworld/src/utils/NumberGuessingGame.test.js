import { describe, it, expect, beforeEach } from 'vitest'
import NumberGuessingGame from './NumberGuessingGame'

describe('NumberGuessingGame', () => {
  let game

  beforeEach(() => {
    game = new NumberGuessingGame(1, 100)
  })

  describe('게임 초기화', () => {
    it('게임이 올바르게 초기화된다', () => {
      const gameState = game.getGameState()
      
      expect(gameState.attempts).toBe(0)
      expect(gameState.isGameOver).toBe(false)
      expect(gameState.lastGuess).toBe(null)
      expect(gameState.min).toBe(1)
      expect(gameState.max).toBe(100)
    })

    it('정답이 범위 내에 생성된다', () => {
      const answer = game.getAnswer()
      
      expect(answer).toBeGreaterThanOrEqual(1)
      expect(answer).toBeLessThanOrEqual(100)
    })

    it('사용자 정의 범위로 게임을 초기화할 수 있다', () => {
      const customGame = new NumberGuessingGame(10, 20)
      const gameState = customGame.getGameState()
      const answer = customGame.getAnswer()
      
      expect(gameState.min).toBe(10)
      expect(gameState.max).toBe(20)
      expect(answer).toBeGreaterThanOrEqual(10)
      expect(answer).toBeLessThanOrEqual(20)
    })
  })

  describe('입력값 검증', () => {
    it('숫자가 아닌 값을 거부한다', () => {
      const result = game.makeGuess('abc')
      
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('올바른 숫자를 입력해주세요!')
    })

    it('범위를 벗어난 값을 거부한다', () => {
      const result1 = game.makeGuess(0)
      const result2 = game.makeGuess(101)
      
      expect(result1.isValid).toBe(false)
      expect(result1.message).toBe('1부터 100 사이의 숫자를 입력해주세요!')
      
      expect(result2.isValid).toBe(false)
      expect(result2.message).toBe('1부터 100 사이의 숫자를 입력해주세요!')
    })

    it('NaN을 거부한다', () => {
      const result = game.makeGuess(NaN)
      
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('올바른 숫자를 입력해주세요!')
    })
  })

  describe('게임 로직', () => {
    it('정답을 맞췄을 때 올바른 결과를 반환한다', () => {
      const answer = game.getAnswer()
      const result = game.makeGuess(answer)
      
      expect(result.isValid).toBe(true)
      expect(result.result).toBe('correct')
      expect(result.attempts).toBe(1)
      expect(result.isGameOver).toBe(true)
      expect(result.message).toBe('정답입니다! 1번 만에 맞추셨네요!')
    })

    it('정답보다 작은 수를 입력했을 때 힌트를 제공한다', () => {
      const answer = game.getAnswer()
      const smallerGuess = answer - 1
      
      if (smallerGuess >= 1) {
        const result = game.makeGuess(smallerGuess)
        
        expect(result.isValid).toBe(true)
        expect(result.result).toBe('too_low')
        expect(result.attempts).toBe(1)
        expect(result.isGameOver).toBe(false)
        expect(result.message).toBe('더 큰 숫자입니다! (시도: 1번)')
      }
    })

    it('정답보다 큰 수를 입력했을 때 힌트를 제공한다', () => {
      const answer = game.getAnswer()
      const largerGuess = answer + 1
      
      if (largerGuess <= 100) {
        const result = game.makeGuess(largerGuess)
        
        expect(result.isValid).toBe(true)
        expect(result.result).toBe('too_high')
        expect(result.attempts).toBe(1)
        expect(result.isGameOver).toBe(false)
        expect(result.message).toBe('더 작은 숫자입니다! (시도: 1번)')
      }
    })

    it('시도 횟수가 올바르게 증가한다', () => {
      const answer = game.getAnswer()
      const wrongGuess = answer === 1 ? 2 : 1
      
      game.makeGuess(wrongGuess)
      expect(game.getGameState().attempts).toBe(1)
      
      game.makeGuess(wrongGuess)
      expect(game.getGameState().attempts).toBe(2)
      
      game.makeGuess(answer)
      expect(game.getGameState().attempts).toBe(3)
    })
  })

  describe('게임 재시작', () => {
    it('게임을 재시작하면 모든 상태가 초기화된다', () => {
      // 몇 번 추측해서 상태 변경
      game.makeGuess(50)
      game.makeGuess(75)
      
      // 재시작
      game.reset()
      
      const gameState = game.getGameState()
      expect(gameState.attempts).toBe(0)
      expect(gameState.isGameOver).toBe(false)
      expect(gameState.lastGuess).toBe(null)
    })

    it('재시작 후 새로운 정답이 생성된다', () => {
      const firstAnswer = game.getAnswer()
      game.reset()
      const secondAnswer = game.getAnswer()
      
      // 새로운 정답이 범위 내에 있는지 확인 (같을 수도 있지만 유효해야 함)
      expect(secondAnswer).toBeGreaterThanOrEqual(1)
      expect(secondAnswer).toBeLessThanOrEqual(100)
    })
  })

  describe('게임 종료 후 처리', () => {
    it('게임이 끝난 후 추가 추측을 거부한다', () => {
      const answer = game.getAnswer()
      game.makeGuess(answer) // 게임 종료
      
      const result = game.makeGuess(50)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('게임이 이미 종료되었습니다. 새 게임을 시작해주세요.')
    })
  })
})