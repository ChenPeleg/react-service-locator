import { ResourceProvider } from './abstract/ResourceProvider.ts';
import { ServicesResolver } from './resolvers/ServiceResolverClass.ts';
import { LocalStorageService } from './LocalStorageService.ts';

export class SimpleService extends ResourceProvider {
    public env: string;
    constructor(provider: ServicesResolver) {
        super(provider );
        this.env = provider .environment;
    }
    getFromLocalStorage(key: string): string | null {
        const storageService =  this.provider.getService(LocalStorageService);
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
