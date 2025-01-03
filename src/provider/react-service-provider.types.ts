import React from 'react';
import { ServiceContainerRegistry } from './react-service-provider.tsx';


export type ServiceFor<T> = T extends new (...args: any[]) => infer R ? R : any;

export interface UseValueProvider<T> {
    provide: T;
    useValue: ServiceFor<T>;
}

export interface UseClassProvider<T> {
    provide: T;
    useClass: new (...args: any) => ServiceFor<T>;
}

export interface UseFactoryProvider<T> {
    provide: T;
    useFactory(): ServiceFor<T>;
}

export interface UseExistingProvider<T, R = T> {
    provide: T;
    useExisting: R;
}

export type Provider<T> =
    | (new (...args: any[]) => any)
    | UseValueProvider<T>
    | UseClassProvider<T>
    | UseFactoryProvider<T>
    | UseExistingProvider<T>;

export type Providers = Array<Provider<any>>;


export type ServiceContainerRegistryReadonlyProxy = Pick<
    ServiceContainerRegistry,
    "get"
>;


export type ServiceContainerProps = React.PropsWithChildren<{
    providers: Providers;
}>;


