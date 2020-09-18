import React, { useEffect, useState } from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//React Router
import { NavLink } from 'react-router-dom';

//Actions
import { startListInmuebles, startSearchInmueble } from '../../actions/inmuebles';

//Components
import { Spinner } from '../ui/Spinner';
import { InmuebleCard } from './inmuebles/InmuebleCard';

export const ListaInmuebles = () => {
	const dispatch = useDispatch();
	const { inmuebles } = useSelector((state) => state.inmuebles);
	const { loading } = useSelector((state) => state.ui);

	const [search, setSearch] = useState({ inmueble: '' });

	const { inmueble } = search;

	const handleSearchChange = (e) => {
		setSearch({ ...search, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		dispatch(startListInmuebles());
		// eslint-disable-next-line
	}, [dispatch]);

	const handleSearch = (e) => {
		e.preventDefault();

		dispatch(startSearchInmueble(search));
	};

	if (loading) return <Spinner />;

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
						Mis Inmuebles
					</span>
				</ol>
			</nav>
			<div className="col-12">
				<form onSubmit={handleSearch} noValidate>
					<div className="form-group">
						<input
							placeholder="Ingrese el Inmueble a buscar..."
							type="search"
							className="inmueble__search"
							name="inmueble"
							value={inmueble}
							onChange={handleSearchChange}
						/>
					</div>
				</form>
			</div>
			<div className="col-12">
				<div className="row justify-content-around">
					{inmuebles.length === 0 ? (
						<h1>No hubo resultados</h1>
					) : (
						inmuebles.map((inmueble) => (
							<InmuebleCard key={inmueble.id} inmueble={inmueble} />
						))
					)}
				</div>
			</div>
		</div>
	);
};
