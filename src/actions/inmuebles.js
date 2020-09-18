//Components
import { fileUpload } from "../helpers/fileUpload";
import { createKeyword } from "../helpers/keywords";
import { loadInmuebleActive, loadInmueblesAll, loadInmueblesSearch } from "../helpers/loadInmuebles";

//Actions
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

//Firebase
import { db } from './../firebase/firebase-config'

//Swal
import Swal from "sweetalert2";

//Agregar Nuevo Inmueble
export const startAddNewInmueble = (user, inmueble) => {
    return async (dispatch) => {

        try {
            
            if(inmueble.img) {
                const imgUrl = await fileUpload(inmueble.img);
                inmueble.img = imgUrl
            }
            
            const textoBusqueda = `${inmueble.address} ${inmueble.city} ${inmueble.country}`
            const keywords = createKeyword(textoBusqueda)
    
            const newInmueble = {
                user,
                ...inmueble,
                keywords
            }
    
            const { id } = await db.collection("Inmuebles").add(newInmueble)
            dispatch(addNewInmueble(id, newInmueble))
    
            Swal.fire('Exito!', 'Tu inmueble se agrego de forma exitosa', 'success')
    
        } catch (error) {
            console.log(error.message)
            Swal.fire('Error!', 'Hubo un error, por favor intenta nuevamente', 'error')
        }
    }
}

//Listar todos los inmuebles
export const startListInmuebles = () => {
    return async (dispatch) => {

        dispatch(startLoading())

        try {
            
            const listadoInmuebles = await loadInmueblesAll()
            
            dispatch(listInmuebles(listadoInmuebles))
            dispatch(finishLoading())
        } catch (error) {
            dispatch(finishLoading())
            console.log(error.message)
            Swal.fire('Error!', 'Hubo un error, prueba nuevamente', 'error')
        }
    }
}

//Busqueda
export const startSearchInmueble = (keywords) => {
    return async (dispatch) => {

        dispatch(startLoading())

        try {

            const listadoInmuebles = await loadInmueblesSearch(keywords)
    
            if(listadoInmuebles.length === 0) {
                dispatch(startListInmuebles())
            }
    
            dispatch(listInmuebles(listadoInmuebles))
            dispatch(finishLoading())

        } catch (error) {
            dispatch(finishLoading())
            console.log(error.message)
        }
    }
    
}

//Coloco el inmueble en active
export const startActiveInmueble = (id) => {
    return async (dispatch) => {

        try {
    
            const inmuebleActivo = await loadInmuebleActive(id)
           
            dispatch(selectedInmueble(inmuebleActivo))

        } catch (error) {
            console.log(error.message)
        }
    }
}

//Eliminar un producto
export const startDeleteProduct = (id) => {
    return async (dispatch) => {
        try {
    
            await db.doc(`Inmuebles/${id}`).delete()
            dispatch(deletedInmueble(id))

        } catch (error) {
            Swal.fire('Error!', 'Hubo un error, prueba nuevamente', 'error')
            console.log(error.message)
        }
    }
}

//Editar Inmueble
export const startUpdateInmueble = (inmueble) => {
    return async (dispatch) => {

        try {

            if (inmueble.img) {
				const imgUrl = await fileUpload(inmueble.img);
				inmueble.img = imgUrl;
            }

            const uploadedInmueble = {...inmueble}
            delete uploadedInmueble.id

            await db.collection("Inmuebles")
                    .doc(inmueble.id)
                    .update(uploadedInmueble)

            dispatch(updatedInmueble(inmueble.id, uploadedInmueble))


            Swal.fire('Exito!', 'Tu inmueble se modifico de forma exitosa', 'success')

        } catch (error) {
            console.log(error.message)
            Swal.fire('Error!', 'Hubo un error, prueba nuevamente', 'error')

        }
    }
}

//No async
const addNewInmueble = ( id, newInmueble ) => ({
    type: types.addInmueble,
    payload: {
        id,
        ...newInmueble,
    }
})

const listInmuebles = ( listadoInmuebles ) => ({
    type: types.listInmuebles,
    payload: listadoInmuebles
})

const selectedInmueble = ( selected ) => ({
    type: types.activeInmueble,
    payload: selected
})

const deletedInmueble = ( id ) => ({
    type: types.deletedInmueble,
    payload: id
})

const updatedInmueble = (id, uploadedInmueble) => ({
    type: types.updatedInmueble,
    payload: {id, ...uploadedInmueble},
})