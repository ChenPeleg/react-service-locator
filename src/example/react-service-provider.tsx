import React, { useContext } from 'react';
import {
    Provider,
    ServiceContainerProps,
    ServiceFor,
    UseClassProvider,
    UseExistingProvider,
    UseFactoryProvider,
    UseValueProvider,
} from './react-service-provider.types.ts';
import { ServiceProviderUtils } from './react-service-provider-utils.tsx';

const UNINSTANTIATED = Symbol.for('uninstantiated');


export class ServiceContainerRegistry {
    private providers = new Map<any, any>();

    constructor(
        private readonly parentServiceContainerRegistries: ServiceContainerRegistry | null,
    ) {
        this.parentServiceContainerRegistries = parentServiceContainerRegistries;
        this.providers = new Map();
    }

    get<T, R = ServiceFor<T>>(serviceToken: T): R {

        if (this.providers.has(serviceToken)) {
            const serviceGetterFn = this.providers.get(serviceToken) as () => R;
            try {
                return serviceGetterFn();
            } catch (err) {
                console.error(
                    `[react-service-container] Provider for ${String(
                        serviceToken,
                    )} threw an error. ` +
                    'Please check the error output below for more information.',
                );
                throw err;
            }
        }

        if (this.parentServiceContainerRegistries != null) {
            // This will recursively call each parent registry, until the base environment is hit in
            // which case the base case is thrown below.
            return this.parentServiceContainerRegistries.get(serviceToken);
        }

        const errorMsg =
            `[react-service-container] Could not find provider for token ${String(
                serviceToken,
            )}. ` +
            'Think of this as a "missing variable" error. Ensure that in one of your parent ' +
            'service containers, you have configured your providers array to provide a value for this type.';
        throw new Error(errorMsg);
    }


    add<T>(provider: Provider<T>) {
        if (!('provide' in provider)) {
            const errorMsg =
                `[react-service-provider] Missing "provide" key in object with key(s): ${ServiceProviderUtils.stringifyKeys(
                    provider,
                )}. ` +
                'Each servicesProvider must specify a "provide" key as well as one of the correct use* values.';
            throw new Error(errorMsg);
        }

        let instance: ServiceFor<T> = UNINSTANTIATED as any;

        const initFn = () => {
            if (instance !== UNINSTANTIATED) {
                return instance;
            }

            let init;
            switch (true) {
                case 'useValue' in provider:
                    const value = (provider as UseValueProvider<T>).useValue;
                    init = () => value;
                    break;
                case 'useClass' in provider:
                    const Ctor = (provider as UseClassProvider<T>).useClass;
                    init = () => new Ctor();
                    break;
                case 'useFactory' in provider:
                    init = (provider as UseFactoryProvider<T>).useFactory;
                    break;
                case 'useExisting' in provider:
                    const resolvedAlias = (provider as UseExistingProvider<T>)
                        .useExisting;
                    init = () => {
                        try {
                            return this.get(resolvedAlias);
                        } catch (_) {
                            const errorMessage =
                                `[react-service-container] Failed alias lookup for useExisting provider ${String(
                                    provider,
                                )}. ` +
                                'It looks like you passed a token to `useExisting` that was not registered as a servicesProvider. ' +
                                'Ensure that the token given is registered *before* the alias is referenced. ' +
                                'If the value reference by the alias is provided within the same providers array as the alias, ' +
                                'ensure that it comes before the alias in the providers array.';
                            throw new Error(errorMessage);
                        }
                    };
                    break;
                default:
                    const errorMsg =
                        `[create-service-container] Provider missing proper use* value in key(s): ${ServiceProviderUtils.stringifyKeys(
                            provider,
                            (k) => k !== 'provide',
                        )}. ` +
                        'Possible values are: ["useValue", "useClass", "useFactory", "useExisting"]';
                    throw new Error(errorMsg);
            }

            instance = init();
            return instance;
        };

        this.providers.set((provider as any).provide, initFn);
    }

}


export const ServiceContainerContext = React.createContext<ServiceContainerRegistry | null>(
    null,
);


export function ServiceContainer({
                                     providers,
                                     children,
                                 }: ServiceContainerProps) {
    const parent = useContext(ServiceContainerContext);
    const registry = ServiceProviderUtils.buildRegistry(providers, parent);

    return (
        <ServiceContainerContext.Provider value={registry}>
            {children}
        </ServiceContainerContext.Provider>
    );
}

export function useService<T, R = ServiceFor<T>>(serviceToken: T): R {

    const container = useContext(ServiceContainerContext);

    if (!container) {
        const errorMsg =
            '[react-service-container] Could not find service container context. It looks like you may have used the useService() hook ' +
            'in a component that is not a child of a <ServiceContainer>...</>. Take a look at your component tree ' +
            'and ensure that somewhere in the hierarchy before this component is rendered, there is a <ServiceContainer> ' +
            'available';
        throw new Error(errorMsg);
    }
    return container.get<T, R>(serviceToken);
}

