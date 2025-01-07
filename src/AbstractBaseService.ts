import { ServicesProvider } from './ServiceResolverClass.ts';

export abstract class AbstractBaseService {
    protected readonly _servicesProvider: ServicesProvider;
    protected get servicesProvider() {
        return this._servicesProvider;
    }
    protected constructor(serviceProvider: ServicesProvider) {
        this._servicesProvider = serviceProvider;
    }
}
