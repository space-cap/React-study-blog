import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NumberGame from './NumberGame'

// NumberGuessingGame 모킹
const mockMakeGuess = vi.fn()
const mockReset = vi.fn()
const mockGetGameState = vi.fn()

vi.mock('../utils/NumberGuessingGame', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      makeGuess: mockMakeGuess,
      reset: mockReset,
      getGameState: mockGetGameState
    }))
  }
})

// 테스트용 래퍼 컴포넌트
const TestWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

describe('NumberGame 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetGameState.mockReturnValue({
      attempts: 0,
      isGameOver: false,
      lastGuess: null,
      min: 1,
      max: 100
    })
  })

  it('게임 제목과 초기 메시지가 표시된다', () => {
    render(
      <TestWrapper>
        <NumberGame />
      </TestWrapper>
    )
    
    expect(screen.getByText('숫자 맞추기 게임')).toBeInTheDocument()
    expect(screen.getByText('1부터 100 사이의 숫자를 맞춰보세요!')).toBeInTheDocument()
  })

  it('입력 필드와 추측 버튼이 표시된다', () => {
    render(
      <TestWrapper>
        <NumberGame />
      </TestWrapper>
    )
    
    expect(screen.getByPlaceholderText('숫자를 입력하세요')).toBeInTheDocument()
    expect(screen.getByText('추측하기')).toBeInTheDocument()
  })

  it('사용자가 숫자를 입력할 수 있다', () => {
    render(
      <TestWrapper>
        <NumberGame />
      </TestWrapper>
    )
    
    const input = screen.getByPlaceholderText('숫자를 입력하세요')
    fireEvent.change(input, { target: { value: '42' } })
    
    expect(input.value).toBe('42')
  })

  it('폼 제출 시 게임 로직이 호출된다', () => {
    mockMakeGuess.mockReturnValue({
      isValid: true,
      message: '더 큰 숫자입니다! (시도: 1번)',
      result: 'too_low',
      attempts: 1,
      isGameOver: false
    })

    mockGetGameState.mockReturnValue({
      attempts: 1,
      isGameOver: false,
      lastGuess: 42,
      min: 1,
      max: 100
    })

    render(
      <TestWrapper>
        <NumberGame />
      </TestWrapper>
    )
    
    const input = screen.getByPlaceholderText('숫자를 입력하세요')
    const submitButton = screen.getByText('추측하기')
    
    fireEvent.change(input, { target: { value: '42' } })
    fireEvent.click(submitButton)
    
    expect(mockMakeGuess).toHaveBeenCalledWith(42)
  })

  it('게임 종료 시 새 게임 시작 버튼이 표시된다', () => {
    mockGetGameState.mockReturnValue({
      attempts: 3,
      isGameOver: true,
      lastGuess: 50,
      min: 1,
      max: 100
    })

    render(
      <TestWrapper>
        <NumberGame />
      </TestWrapper>
    )
    
    expect(screen.getByText('새 게임 시작')).toBeInTheDocument()
    expect(screen.queryByText('추측하기')).not.toBeInTheDocument()
  })

  it('새 게임 시작 버튼 클릭 시 게임이 재시작된다', () => {
    mockGetGameState.mockReturnValue({
      attempts: 3,
      isGameOver: true,
      lastGuess: 50,
      min: 1,
      max: 100
    })

    render(
      <TestWrapper>
        <NumberGame />
      </TestWrapper>
    )
    
    const resetButton = screen.getByText('새 게임 시작')
    fireEvent.click(resetButton)
    
    expect(mockReset).toHaveBeenCalled()
  })
})