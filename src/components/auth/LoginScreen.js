import React from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { startLoginEmailPassword } from '../../actions/auth';

//Actions
import { removeError, showError } from '../../actions/ui';

//Components
import { useForm } from '../../hooks/useForm';
import { Error } from '../ui/Error';
import { Spinner } from '../ui/Spinner';

export const LoginScreen = ({ history }) => {
	const dispatch = useDispatch();
	const { msgError, loading } = useSelector(state => state.ui)

	const [formValues, handleInputChange] = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();

		if (email.trim() === '') {
			dispatch(showError('El EMAIL es obligatorio'));

			setTimeout(() => {
				dispatch(removeError());
			}, 3000);

			return false;
		} else if (password.trim() === '') {
			dispatch(showError('El PASSWORD es obligatorio'));

			setTimeout(() => {
				dispatch(removeError());
			}, 3000);

			return false;
		}

		//Si todo esta OK

		//Ejecuto el action
		dispatch(startLoginEmailPassword(email, password));

		//Redirijo al Home
		history.push('/');
	};

	if(loading) return <Spinner/>

	return (
		<div className="row justify-content-center auth">
			<div className="col-8">
				<div className="d-block text-center">
					<i className="fas fa-lock auth__icono"></i>
				</div>
				<h1 className="auth__title">Iniciar Sesión</h1>
				<form onSubmit={handleLogin}>
					<div className="form-group">
						<input
							placeholder="Ingresa tu Email"
							type="email"
							className="auth__input login"
							name="email"
							value={email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<input
							placeholder="Ingresa tu Password"
							type="password"
							className="auth__input login"
							name="password"
							value={password}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group text-center">
						<button type="submit" className="btn boton btn-success">
							Iniciar Sesion
						</button>
					</div>
				</form>
			</div>
			{msgError && <Error message={msgError} />}
		</div>
	);
};
