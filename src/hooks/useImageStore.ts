import { coffeApi } from "@/services";
<<<<<<< Updated upstream
import Swal from "sweetalert2";
=======
import { Buffer } from 'buffer';
>>>>>>> Stashed changes

export const useImageStore = () => {


    const postSendImage = async (body: object) => {
        try {
            const { data } = await coffeApi.post('/image', body);
            console.log(data)
            Swal.fire(`Genial! tu código es: ${data.codeImage}`, 'La imagen se envió', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', '', 'error');
        }
        return true;
    }

<<<<<<< Updated upstream
=======
    const getImage = async (image_id:string) => {
        const response  = await coffeApi.get(`/image/photo/${image_id}`, {
            responseType: 'arraybuffer',
        });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const objectURL = `data:image/jpeg;base64,${base64Image}`;
        return objectURL;
    }


>>>>>>> Stashed changes
    return {
        //* Métodos
        postSendImage,
        getImage,
    }

}