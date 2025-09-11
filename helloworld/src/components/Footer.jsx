function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #dee2e6',
      padding: '2rem 0',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <div style={{
          marginBottom: '1rem'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#343a40',
            marginBottom: '10px'
          }}>
            React Games
          </h3>
          <p style={{
            color: '#6c757d',
            margin: '0'
          }}>
            React로 만든 간단한 게임들을 즐겨보세요!
          </p>
        </div>
        
        <div style={{
          borderTop: '1px solid #dee2e6',
          paddingTop: '1rem',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          © {new Date().getFullYear()} React Games. Made with React & Vite.
        </div>
      </div>
    </footer>
  )
}

export default Footer