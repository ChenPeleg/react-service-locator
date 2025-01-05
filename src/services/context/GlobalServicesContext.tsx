import { createContext, ReactNode, useContext } from 'react';
import { ServicesResolver } from '../resolvers/ServiceResolverClass.ts';
import { appConfig } from '../../appConfig.ts';
import { LocalStorageService } from '../LocalStorageService.ts';

const GlobalServicesContext = createContext<ServicesResolver>(
    {} as ServicesResolver,
);


export const GlobalServicesProvider =
    ({
         children,
     }: {
        children: ReactNode;
    }) => {
        const servicesSupplierInitialState = new ServicesResolver(
            {
                environment:
                appConfig
                    .environment,
                services: [LocalStorageService],
            },
        );


        return (
            <GlobalServicesContext.Provider value={servicesSupplierInitialState}>
                {children}
            </GlobalServicesContext.Provider>
        );
    };

export const useServicesContext = () => useContext(GlobalServicesContext);
