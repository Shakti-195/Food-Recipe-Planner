import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#fff',
            color: '#333',
          },
          success: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
          },
        }}
      />
      <App />
    </>
  </StrictMode>
)