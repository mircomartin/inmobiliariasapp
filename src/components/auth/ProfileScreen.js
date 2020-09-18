import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//Validator
import validator from 'validator';

//Actions
import { startLoadProfile, startUpdateProfileAndUser } from '../../actions/auth';
import { removeError, showError } from '../../actions/ui';

//Components
import { useForm } from '../../hooks/useForm';
import { Error } from '../ui/Error';
import { Spinner } from '../ui/Spinner';

export const ProfileScreen = () => {
	const dispatch = useDispatch();
	const { msgError, loading } = useSelector(state => state.ui)
	const { profile } = useSelector(state => state.auth)

	const [formValues, handleInputChange] = useForm(profile);

	const { name, lastname, tel, email, img } = formValues;

	//Obtengo el ID de la url
	const { id } = useParams();

	useEffect(() => {
		if(!profile) {
			dispatch(startLoadProfile(id));
		}
		// eslint-disable-next-line
	}, []);
	
	//Validator para Validar el form
	const isFormValid = () => {
		if (name.trim() <= 2 || name.trim() === '') {
			dispatch(showError('El NOMBRE es obligatorio'));

			setTimeout(() => {
				dispatch(removeError());
			}, 3000);

			return false;
		} else if (lastname.trim() <= 2 || lastname.trim() === '') {
			dispatch(showError('El APELLIDO es obligatorio'));

			setTimeout(() => {
				dispatch(removeError());
			}, 3000);

			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(showError('El EMAIL es obligatorio'));

			setTimeout(() => {
				dispatch(removeError());
			}, 3000);

			return false;
		}

		return true;
	};

	const handleFileChange = (e) => {
		const img = e.target.files[0];

		if (img) {
			formValues.img = img;
		}
	};

	const handleEditProfile = async (e) => {
		e.preventDefault();

		if (isFormValid()) {

			if (img === profile.img) {
				delete formValues.img;
			}

			//Dispatch
			dispatch(startUpdateProfileAndUser(id, formValues));
		}
	};

	if (loading) return <Spinner />;

	return (
		<div className="row justify-content-center auth">
			<div className="col-8">
				{img && (
					<div className="d-block text-center">
						<img
							src={img}
							alt={name}
							className="img-fluid"
						/>
					</div>
				)}
				<h1 className="auth__title">Perfil de Cuenta</h1>
				<form onSubmit={handleEditProfile} noValidate>
					<div className="form-group">
						<input
							placeholder="Ingresa tu Nombre"
							type="text"
							className="auth__input register"
							name="name"
							value={name}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<input
							placeholder="Ingresa tu Apellido"
							type="text"
							className="auth__input register"
							name="lastname"
							value={lastname}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<input
							placeholder="Ingresa tu Telefono"
							type="number"
							className="auth__input register"
							name="tel"
							value={tel}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<input
							placeholder="Ingresa tu Email"
							type="email"
							className="auth__input register"
							name="email"
							value={email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group text-center my-5">
						<label htmlFor="file" className="auth__label">
							Seleccione su Imagen de perfil
						</label>
						<input
							id="file"
							type="file"
							accept="image/x-png,image/gif,image/jpeg"
							name="img"
							onChange={handleFileChange}
						/>
					</div>
					<div className="form-group text-center">
						<button type="submit" className="btn boton btn-success">
							Guardar
						</button>
					</div>
				</form>
			</div>
			{msgError && <Error message={msgError} />}
		</div>
	);
};
