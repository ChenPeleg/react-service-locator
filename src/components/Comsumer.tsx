import React from 'react';
import { useService } from '../services/hook/useService.ts';
import { SimpleService } from '../services/simple.service.ts';
import { LocalStorageService } from '../services/LocalStorageService.ts';


export const Consumer = ({ children }: {
    children?: React.ReactNode
}) => {
    const [simpleService, localStorageService] = useService([SimpleService,LocalStorageService]);
    const k = simpleService.getFromLocalStorage('key');

    return <div> "I'm a sub component 1"
        <div>
            {k}
            {children}
        </div></div>;
};
