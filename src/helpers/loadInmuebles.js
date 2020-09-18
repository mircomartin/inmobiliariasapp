import { db } from './../firebase/firebase-config';

/* export const loadProducts = async(uid) => {
    const productsSnap = await db.collection(`${uid}/hunt/products`).orderBy('createDate', 'desc').get();

    const products = [];

    productsSnap.forEach(snapHijo => {
        products.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    
    return products;
} */

export const loadInmueblesAll = async () => {
	const inmueblesSnap = await db.collection('Inmuebles').get();

	const inmuebles = [];

	inmueblesSnap.forEach((snapHijo) => {
		inmuebles.push({
			id: snapHijo.id,
			...snapHijo.data(),
		});
	});

	return inmuebles;
};

export const loadInmueblesSearch = async (keyword) => {
	const inmueblesSnap = await db
		.collection('Inmuebles')
		.orderBy('address')
		.where('keywords', 'array-contains', keyword.inmueble.toLowerCase())
		.get();
	const inmuebles = [];

	inmueblesSnap.forEach((snapHijo) => {
		inmuebles.push({
			id: snapHijo.id,
			...snapHijo.data(),
		});
	});

	return inmuebles;
};

export const loadInmuebleActive = async (id) => {
	const inmueble = await db.collection('Inmuebles').doc(id).get();

	const queryResp = inmueble.data();

	const newInmueble = {
		id,
		...queryResp,
	};

	return newInmueble;
};
