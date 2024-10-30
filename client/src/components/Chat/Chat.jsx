import  {useRef, useState, useEffect} from "react"
import styles from "./Chat.module.css"

const Chat = ({socket, name}) => {

  //console.log(name)
  
  const messageRef = useRef()

  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket.on('recive_message', data => {
      setMessageList((current) => [...current, data]) // current valor atual ele add o dado
    })
    
    return () => socket.off('recive_message') // para de escutar as sms ele vai ficar mostrando as sms mais de uma vez
  
  }, [socket])

  const handleSubmit = () => {
    const message = messageRef.current.value
    if(!message.trim()) return // se não tiver nada retorna

    socket.emit('message', message)
    clearInput()
    focusInput()
  }

  const focusInput = () => {
    messageRef.current.focus()
  }

  const clearInput = () => {
    messageRef.current.value = ""
  }

  return (
    <div  >
        <h1 className={styles.titulo} >Chat em tempo real</h1>
        <div className={styles.container} >
        {
          messageList.map( (message, index) => (
            
              <div className={styles.messagem} key={index} > 
                {message.authorId === socket.id ? 
                <div className={styles.sms_autor} >
                  <p className={styles.usuario} > {message.author}  </p> 
                  <p className={styles.mensagem} >{message.text}</p>
                </div>
                :
                  <div className={styles.sms_destinatario} >
                    <p className={styles.usuario} > {message.author}  </p> 
                    <p className={styles.mensagem} >{message.text}</p>
                  </div>
                
                }
              </div>
              
          ))
        }
         </div>

         <div className={styles.chat} >
            <textarea className={styles.input_sms}  type="text" ref={messageRef} placeholder="Mensagem" />
            <button onClick={() => handleSubmit()} > Enviar </button>
         </div>
        
    </div>
  )
}

export default Chat