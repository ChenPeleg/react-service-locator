import { ServicesResolver } from './ServiceResolverClass.ts';

export abstract class AbstractBaseService {
    protected readonly _servicesResolver: ServicesResolver;
    protected get servicesResolver() {
        return this._servicesResolver;
    }
    protected constructor(servicesResolver: ServicesResolver) {
        this._servicesResolver = servicesResolver;
    }
}
