import { createContext, ReactNode, useMemo } from 'react';
import {   ServiceInjectionMethod, ServicesProvider } from './ServiceResolverClass.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const ServicesProviderContext = createContext<ServicesProvider>(
    {} as ServicesProvider,
);
export const ServicesProvider =
    ({
         children,
         services,
     }: {
        children: ReactNode;
        services: ServiceInjectionMethod[];
    }) => {
        const servicesSupplierInitialState = useMemo(() => new ServicesProvider(
            services,
        ), [services]);

        return (
            <ServicesProviderContext.Provider value={servicesSupplierInitialState}>
                {children}
            </ServicesProviderContext.Provider>
        );
    };


