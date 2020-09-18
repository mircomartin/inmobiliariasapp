import { storage } from "./../firebase/firebase-config";

export const fileUpload = async ( file ) => {

    const namePic = file.name;
    const nameKey = Date.now()
    const extension = namePic.split('.').pop()
    const alias = (namePic.split('.') + "_" + nameKey + "." + extension).replace(/\s/g,"_").toLowerCase()

    // creo una referencia al lugar donde guardaremos el archivo
    const refStorage = storage.child(alias);
    
    // Comienzo la tarea de upload
    await refStorage.put(file);
    
    const url = await refStorage.getDownloadURL();

    return url

}