import { ServicesResolver } from '../resolvers/ServiceResolverClass.ts';

export abstract class ResourceProvider {
    protected readonly serviceProvider: ServicesResolver;
    protected get services() {
        return this.serviceProvider;
    }
    protected constructor(provider: ServicesResolver) {
        this.serviceProvider = provider;
    }
}
