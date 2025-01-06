import { AbstractBaseService } from '../abstract/AbstractBaseService.ts';

export type ServiceConstructorClass = new (...args: any[]) => AbstractBaseService;
export type ServiceWithSpecificToken = {
    provide: any;
    useClass: ServiceConstructorClass;
}
export type ServiceWithFactoryFunction = {
    provide: any;
    useFactory: (serviceResolver: ServicesResolver) => ServiceConstructorClass;
}
export type ServiceInjectionToken = ServiceConstructorClass | ServiceWithSpecificToken | ServiceWithFactoryFunction;

export class ServicesResolver {
    private _servicesMap = new Map<any, any>();

    constructor(services: Array<ServiceInjectionToken>) {
        this.addServices(services);
    }

    public getService<T extends ServiceConstructorClass>(service: T): InstanceType<T> {
        if (!this._servicesMap.has(service)) {
            throw new Error(`[ServicesResolver] Service  ${service.name || service} does not exist`);
        }
        return this._servicesMap.get(service) as InstanceType<T>;
    }

    private addServices(services: Array<ServiceInjectionToken>) {
        services.forEach((service) => {
            if ('useClass' in service) {
                this._servicesMap.set(service.provide, new service.useClass(this));
                return;
            } else if ('useFactory' in service) {
                this._servicesMap.set(service.provide, service.useFactory(this));
                return;
            } else if (typeof service === 'function') {
                this._servicesMap.set(service, new service(this));
            }
        });
    }


}
