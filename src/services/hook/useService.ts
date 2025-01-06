import { GlobalServicesContext } from '../context/GlobalServicesContext.tsx';
import { ServiceConstructorClass } from '../core/ServiceResolverClass.ts';
import { useContext } from 'react';

// Overload signatures for useService hook
export function useService<T extends ServiceConstructorClass>(serviceClass: T): InstanceType<T>;
export function useService<T extends ServiceConstructorClass[]>(serviceClass: [...T]): { [K in keyof T]: InstanceType<T[K]> };


export function useService<T extends ServiceConstructorClass>(serviceClass: T | T[]) {
    const services = useContext(GlobalServicesContext);
    if (Array.isArray(serviceClass)) {
        return serviceClass.map((service) => services.getService(service)) as any;
    }
    return services.getService(serviceClass) as InstanceType<T>;
}
