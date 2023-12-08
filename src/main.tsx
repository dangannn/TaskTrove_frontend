import './global.css'
import 'virtual:fonts.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App'

createRoot(document.getElementById('root') as Element).render(<App />)
