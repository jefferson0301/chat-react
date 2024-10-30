import  { createContext, useState  } from "react";

export  const NameContext = createContext("")

export const NameContextProvider = ({children} ) => {
    
    const [name, setname] = useState("teste")

    return (
        <NameContext.Provider value={{name, setname}} >
            {children}
        </NameContext.Provider>
    )
}