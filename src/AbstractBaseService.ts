import { ServicesResolver } from './ServiceResolverClass.ts';

export abstract class AbstractBaseService {
    protected readonly _servicesProvider: ServicesResolver;
    protected get servicesProvider() {
        return this._servicesProvider;
    }
    protected constructor(serviceProvider: ServicesResolver) {
        this._servicesProvider = serviceProvider;
    }
}
