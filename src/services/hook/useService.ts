
import { useServicesContext } from '../context/GlobalServicesContext.tsx';
import { ResourceProviderConstructor } from '../resolvers/ServiceResolverClass.ts';
export const useService =<T extends ResourceProviderConstructor> (serviceClass : T) :InstanceType<T>=> {
    const services = useServicesContext();
    return  services.getService(serviceClass)  as InstanceType<T> ;
};
