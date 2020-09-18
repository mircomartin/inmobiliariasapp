import React from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Router Dom
import { Link, NavLink, useHistory } from 'react-router-dom';

//Actions
import { startSignOut } from '../../actions/auth';

export const Navbar = () => {
	const dispatch = useDispatch();
	const { user, profile } = useSelector(state => state.auth)

	const history = useHistory();

	const handleSignout = () => {
		
		//Cerrar Sesion
		dispatch(startSignOut());

		history.replace("/auth/login");
	};

	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-light bg-light">
				<div className="container">
					<div className="row align-items-center w-100 no-gutters">

						<div className="col-auto order-1 order-md-0 mr-3">
							<Link to="/" className="navbar-brand">
								MM HOMES
							</Link>
						</div>

						<div className="col-auto order-0 order-md-1 mr-3 position-static">
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarTogglerDemo01"
								aria-controls="navbarTogglerDemo01"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon" />
							</button>

							<div
								className="collapse navbar-collapse nav__main bg-light"
								id="navbarTogglerDemo01"
							>
								<ul className="navbar-nav mt-md-0 nav__main__list">
									<li className="nav-item">
										<NavLink className="nav-link" to="/inmueble/nuevo-inmueble" activeClassName="active">
											<span className="mr-1">
												<i className="fas fa-plus-square nav__iconos"></i>
											</span>
											Nuevo Inmueble
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink className="nav-link" to="/misinmuebles" activeClassName="active">
											<span className="mr-1">
												<i className="fas fa-building nav__iconos"></i>
											</span>
											Inmuebles
										</NavLink>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-auto ml-auto order-3">
							<span className="nav-item dropdown">
								<button
									className="button-outline p-2 border-0 bg-transparent"
									id="navbarDropdownMenuLink"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="fas fa-ellipsis-v"></i>
								</button>
								<div
									className="dropdown-menu dropdown-menu-right"
									aria-labelledby="navbarDropdownMenuLink"
								>
									<Link className="dropdown-item" to={`/account/profile/${user.uid}`}>
										<span className="mr-2">
											{
												profile?.img
												?(<img src={profile?.img} alt="Foto de Perfil" className="img-fluid auth__img rounded-circle" />)
												:(<i className="fab fa-react"></i>)
											}
										</span>
										{profile?.name}
									</Link>
									<Link className="dropdown-item" to="/">
										<span className="mr-2">
											<i className="far fa-envelope mr-2"></i>
										</span>
										Mensajes
									</Link>
									<button
										className="dropdown-item"
										onClick={handleSignout}
									>
										<span className="mr-2">
											<i className="fas fa-sign-out-alt"></i>
										</span>
										Salir
									</button>
								</div>
							</span>
						</div>

					</div>
				</div>
			</nav>
		</header>
	);
};
