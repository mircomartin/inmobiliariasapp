import React from 'react';

//Redux
import { Provider } from 'react-redux';
import { store } from './store/store';


//Components
import { AppRouter } from './routes/AppRouter';

function InmobiliariaApp() {
	return (
	<Provider store={store}>
		<AppRouter />
	</Provider>
	);
}

export default InmobiliariaApp;
