import React from 'react';
import { GlobalServicesProvider } from '../services/context/GlobalServicesContext.tsx';


export const Container = ({ children }: {
    children?: React.ReactNode
}) => {
    return <GlobalServicesProvider>
        {children}
    </GlobalServicesProvider>;


};
