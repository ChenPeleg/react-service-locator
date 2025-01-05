import { ResourceProvider } from '../abstract/ResourceProvider.ts';

export type ResourceProviderConstructor = new (...args: any[]) => ResourceProvider;

export class ServicesResolver {

    private static _instance: ServicesResolver;
    private readonly _environment:
        | 'test'
        | 'development'
        | 'production'
        | string;
    private _servicesMap = new Map<any, any>();

    constructor({
                    environment,
                    services,
                }: { environment: string, services: ResourceProviderConstructor[] }) {
        this._environment = environment;
        services.forEach((service) => {
            this.addService(service);
        });
    }

    public get environment() {
        return this._environment;
    }

    public static SingletonInstance({
                                        environment,
                                        services,
                                    }: { environment: string, services: ResourceProviderConstructor[] }): ServicesResolver {

        return (
            this._instance ||
            (this._instance = new ServicesResolver({
                environment,
                services,
            }))
        );
    }

    public addService(service: ResourceProviderConstructor) {
        if (this._servicesMap.has(service)) {
            throw new Error(`Service ${service} already exists`);
        }
        this._servicesMap.set(service, this.initializeServices(service));
    }
    public getService(service: ResourceProviderConstructor) {
        if (!this._servicesMap.has(service)) {
            throw new Error(`Service ${service} does not exist`);
        }
        console.log(this._servicesMap.get(service) )
        return this._servicesMap.get(service);
    }

    private initializeServices(service: ResourceProviderConstructor) {
        const provider = this;
        return new service(provider);
    }

}
