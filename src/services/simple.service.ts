import { AbstractBaseService } from './abstract/AbstractBaseService.ts';
import { LocalStorageService } from './LocalStorageService.ts';
import { ServicesResolver } from './core/ServiceResolverClass.ts';

export class SimpleService extends AbstractBaseService {
    public env: string;
    constructor(provider: ServicesResolver) {
        super(provider );
        this.env =  'development';
    }
    getFromLocalStorage(key: string): string | null {
        const storageService =  this.servicesProvider.getService(LocalStorageService);
        return storageService.getItem(key);
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

}
