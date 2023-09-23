import { coffeApi } from "@/services";
import Swal from "sweetalert2";
import { Buffer } from 'buffer';

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

    const getImage = async (image_id:string) => {
        if(image_id === null) return '';
        const response  = await coffeApi.get(`/image/photo/${image_id}`, {
            responseType: 'arraybuffer',
        });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const objectURL = `data:image/jpeg;base64,${base64Image}`;
        return objectURL;
    }


    return {
        //* Métodos
        postSendImage,
        getImage,
    }

}