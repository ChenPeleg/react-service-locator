import { createContext, ReactNode, useMemo } from 'react';
import {   ServiceInjectionMethod, ServicesResolver } from './ServiceResolverClass.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const ServicesProviderContext = createContext<ServicesResolver>(
    {} as ServicesResolver,
);
/**
 * `ServicesProvider` is a React component that provides a context for service resolution.
 * It initializes a `ServicesResolver` with the given services and makes it available
 * to the component tree via `ServicesProviderContext`.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The child components that will have access to the services.
 * @param {ServiceInjectionMethod[]} props.services - An array of service injection methods to initialize the `ServicesResolver`.
 */
export const ServicesProvider =
    ({
         children,
         services,
     }: {
        children: ReactNode;
        services: ServiceInjectionMethod[];
    })    => {
        const servicesSupplierInitialState = useMemo(() => new ServicesResolver(
            services,
        ), [services]);

        return (
            <ServicesProviderContext.Provider value={servicesSupplierInitialState}>
                {children}
            </ServicesProviderContext.Provider>
        );
    };


