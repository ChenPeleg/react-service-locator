import { createContext, ReactNode, useMemo } from 'react';
import {   ServiceInjectionMethod, ServicesResolver } from './ServiceResolverClass.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const ServicesProviderContext = createContext<ServicesResolver>(
    {} as ServicesResolver,
);
export const ServicesProvider =
    ({
         children,
         services,
     }: {
        children: ReactNode;
        services: ServiceInjectionMethod[];
    }) => {
        const servicesSupplierInitialState = useMemo(() => new ServicesResolver(
            services,
        ), [services]);

        return (
            <ServicesProviderContext.Provider value={servicesSupplierInitialState}>
                {children}
            </ServicesProviderContext.Provider>
        );
    };


