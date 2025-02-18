import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './styles.css';
import { AuthProvider } from './context';
import { LoginPage } from './pages';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider loginPage={<LoginPage />}>
            <App />
        </AuthProvider>
    </StrictMode>,
);
