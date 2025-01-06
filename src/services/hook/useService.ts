import { GlobalServicesContext } from '../context/GlobalServicesContext.tsx';
import { ServiceConstructorClass } from '../core/ServiceResolverClass.ts';
import { useContext } from 'react';

// Overload signatures
export function useService<T extends ServiceConstructorClass>(serviceClass: T): InstanceType<T>;
export function useService<T extends ServiceConstructorClass>(serviceClass: T[]): InstanceType<T>[];


export function useService<T extends ServiceConstructorClass>(serviceClass: T | T[]) {
    const services = useContext(GlobalServicesContext);
    if (Array.isArray(serviceClass)) {
        return serviceClass.map((service) => services.getService(service)) as InstanceType<T>[];
    }
    return services.getService(serviceClass) as InstanceType<T>;
}
