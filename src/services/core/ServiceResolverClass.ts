import { AbstractBaseService } from '../abstract/AbstractBaseService.ts';

export type ServiceConstructorClass = new (...args: any[]) => AbstractBaseService;
export type ServiceWithSpecificToken = {
    provide: any;
    useClass: ServiceConstructorClass;
}

export class ServicesResolver {
    private _servicesMap = new Map<any, any>();

    constructor(services: Array<ServiceConstructorClass | ServiceWithSpecificToken>) {
        this.addServices(services);
    }

    public getService<T extends ServiceConstructorClass>(service: T): InstanceType<T> {
        if (!this._servicesMap.has(service)) {
            throw new Error(`[ServicesResolver] Service  ${service.name || service} does not exist`);
        }
        return this._servicesMap.get(service) as InstanceType<T>;
    }

    private addServices(services: Array<ServiceConstructorClass | ServiceWithSpecificToken>) {
        services.forEach((service) => {
            if ('useClass' in service) {
                this._servicesMap.set(service.provide, this.initializeServices(service.useClass));
                return;
            } else {
                this._servicesMap.set(service, this.initializeServices(service));
            }
        });
    }



    private initializeServices(service: ServiceConstructorClass) {
        const provider = this;
        return new service(provider);
    }

}
