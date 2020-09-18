import React, { useEffect, useRef } from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//React Router
import { NavLink, useParams } from 'react-router-dom';

//Actions
import { startActiveInmueble, startUpdateInmueble } from '../../actions/inmuebles';
import { removeError, showError } from '../../actions/ui';

//Components
import { useForm } from '../../hooks/useForm';
import { Error } from '../ui/Error';

export const EditInmuenble = ({ history }) => {

	const dispatch = useDispatch();
	const { active } = useSelector((state) => state.inmuebles);
	const { msgError } = useSelector((state) => state.ui);
	
	const [formValues, handleInputChange, reset] = useForm(active);
	const { address, city, country, description, inside, img } = formValues;
	
	const { id } = useParams();

	useEffect(() => {

		dispatch(startActiveInmueble(id));
		
	}, [id, dispatch]);
	
	const activeId = useRef(active.id);
	
	useEffect(() => {
		if (active.id !== activeId.current) {
			reset(active);
			activeId.current = active.id;
		}
	}, [active, reset]);

	const handleFileChange = (e) => {
		const img = e.target.files[0];

		if (img) {
			formValues.img = img;
		}
	};

	const handleEditInmueble = (e) => {
		e.preventDefault();

		if (
			address.trim() === '' ||
			city.trim() === '' ||
			country.trim() === '' ||
			description.trim() === '' ||
			inside.trim() === ''
		) {
			dispatch(showError('Todos los campos son obligatorio'));

			setTimeout(() => {
				dispatch(removeError());
			}, 3000);

			return false;
		}

		//enviar al state
		if (img === active.img) {
			delete formValues.img;
		}

		dispatch(startUpdateInmueble(formValues))

		setTimeout(() => {
			history.push('/');
		}, 2000);

	};

	return (
		<div className="row inmueble p-2 justify-content-center">
			<nav className="col-12 inmueble__nav" aria-label="breadcrumb">
				<ol className="breadcrumb bg-transparent">
					<NavLink
						exact
						to="/"
						className="breadcrumb-item inmueble__link"
						aria-current="page"
					>
						<span className="mr-2">
							<i className="fas fa-home"></i>
						</span>
						Home
					</NavLink>
					<span className="breadcrumb-item inmueble__link active">
						Editar Inmueble
					</span>
				</ol>
			</nav>
			<div className="col-12">
				<form onSubmit={handleEditInmueble} noValidate>
					<div className="form-group">
						<input
							placeholder="Direccion del Inmueble"
							type="text"
							className="inmueble__input"
							name="address"
							value={address}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group d-block d-md-flex justify-content-between">
						<input
							placeholder="Ciudad"
							type="text"
							className="inmueble__input media"
							name="city"
							value={city}
							onChange={handleInputChange}
						/>
						<input
							placeholder="Pais"
							type="text"
							className="inmueble__input media"
							name="country"
							value={country}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<textarea
							placeholder="Descripcion del Inmueble"
							type="text"
							className="inmueble__input"
							name="description"
							value={description}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<textarea
							placeholder="Interior del Inmueble"
							type="text"
							className="inmueble__input"
							name="inside"
							value={inside}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group text-center my-5">
						<div className="text-center my-3">
							<i className="fas fa-download inmueble__icono"></i>
						</div>
						<label htmlFor="file" className="inmueble__label">
							Seleccione Imagen
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
