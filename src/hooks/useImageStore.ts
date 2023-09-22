// import { useDispatch, useSelector } from 'react-redux';
// import { cafeApi } from './../services';
// import { setCarrers } from '../store/user/userSlices';

import { coffeApi } from "@/services";

export const useImageStore = () => {

    // const dispatch = useDispatch();

    const postSendImage = async (body: object) => {
        const { data } = await coffeApi.post('/send/', body);
        console.log(data)
        // dispatch(setCarrers({ carrers: data.carreras }));
    }


    return {
        //* Métodos
        postSendImage,
    }

}