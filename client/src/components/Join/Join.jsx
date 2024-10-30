import React, {useContext, useRef} from "react"
import io from 'socket.io-client'

const Join = ({setchatVisibility, setSocket, setName}) => {

    const useNameRef = useRef()

    const NameContext = useContext("jeff")

    console.log(NameContext)

    const handleSubmit =  async () => {
        const username = useNameRef.current.value
        if(!username.trim()) {
            return
        }
        else{
            const socket = await io.connect('http://localhost:3001')
            //console.log(userName)
            socket.emit('set_username', username)
            setName(username)
            setSocket(socket)
            setchatVisibility(true)
        }
        console.log("Submit")
    }

  return (
    <div>
        <h1>Join</h1>
        <input type="text" placeholder="Nome de usuário" ref={useNameRef} />
        <button onClick={() => handleSubmit()} >Entrar</button>
    </div>
  )
}

export default Join