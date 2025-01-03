import React from 'react';
import { ServiceContainer } from '../provider/react-service-provider.tsx';
import { HttpService } from '../services/http.service.ts';
import { SimpleService } from '../services/simple.service.ts';

export const Container = ({ children }: {
    children?: React.ReactNode
}) => {
    return   <ServiceContainer providers={[HttpService, SimpleService]}>

            {children}

    </ServiceContainer>



};
