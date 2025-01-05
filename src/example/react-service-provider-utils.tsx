import { Providers, UseClassProvider } from './react-service-provider.types.ts';
import { ServiceContainerRegistry } from './react-service-provider.tsx';

export class ServiceProviderUtils {
   static  buildRegistry(
        providers: Providers,
        parent: ServiceContainerRegistry | null,
    ) {
        const registry = new ServiceContainerRegistry(parent);
       ServiceProviderUtils.addProviders(registry, providers);
        return registry;
    }
    static  addProviders(
        registry: ServiceContainerRegistry,
        providers: Providers,
    ) {
        ServiceProviderUtils.normalize(providers).forEach((provider) => {
            registry.add(provider);
        });
    }
    static normalize(providers: Providers): Providers {
        return providers.map((provider) => {
            const assumeClassShorthand = typeof provider === 'function';
            if (assumeClassShorthand) {
                return {
                    provide: provider,
                    useClass: provider as UseClassProvider<any>['useClass'],
                };
            }
            return provider;
        });
    }
    static stringifyKeys(obj: {}, filter = (_k: string) => true) {
        return Object.keys(obj)
            .filter(filter)
            .map((k) => `"${k}"`)
            .join(', ');
    }

}




