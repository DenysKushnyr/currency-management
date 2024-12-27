import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import AdminPanel from './pages/AdminPanel.tsx';
import LoginPage from './pages/LoginPage.tsx';
import WorkerPanel from './pages/WorkerPanel.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/worker-panel" element={<WorkerPanel />} />
    </Routes>
  </BrowserRouter>
)
