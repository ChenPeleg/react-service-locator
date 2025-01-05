import { LocalStorageService } from '../LocalStorageService.ts';
import { useServicesContext } from '../context/GlobalServicesContext.tsx';

export const useServices = () => {
    const services = useServicesContext();


    const localStorageService: LocalStorageService =
        services.localStorageService;

    return {

        localStorageService,

    };
};
