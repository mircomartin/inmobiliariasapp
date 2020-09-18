import React, { useState, useEffect } from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { login, startLoadProfile } from '../actions/auth';

//Firebase
import { firebase } from './../firebase/firebase-config';

//React Router Dom
import { BrowserRouter as Router, Switch } from "react-router-dom";

//Components
import { DashboardRoutes } from './DashboardRoutes';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Spinner } from '../components/ui/Spinner';

export const AppRouter = () => {
	const { logged } = useSelector(state => state.auth)
	const dispatch = useDispatch();

	const [checking, setChecking] = useState(true);

	useEffect(() => {

		//Usuario Autentificado quede en el state
		firebase.auth().onAuthStateChanged((user) => {
			
			if (user?.uid) {
				const usuarioLogueado = {
					uid: user.uid,
					name: user.displayName,
				};

				dispatch(startLoadProfile(user.uid))
				dispatch(login(usuarioLogueado));
			} 
			setChecking(false);
		});
		// eslint-disable-next-line
	}, [dispatch]);

	//Esperando que verifique si esta logueado o no
	if (checking) {
		return <Spinner/>;
	}

	return (
		<Router>
			<Switch>
				<PublicRoute
					path="/auth" 
					component={AuthRouter}
					isAuthenticated={!!logged}/>
				<PrivateRoute
					path="/" 
					component={DashboardRoutes}
					isAuthenticated={!!logged}/>
			</Switch>
		</Router>
	);
};
