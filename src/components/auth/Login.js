import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"


export const Login = (props) => {
    const email = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => {
                return res.json()
            })
            .then(user => {
               return user !== undefined ? user : false
            })

}

const handleLogin = (e) => {
    e.preventDefault()

    existingUserCheck()
        .then(exists => {
            if (exists && exists.password === password.current.value) {
                localStorage.setItem("rare_user_id", exists.id)
                props.history.push("/home")
            } else if (exists && exists.password !== password.current.value) {
                invalidDialog.current.showModal()
            } else if (!exists) {
                invalidDialog.current.showModal()
            }
            
        })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Level Up</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email" id="email" className="form-control" defaultValue="me@me.com" placeholder="Email address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" defaultValue="me" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
