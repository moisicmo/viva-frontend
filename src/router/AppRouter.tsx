
import { Navigate, Route, Routes } from 'react-router-dom';

/* Rutas */
import { ImageView } from '@/views/client/ImageView';
import { CaptureView } from '@/views/admin/CaptureView';

export const AppRouter = () => {


    return (
        <Routes>
            {/* captura de imagen */}
            <Route path="/captureView" element={<CaptureView />} />
            {/* vista la imagen del cliente */}
            <Route path="/imagenView" element={<ImageView />} />
            {/*  */}
            <Route path="/*" element={<Navigate to={"/dashboardView"} />} />
        </Routes>
    )
}
