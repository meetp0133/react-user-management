import { useState } from 'react'
import UserManagement from './components/UserManagement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserManagement />
    </>
  )
}

export default App
