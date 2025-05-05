import React, { createContext, useEffect, useState } from 'react'

export let userContext = createContext()

export default function UserContext({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'))

    

  return <userContext.Provider value={{token, setToken}}>
    {children}
  </userContext.Provider>
}
