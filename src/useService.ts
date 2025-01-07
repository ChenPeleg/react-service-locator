import {  ServicesProviderContext } from './ServicesProvider.tsx';
import { ServiceConstructorClass } from './ServiceResolverClass.ts';
import { useContext } from 'react';

/**
 * Hook to retrieve a service instance by its class.
 * @template T
 * @param {T} serviceClass - The service class to retrieve.
 * @returns {InstanceType<T>} The instance of the requested service.
 * @example
 * // Assuming DataService is a service class
 * const dataService = useService(DataService);
 * dataService.getData('https://example.com');
 */
export function useService<T extends ServiceConstructorClass>(serviceClass: T): InstanceType<T>;
/**
 * Hook to retrieve multiple service instances by their classes.
 * @template T
 * @param {T[]} serviceClass - An array of service classes to retrieve.
 * @returns {{ [K in keyof T]: InstanceType<T[K]> }} An array of instances of the requested services.
 * @example
 * // Assuming DataService and ProfileDataService are service classes
 * const [dataService, profileDataService] = useService([DataService, ProfileDataService]);
 * dataService.getData('https://example.com');
 * profileDataService.getProfileData();
 */
export function useService<T extends ServiceConstructorClass[]>(serviceClass: [...T]): { [K in keyof T]: InstanceType<T[K]> };


export function useService<T extends ServiceConstructorClass>(serviceClass: T | T[]) {
    const services = useContext(ServicesProviderContext);
    if (Array.isArray(serviceClass)) {
        return serviceClass.map((service) => services.getService(service))  ;
    }
    return services.getService(serviceClass) as InstanceType<T>;
}
