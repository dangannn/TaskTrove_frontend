import './global.css'
import 'virtual:fonts.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './components/App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as Element).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
