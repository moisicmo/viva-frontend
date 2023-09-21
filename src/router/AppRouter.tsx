
import { Navigate, Route, Routes } from 'react-router-dom';

/* Rutas */
import { ImageView } from '@/views/client/ImageView';
import { CaptureView } from '@/views/admin/CaptureView';

export const AppRouter = () => {


    return (
        <Routes>
            {/* captura de imagen */}
            <Route path="/admin" element={<CaptureView />} />
            {/* vista la imagen del cliente */}
            <Route path="/" element={<ImageView />} />
            {/*  */}
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
    )
}
