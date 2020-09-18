import React from 'react'

//React Router
import { Redirect, Route, Switch } from 'react-router-dom'

//Components
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { LoginScreen } from '../components/auth/LoginScreen'

export const AuthRouter = () => {
    return (

        <div className="container my-5">
            <Switch>
                <Route exact path="/auth/register" component={RegisterScreen} />
                <Route exact path="/auth/login" component={LoginScreen} />

                <Redirect to="/auth/login"/>
            </Switch>
        </div>

    )
}
