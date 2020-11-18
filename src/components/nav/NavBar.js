import React, { useContext} from "react"
import { Link, useHistory } from "react-router-dom"

import { ProfileContext } from "../auth/AuthProvider"

import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    const { isAdmin } = useContext(ProfileContext)
    
    


    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">
                    <img className="navbar__logo" src={Logo} alt="logo"/>
                </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/"><i className="fas fa-home fa-3x"></i></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts/myposts"><button className="btn btn-primary">My Posts</button></Link>
            </li>
            {
                isAdmin
                ?   <li className="navbar__item">
                        <Link className="nav-link" to="/categories"><button className="btn btn-primary">Category Manager</button></Link>
                    </li>
                : ''
            }

            <li className="navbar__item">
                <Link className="nav-link" to="/tags"><button className="btn btn-primary">Tags</button></Link>
            </li>
            {
                isAdmin ?
                
                < li className="navbar__item">
                    <Link className="nav-link" to="/users"><button className="btn btn-primary">User Manager</button></Link>
                </li>
                :
                < li className="navbar__item">
                    <Link className="nav-link" to="/users"><button className="btn btn-primary">Users</button></Link>
                </li>
            }
            {
                (localStorage.getItem("rare_user_id") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                history.push({ pathname: "/" })
                                
                                
                            }}
                        ><i className="fas fa-sign-out-alt fa-3x"></i></button>
                    </li>
                     :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        
                    </>

            }   
                
        </ul>
    )
}
