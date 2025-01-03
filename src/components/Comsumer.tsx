import React from 'react';
import { HttpService } from '../services/http.service.ts';
import { useService } from '../provider/react-service-provider.tsx';

export const Consumer = ({ children }: {
    children?: React.ReactNode
}) => {
    const httpsService = useService(HttpService);
    const res = httpsService.getStrings( );
    return <div> "I'm a sub component"
        <div>
            {res}
            {children}
        </div></div>;
};
