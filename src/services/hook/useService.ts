
import { GlobalServicesContext  } from '../context/GlobalServicesContext.tsx';
import { ServiceConstructorClass } from '../core/ServiceResolverClass.ts';
import { useContext } from 'react';
export const useService =<T extends ServiceConstructorClass> (serviceClass : T) :InstanceType<T>=> {
    const services = useContext(GlobalServicesContext);
    return  services.getService(serviceClass)  as InstanceType<T> ;
};
