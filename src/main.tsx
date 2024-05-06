import './global.css'
import 'virtual:fonts.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './components/App'
import AuthProvider from './services/Providers/AuthProvider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as Element).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthProvider>
)
