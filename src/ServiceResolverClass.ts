import { AbstractBaseService } from './AbstractBaseService.ts';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServiceConstructorClass = new (...args: any[]) => AbstractBaseService;
export type ServiceWithSpecificToken = {
    provide: unknown;
    useClass: ServiceConstructorClass;
}
export type ServiceWithFactoryFunction = {
    provide: unknown;
    useFactory: (serviceProvider: ServicesProvider) => AbstractBaseService;
}
export type ServiceInjectionMethod = ServiceConstructorClass | ServiceWithSpecificToken | ServiceWithFactoryFunction;

export class ServicesProvider {
    private _servicesMap = new Map<unknown, InstanceType<ServiceConstructorClass>>();

    constructor(services: Array<ServiceInjectionMethod>) {
        this.addServices(services);
    }

    public getService<T extends ServiceConstructorClass>(service: T): InstanceType<T> {
        if (!this._servicesMap.has(service)) {
            throw new Error(`[ServicesResolver] Service ${service.name || service} does not exist`);
        }
        return this._servicesMap.get(service) as InstanceType<T>;
    }

    private addServices(services: Array<ServiceInjectionMethod>) {
        services.forEach((service) => {
            if ('useClass' in service) {
                this._servicesMap.set(service.provide, new service.useClass(this));
                return;
            } else if ('useFactory' in service) {
                this._servicesMap.set(service.provide, service.useFactory(this));
                return;
            } else if ( service) {
                console.log(service.prototype instanceof AbstractBaseService);
                this._servicesMap.set(service, new service(this));
            } else {
                throw new Error('[ServicesProvider] Invalid service definition');
            }
        });
    }


}
