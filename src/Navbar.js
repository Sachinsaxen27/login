import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from './Notifaction'
import DemoAPI from './ContextApi/DemoAPI'
import "./App.css"
function Navbar() {
    const context=useContext(DemoAPI)
    const {showAlert}=context
    const location = useLocation()
    const history=useNavigate()
    useEffect(()=>{ 
    },[])
    const handlelogout = () => {
        localStorage.clear()
        showAlert("LogOut Successfully",'success')
        history('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">DEMO</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                    {localStorage.token!==undefined?<button onClick={handlelogout} type="button" className="btn btn-primary">LogOut<i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180 mx-2" style={{ color: "#ededed" }}></i>
                    </button>:""}
                    {(location.pathname !== '/signin'&&localStorage.token===undefined)&&<Link to='/signin' type="button" className="btn btn-primary">SignIn
                        <i className="fa-solid fa-arrow-right-to-bracket fa-lg mx-2" style={{ color: "#ededed" }}></i>
                    </Link>}
                </div>
            </nav>
            <Alert/>
        </>
    )
}

export default Navbar