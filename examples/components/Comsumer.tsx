import React from 'react';
import { useService } from '../../src/useService.ts';
import { DataService } from '../services/dataService.ts';
import { LocalStorageService } from '../services/LocalStorageService.ts';


export const Consumer = ({ children }: {
    children?: React.ReactNode
}) => {
    const [dataService, localStorageService] = useService([DataService,LocalStorageService]);
    const k = dataService.getFromLocalStorage('key');
    const l = localStorageService.getItem('key');

    return <div> "I'm a sub component 1"
        <div>
            {k}, {l}
            {children}
        </div></div>;
};
