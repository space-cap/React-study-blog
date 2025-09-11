# React Hello World 튜토리얼

이 문서는 React를 사용하여 "Hello World" 애플리케이션을 만드는 과정을 단계별로 설명합니다.

## 개요

React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 이 튜토리얼에서는 Vite 번들러를 사용하여 간단한 React 애플리케이션을 생성합니다.

## 프로젝트 구조

```
helloworld/
├── docs/
│   └── react-hello-world-tutorial.md
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 파일별 설명

### 1. package.json

프로젝트의 메타데이터와 의존성을 정의하는 파일입니다.

```json
{
  "name": "hello-world-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "vite": "^5.2.0"
  }
}
```

**주요 구성 요소:**
- `dependencies`: 런타임에 필요한 패키지 (React, React-DOM)
- `devDependencies`: 개발 시에만 필요한 패키지 (Vite, ESLint 등)
- `scripts`: npm 명령어 정의

### 2. index.html

애플리케이션의 HTML 템플릿 파일입니다.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**핵심 포인트:**
- `<div id="root"></div>`: React 앱이 렌더링될 루트 엘리먼트
- `<script type="module" src="/src/main.jsx">`: React 앱의 진입점

### 3. src/main.jsx

React 애플리케이션의 진입점 파일입니다.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**핵심 개념:**
- `ReactDOM.createRoot()`: React 18의 새로운 루트 API
- `React.StrictMode`: 개발 모드에서 잠재적 문제를 감지하는 래퍼 컴포넌트
- `document.getElementById('root')`: HTML의 root div 요소를 찾아 React 앱을 마운트

### 4. src/App.jsx

메인 React 컴포넌트입니다.

```jsx
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default App
```

**React 컴포넌트의 기본 구조:**
- 함수형 컴포넌트로 정의
- JSX를 반환 (HTML과 유사한 문법)
- `export default`로 다른 파일에서 import 할 수 있게 함

### 5. vite.config.js

Vite 번들러의 설정 파일입니다.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Vite의 장점:**
- 빠른 개발 서버 시작
- Hot Module Replacement (HMR) 지원
- ES 모듈 기반의 빌드 도구

## 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 시작
```bash
npm run dev
```

### 3. 빌드 (배포용)
```bash
npm run build
```

### 4. 빌드된 파일 미리보기
```bash
npm run preview
```

## 학습 포인트

### JSX (JavaScript XML)
- JavaScript 안에서 HTML과 유사한 문법을 사용
- React에서 UI를 구성하는 방법
- 브라우저가 이해할 수 있는 JavaScript로 변환됨

### 컴포넌트 기반 아키텍처
- UI를 재사용 가능한 컴포넌트로 분리
- 각 컴포넌트는 독립적인 기능을 담당
- 유지보수와 확장이 용이

### ES6 모듈 시스템
- `import`와 `export`를 사용한 모듈 관리
- 코드의 재사용성과 구조화 개선

## 다음 단계

이 기본 "Hello World" 애플리케이션을 바탕으로 다음과 같은 기능들을 추가해볼 수 있습니다:

1. **상태 관리**: `useState` 훅을 사용하여 동적 데이터 처리
2. **이벤트 처리**: 버튼 클릭, 폼 입력 등의 사용자 상호작용
3. **컴포넌트 분리**: 더 작은 컴포넌트들로 분리하여 재사용성 증대
4. **CSS 스타일링**: CSS 모듈, Styled Components 등을 사용한 스타일링
5. **라우팅**: React Router를 사용한 페이지 네비게이션

## 참고 자료

- [React 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [JSX 소개](https://react.dev/learn/writing-markup-with-jsx)
- [React 컴포넌트](https://react.dev/learn/your-first-component)