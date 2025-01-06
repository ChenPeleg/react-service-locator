import { createContext, ReactNode, useMemo } from 'react';
import { ResourceProviderConstructor, ServicesResolver } from '../core/ServiceResolverClass.ts';

export const GlobalServicesContext = createContext<ServicesResolver>(
    {} as ServicesResolver,
);
export const GlobalServicesProvider =
    ({
         children,
         services,
     }: {
        children: ReactNode;
        services: ResourceProviderConstructor[];
    }) => {
        const servicesSupplierInitialState = useMemo(() => new ServicesResolver(
            services,
        ), [services]);

        return (
            <GlobalServicesContext.Provider value={servicesSupplierInitialState}>
                {children}
            </GlobalServicesContext.Provider>
        );
    };


