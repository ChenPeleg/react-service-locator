import { ServicesResolver } from '../resolvers/ServiceResolverClass.ts';

export abstract class ResourceProvider {
    protected readonly serviceProvider: ServicesResolver;
    protected get provider() {
        return this.serviceProvider;
    }
    protected constructor(serviceProvider: ServicesResolver) {
        this.serviceProvider = serviceProvider;
    }
}
