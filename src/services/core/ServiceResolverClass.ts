import { AbstractBaseService } from '../abstract/AbstractBaseService.ts';

export type ServiceConstructorClass = new (...args: any[]) => AbstractBaseService;

export class ServicesResolver {
    private _servicesMap = new Map<any, any>();
    constructor( services: ServiceConstructorClass[]  ) {
        services.forEach((service) => {
            this.addService(service);
        });
    }
    public addService(service: ServiceConstructorClass) {
        if (this._servicesMap.has(service)) {
            throw new Error(`Service ${service} already exists`);
        }

        this._servicesMap.set(service, this.initializeServices(service));
    }

    public getService<T extends ServiceConstructorClass>(service: T): InstanceType<T> {
        if (!this._servicesMap.has(service)) {
            throw new Error(`[ServicesResolver] Service  ${service.name || service} does not exist`);
        }
        return this._servicesMap.get(service) as InstanceType<T>;
    }

    private initializeServices(service: ServiceConstructorClass) {
        const provider = this;
        return new service(provider);
    }

}
