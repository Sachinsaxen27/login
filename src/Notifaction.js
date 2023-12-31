import React, { useContext} from 'react'
import DemoAPI from './ContextApi/DemoAPI'
function Notifaction() {
    const context = useContext(DemoAPI)
    const { alert } = context
    
    return (
        <>
            {alert.msg  && <div id='notify' style={{ height: "62px", width: '24rem', position: 'fixed', top: "110px", right: '1rem', zIndex: '1000000' }}>
                <div className={`alert alert-${alert.type} d-flex justify-content-between text-center`} role="alert">
                    {alert.msg}
                </div>
            </div >}
        </>
    )
}

export default Notifaction