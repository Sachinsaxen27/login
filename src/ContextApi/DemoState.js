import React, { useState } from 'react'
import DemoAPI from './DemoAPI'
function DemoState(props) {
    
    const [alert, setMyAlert] = useState({ msg: null, type: null })
    const showAlert = (message, type) => {
        setMyAlert({ msg: message, type: type })
        setTimeout(() => {
            setMyAlert({ msg: null, type: null })
        }, 2000)
    }

    return (
        <>
        <DemoAPI.Provider value={{showAlert,alert}}>{props.children}</DemoAPI.Provider>
        </>
    )
}

export default DemoState