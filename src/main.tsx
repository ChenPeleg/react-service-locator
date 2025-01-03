import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Container } from './container/Container.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Container  >
          <App/>
      </Container>
  </StrictMode>,
)
