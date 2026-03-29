import { Routes, Route, Navigate } from 'react-router-dom';
import CategoriasPage from '../pages/CategoriasPage';
import PeliculasPage from '../pages/PeliculasPage';
import ClientesPage from '../pages/ClientesPage';
import ComprasPage from '../pages/ComprasPage';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/categorias" />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/peliculas" element={<PeliculasPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/compras" element={<ComprasPage />} />
        </Routes>
    );
}
