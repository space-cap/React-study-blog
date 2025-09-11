/**
 * 숫자 맞추기 게임 로직 클래스
 * UI와 분리된 순수한 게임 로직을 담당
 */
class NumberGuessingGame {
  /**
   * 게임 생성자
   * @param {number} min - 최소값 (기본값: 1)
   * @param {number} max - 최대값 (기본값: 100)
   */
  constructor(min = 1, max = 100) {
    this.min = min
    this.max = max
    this.reset()
  }

  /**
   * 게임 초기화/재시작
   * 새로운 랜덤 숫자 생성 및 상태 초기화
   */
  reset() {
    this.targetNumber = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
    this.attempts = 0
    this.isGameOver = false
    this.lastGuess = null
  }

  /**
   * 숫자 추측 처리
   * @param {number} guess - 사용자가 추측한 숫자
   * @returns {Object} 추측 결과 객체
   */
  makeGuess(guess) {
    // 입력값 검증
    if (typeof guess !== 'number' || isNaN(guess)) {
      return {
        isValid: false,
        message: '올바른 숫자를 입력해주세요!'
      }
    }

    if (guess < this.min || guess > this.max) {
      return {
        isValid: false,
        message: `${this.min}부터 ${this.max} 사이의 숫자를 입력해주세요!`
      }
    }

    // 게임이 이미 끝났는지 확인
    if (this.isGameOver) {
      return {
        isValid: false,
        message: '게임이 이미 종료되었습니다. 새 게임을 시작해주세요.'
      }
    }

    this.attempts++
    this.lastGuess = guess

    // 정답 확인
    if (guess === this.targetNumber) {
      this.isGameOver = true
      return {
        isValid: true,
        result: 'correct',
        message: `정답입니다! ${this.attempts}번 만에 맞추셨네요!`,
        attempts: this.attempts,
        isGameOver: true
      }
    }

    // 힌트 제공
    const hint = guess < this.targetNumber ? 'too_low' : 'too_high'
    const message = hint === 'too_low' 
      ? `더 큰 숫자입니다! (시도: ${this.attempts}번)`
      : `더 작은 숫자입니다! (시도: ${this.attempts}번)`

    return {
      isValid: true,
      result: hint,
      message,
      attempts: this.attempts,
      isGameOver: false
    }
  }

  /**
   * 현재 게임 상태 반환
   * @returns {Object} 게임 상태 객체
   */
  getGameState() {
    return {
      attempts: this.attempts,
      isGameOver: this.isGameOver,
      lastGuess: this.lastGuess,
      min: this.min,
      max: this.max
    }
  }

  /**
   * 정답 반환 (디버깅용 - 실제 게임에서는 사용하지 않음)
   * @returns {number} 정답 숫자
   */
  getAnswer() {
    return this.targetNumber
  }
}

export default NumberGuessingGame