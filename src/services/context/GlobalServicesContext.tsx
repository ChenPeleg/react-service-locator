import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ResourceProviderConstructor, ServicesResolver } from '../resolvers/ServiceResolverClass.ts';
import { appConfig } from '../../appConfig.ts';

const GlobalServicesContext = createContext<ServicesResolver>(
    {} as ServicesResolver,
);


export const GlobalServicesProvider =
    ({
         children,
         services
     }: {
        children: ReactNode;
        services : ResourceProviderConstructor[];
    }) => {
        const servicesSupplierInitialState = useMemo(()=>new ServicesResolver(
            {
                environment:
                appConfig
                    .environment,
                services
            },
        ),[services])


        return (
            <GlobalServicesContext.Provider value={servicesSupplierInitialState}>
                {children}
            </GlobalServicesContext.Provider>
        );
    };

export const useServicesContext = () => useContext(GlobalServicesContext);
