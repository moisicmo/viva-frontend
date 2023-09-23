import { coffeApi } from "@/services";
import Swal from "sweetalert2";

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

    return {
        //* Métodos
        postSendImage,
    }

}