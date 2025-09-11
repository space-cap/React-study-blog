import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to React Games</h1>
      <p>React로 만든 간단한 게임들을 즐겨보세요!</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link 
          to="/number-game" 
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          숫자 맞추기 게임 시작
        </Link>
      </div>
    </div>
  )
}

export default HomePage