import React from 'react'
import App from './App'
import { MycontextProvider } from './context/Mycontext'
const App4 = () => {
  return (
    <div>
        <MycontextProvider>
                <App />
      </MycontextProvider>
    </div>
  )
}

export default App4
