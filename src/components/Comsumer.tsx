import React from 'react';
import { LocalStorageService } from '../services/LocalStorageService.ts';
import { useService } from '../services/hook/useService.ts';


export const Consumer = ({ children }: {
    children?: React.ReactNode
}) => {
    const localStorageService = useService(LocalStorageService);
    const k = localStorageService.getItem('key');

    return <div> "I'm a sub component 1"
        <div>
            {k}
            {children}
        </div></div>;
};
