
import { useServicesContext } from '../context/GlobalServicesContext.tsx';
import { ResourceProviderConstructor } from '../resolvers/ServiceResolverClass.ts';

export const useService = (serviceClass : ResourceProviderConstructor) => {
    const services = useServicesContext();
    return  services.getService(serviceClass);
};
