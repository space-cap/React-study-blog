import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{
      backgroundColor: '#343a40',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          React Games
        </Link>
        
        <nav>
          <Link 
            to="/" 
            style={{
              color: 'white',
              textDecoration: 'none',
              marginRight: '20px',
              padding: '5px 10px',
              borderRadius: '3px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#495057'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            홈
          </Link>
          <Link 
            to="/number-game" 
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#495057'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            숫자 맞추기
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header