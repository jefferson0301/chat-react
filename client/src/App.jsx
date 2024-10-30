
import { createContext, useState } from 'react'
import './App.css'
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'

function App() {

  const [chatVisibility, setchatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)
  const [name, setName] = useState("")
  console.log(name)

  const NameContext = createContext("")

  return (
  
   <>

    <NameContext.Provider value={name} >    
      {!chatVisibility ? <Join setName={setName} setchatVisibility={setchatVisibility} setSocket={setSocket} name={name} /> : <Chat socket={socket}  />}
    </NameContext.Provider>
   </>
  )
}

export default App
