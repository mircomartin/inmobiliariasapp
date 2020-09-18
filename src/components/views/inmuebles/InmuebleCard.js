import React from 'react';

//Redux
import { useDispatch } from 'react-redux';

//Router
import { useHistory } from 'react-router';

//Swal
import Swal from 'sweetalert2';

//Actions
import { startDeleteProduct } from '../../../actions/inmuebles';

export const InmuebleCard = ({ inmueble }) => {
	const dispatch = useDispatch();
	const history = useHistory()

	const { img, city, country, id } = inmueble;

	const handleDelete = () => {
		
		Swal.fire({
			title: '¿Estas seguro?',
			text: "Un Inmueble que se elimina no se puede recuperar",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#5D8C71',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!!',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
				// pasarlo al action
				dispatch(startDeleteProduct(id));
			}
		});
	}

	const handleEdit = (id) => {
		history.push(`/inmueble/${id}`)
	}

	return (
		<div className="col-12 col-md-6 col-lg-4 mb-3">
			<div className="card">
				{img ? (
					<img src={img} className="card-img-top card__img" alt={city} />
				) : (
					<img src="/static/img/sin-imagen.png" alt="sin-imagen" className="card-img-top card__img"/>
				)}
				<div className="card-body">
					<h5 className="card-title">{city}<span>, {country}</span></h5>
					<div className="card-body px-0">
						<button onClick={() => handleEdit(id)} className="card__button">
							Editar
						</button>
						<button onClick={() => handleDelete(id)} className="card__button">Eliminar</button>
					</div>
				</div>
			</div>
		</div>
	);
};
