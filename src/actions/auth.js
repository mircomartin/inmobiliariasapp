import Swal from 'sweetalert2';

//Components
import { fileUpload } from '../helpers/fileUpload';

//Firebase
import { db, firebase } from './../firebase/firebase-config';

//Actions
import { finishLoading, startLoading } from './ui';
import { types } from '../types/types';

//Crear Cuenta
export const startRegisterEmailPassword = (email, password, name, lastname) => {
	return async (dispatch) => {
		try {
			const { user } = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			await user.updateProfile({ displayName: name });

			//Cargo el perfil en un doc.
			const userProfile = {
				name: name,
				email: email,
				lastname: lastname,
				uid: user.uid,
				tel: '',
				img: '',
			};

			//El usuario se crea directo con UID en la coleccion Users
			await db.collection('Users').doc(user.uid).set(userProfile);

			const usuarioLogueado = {
				uid: user.uid,
				name: user.displayName,
			};

			//Dispatch para state
			dispatch(login(usuarioLogueado));

		} catch (error) {
			console.log(error.message);
		}
	};
};

//Login con email y password
export const startLoginEmailPassword = (email, password) => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const { user } = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);

			const usuarioLogueado = {
				uid: user.uid,
				name: user.displayName,
			};

			//Dispatch para state
			dispatch(login(usuarioLogueado));

			dispatch(finishLoading());
		} catch (error) {
			dispatch(finishLoading());
			console.log(error.message);
		}
	};
};

//Cerrar Sesion
export const startSignOut = () => {
	return async (dispatch) => {
		try {
			await firebase.auth().signOut();

			//Dispatch para actualizar el state
			dispatch(logout());
		} catch (error) {
			console.log(error.message);
		}
	};
};

//Cargo perfil
export const startLoadProfile = (uid) => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const query = await db.collection('Users').doc(uid).get();
			const resp = query.data();

			//Dispatch para actualizar el state
			dispatch(loadProfile(resp));

			dispatch(finishLoading());
		} catch (error) {
			console.log(error.message);
		}
	};
};

//Actualizo el perfil del usuario
export const startUpdateProfileAndUser = (uid, userUpdated) => {
	return async (dispatch) => {
		//Loading true

		try {
			const user = firebase.auth().currentUser;
			await user.updateProfile({
				displayName: userUpdated.name,
			});

			const usuarioLogueado = {
				name: user.displayName,
				uid: user.uid,
			};

			dispatch(login(usuarioLogueado));

			if (userUpdated.img) {
				const imgUrl = await fileUpload(userUpdated.img);
				userUpdated.img = imgUrl;
			}

			await db.doc(`Users/${uid}`).update(userUpdated);

			//Dispatch para actualizar el state
			dispatch(loadProfile(userUpdated));

			dispatch(startLoadProfile(uid));

			//Alerta
			Swal.fire('Exito!', 'Tu perfil fue actualizado con exito!', 'success');
		} catch (error) {
			console.log(error.message);
			Swal.fire('Error!', 'Hubo problema, por favor intenta de nuevo', 'error');
		}
	};
};

//No Asyncs
export const login = (usuarioLogueado) => ({
	type: types.login,
	payload: usuarioLogueado,
});

const logout = () => ({
	type: types.logout,
});

const loadProfile = (profile) => ({
	type: types.profileActive,
	payload: profile,
});
