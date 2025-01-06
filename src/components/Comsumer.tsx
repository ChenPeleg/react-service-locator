import React from 'react';
import { useService } from '../hook/useService.ts';
import { DataService } from '../../examples/services/dataService.ts';
import { LocalStorageService } from '../../examples/services/LocalStorageService.ts';


export const Consumer = ({ children }: {
    children?: React.ReactNode
}) => {
    const [simpleService, localStorageService] = useService([DataService,LocalStorageService]);
    const k = simpleService.getFromLocalStorage('key');
    const l = localStorageService.getItem('key');

    return <div> "I'm a sub component 1"
        <div>
            {k}, {l}
            {children}
        </div></div>;
};
