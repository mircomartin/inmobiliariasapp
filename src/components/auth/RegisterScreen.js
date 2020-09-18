import React from 'react';

//Validator
import validator from 'validator';

//Components
import { useForm } from '../../hooks/useForm';
import { Error } from '../ui/Error';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { removeError, showError } from '../../actions/ui';
import { startRegisterEmailPassword } from '../../actions/auth';

export const RegisterScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { msgError } = useSelector(state => state.ui)

	const [formValues, handleInputChange] = useForm({
		name: '',
		lastname: '',
		email: '',
		password: '',
	});

	const { name, lastname, email, password } = formValues;

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
		} else if (password.trim() < 6 || password.trim() === '') {
			dispatch(showError('El PASSWORD es obligatorio'));

			setTimeout(() => {
				dispatch(removeError());
			}, 3000);

			return false;
		}

		return true;
	};

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			//Si la validacion es correcta
			dispatch(startRegisterEmailPassword(email, password, name, lastname));
			history.push('/');
		}
	};

	return (
		<div className="row justify-content-center auth">
			<div className="col-8">
				<div className="d-block text-center">
					<i className="fas fa-lock auth__icono"></i>
				</div>
				<h1 className="auth__title">Registre su Cuenta</h1>
				<form onSubmit={handleRegister} noValidate>
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
							placeholder="Ingresa tu Email"
							type="email"
							className="auth__input register"
							name="email"
							value={email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<input
							placeholder="Ingresa tu Password"
							type="password"
							className="auth__input register"
							name="password"
							value={password}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group text-center">
						<button type="submit" className="btn boton btn-success">
							Registrar
						</button>
					</div>
				</form>
			</div>
			{msgError && <Error message={msgError} />}
		</div>
	);
};
