import { createContext, FC, PropsWithChildren, useContext } from 'react';

const IsMobileContext = createContext(false);

export const IsMobileProvider: FC<PropsWithChildren> = ({ children }) => {
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );

    return (
        <IsMobileContext.Provider value={isMobile}>
            {children}
        </IsMobileContext.Provider>
    );
};

export function useIsMobile() {
    const isMobile = useContext(IsMobileContext);
    if (!isMobile) {
        throw new Error('useIsMobile must be used within an IsMobileProvider');
    }
    return isMobile;
}
