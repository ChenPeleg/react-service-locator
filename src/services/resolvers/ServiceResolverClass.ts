import { LocalStorageService } from '../LocalStorageService.ts';

export class ServicesResolver {
    private static _instance: ServicesResolver;
    private readonly environment:
        | 'test'
        | 'development'
        | 'production'
        | string;
    private localStorageServiceImp: LocalStorageService;

    constructor(environment: string) {
        this.environment = environment;
        const implementations = this.mapServicesByEnvironment(environment);
        this.localStorageServiceImp = implementations.localStorageServiceImp;
    }

    get localStorageService(): LocalStorageService {
        return this.localStorageServiceImp;
    }

    public static SingletonInstance(environment: string): ServicesResolver {
        // Do you need arguments? Make it a regular static method instead.
        return (
            this._instance ||
            (this._instance = new ServicesResolver(environment))
        );
    }

    public clone(): ServicesResolver {
        const clonedInstance = new ServicesResolver(this.environment);
        clonedInstance.localStorageServiceImp = this.localStorageServiceImp;
        return clonedInstance;
    }

    public overrideServices(
        serviceName:
            | 'localStorageService',
        service: any,
    ) {
        if (this.environment === 'production') {
            throw new Error(
                'Cannot change services implementation in production',
            );
        }
        switch (serviceName) {

            case 'localStorageService':
                this.localStorageServiceImp = service;
                break;

            default:
                throw new Error(`Invalid service name ${serviceName}`);
        }
    }

    private mapServicesByEnvironment(environment: string) {

        let localStorageServiceImp;

        const provider = this;
        switch (environment) {
            case 'test':

                localStorageServiceImp = new LocalStorageService(provider);


                break;
            case 'development':
                localStorageServiceImp = new LocalStorageService(provider);


                break;
            case 'production':
                localStorageServiceImp = new LocalStorageService(provider);

                break;
            default:
                throw new Error(`Invalid environment ${environment}`);
        }
        return {

            localStorageServiceImp,

        };
    }
}
