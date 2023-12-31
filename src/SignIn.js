import React, {useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./App.css"
import DemoAPI from "./ContextApi/DemoAPI"
function SignIn() {
  
  const context = useContext(DemoAPI)
  const { showAlert } = context
  const history = useNavigate()
  const [credintial, setMycredintial] = useState({ email: "", password: "" })

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/userlogin/ulogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ email: credintial.email, password: credintial.password })
    });
    const json = await response.json()
    // console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      showAlert("Login Successfully", 'success')
      history('/welcome')
    }
    else {
      showAlert("Invalid Credenital", 'danger')
      history('/signin')
    }
  }
  console.log('a')
  const handleChange = (e) => {
    setMycredintial({ ...credintial, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="container text-center" style={{ marginTop: '90px', height: '29rem', width: '48rem' }}>
        <div className="row align-items-start">
          <div className="col">
          </div>
          <div className="col">
          </div>
          <div className="col">
          </div>
        </div>
        <div className="container text-center" style={{ marginTop: '25px' }}>
          <div className="row align-items-start">
            <div className="col">
            </div>
            <div className="col">
              <div className="card" style={{ width: "22rem", backgroundColor: "azure" }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ textAlign: 'center', fontSize: '30px' }}>Sign in</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start', marginTop: '16px' }}>Enter mobile phone number or email</h6>
                  <div style={{ display: 'grid', marginTop: "5px", marginBottom: '10px' }}>
                    <input type="text" value={credintial.email} name="email" id="email" onChange={handleChange} />
                  </div>

                  <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start' }}>Password</h6>
                  <div style={{ display: 'grid' }}>
                    <input type="password" value={credintial.password} name="password" id="password" onChange={handleChange} />
                  </div>
                  <div style={{ display: 'grid', marginTop: '15px' }}>
                    <button style={{ borderRadius: '8px', backgroundColor: "lightcyan", height: '35px' }} onClick={handlesubmit}>Continue</button>
                  </div>
                  <div>&nbsp;</div>
                  <div style={{ fontSize: "12px", textAlign: 'start' }}>
                    <p>By continuing, you agree to <a href="/"> Conditions of Use</a> and <a href="/"> Privacy Notice.</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
            </div>
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col">
          </div>

          <div className="col">
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col">
          </div>
          <div className="col" style={{ display: 'grid', marginTop: '10px' }}>
            <Link to='/signup' style={{ width: '16rem', borderRadius: '5px', textDecoration: 'none', backgroundColor: 'azure', border: '1px solid black' }}>Create your Account</Link>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn