import React, {useEffect,useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './App.css'

function Welcome() {
    const [info, setMyinfo] = useState({})
    useEffect(() => {
        getinfo()
    },[])
    const getinfo = async () => {
        const response = await fetch("http://localhost:5000/api/userlogin/getuserdata", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setMyinfo(json)
    }
    return (
        <>
        <div className='profilecard'>
                <div className="profilepic">
                    <AccountCircleIcon style={{height:'14rem',width:'17rem'}}/>
                </div>
                <div className="profiledetails">
                    <h3 className='text-center'>Your Info</h3>
                    <div className="container" style={{ marginTop: "60px" }}>
                        <div className="row justify-content-between my-5">
                            <div className="col-4 details">
                                <h6>&nbsp;Name:</h6>
                                <span>&nbsp;{info.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{ marginTop: '135px' }}>
                        <div className="row justify-content-between my-5">
                            <div className="col-4 details">
                                <h6>&nbsp;Email:</h6>
                                <span>&nbsp;{info.email}</span>
                            </div>
                            <div className="col-4 details">
                                <h6>&nbsp;Mobile Number :</h6>
                                <span>&nbsp;{info.mobile}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome