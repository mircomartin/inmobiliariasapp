import React from 'react';

//React Router Dom
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProfileScreen } from '../components/auth/ProfileScreen';

//Components
import { Navbar } from '../components/layout/Navbar';
import { EditInmuenble } from '../components/views/EditInmuenble';
import { ListaInmuebles } from '../components/views/ListaInmuebles';
import { NewInmueble } from '../components/views/NewInmueble';

export const DashboardRoutes = () => {
	return (
		<>
			<Navbar />
			<main className="container my-5">
				<Switch>
					<Route exact path="/" component={ListaInmuebles} />
					<Route exact path="/misinmuebles" component={ListaInmuebles} />
					<Route exact path="/account/profile/:id" component={ProfileScreen} />
					<Route exact path="/inmueble/nuevo-inmueble" component={NewInmueble} />
					<Route exact path="/inmueble/:id" component={EditInmuenble} />

					<Redirect to="/" />
				</Switch>
			</main>
		</>
	);
};
