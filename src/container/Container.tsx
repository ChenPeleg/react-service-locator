import React from 'react';
import { GlobalServicesProvider } from '../services/context/GlobalServicesContext.tsx';
import { LocalStorageService } from '../services/LocalStorageService.ts';
import { SimpleService } from '../services/simple.service.ts';


export const Container = ({ children }: {
    children?: React.ReactNode
}) => {
    return <GlobalServicesProvider services={[LocalStorageService,SimpleService]}>
        {children}
    </GlobalServicesProvider>;


};
