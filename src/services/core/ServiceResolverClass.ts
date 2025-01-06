import { AbstractBaseService } from '../abstract/AbstractBaseService.ts';

export type ResourceProviderConstructor = new (...args: any[]) => AbstractBaseService;

export class ServicesResolver {
    private _servicesMap = new Map<any, any>();
    constructor( services: ResourceProviderConstructor[]  ) {
        services.forEach((service) => {
            this.addService(service);
        });
    }
    public addService(service: ResourceProviderConstructor) {
        if (this._servicesMap.has(service)) {
            throw new Error(`Service ${service} already exists`);
        }
        this._servicesMap.set(service, this.initializeServices(service));
    }

    public getService<T extends ResourceProviderConstructor>(service: T): InstanceType<T> {
        if (!this._servicesMap.has(service)) {
            throw new Error(`Service  ${service.name || service} does not exist`);
        }
        return this._servicesMap.get(service) as InstanceType<T>;
    }

    private initializeServices(service: ResourceProviderConstructor) {
        const provider = this;
        return new service(provider);
    }

}
