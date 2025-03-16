import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import './styles.css';
import { AuthProvider, IsMobileProvider } from './context';
import { LoginPage } from './pages';
import { CategoriesProvider } from './entities';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <IsMobileProvider>
            <AuthProvider loginPage={<LoginPage />}>
                <CategoriesProvider>
                    <App />
                </CategoriesProvider>
            </AuthProvider>
        </IsMobileProvider>
    </StrictMode>,
);
