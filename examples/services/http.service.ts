import { AbstractBaseService } from '../../src/AbstractBaseService.ts';
import { ServicesResolver } from '../../src/ServiceResolverClass.ts';


export class HttpService extends AbstractBaseService {
    public baseUrl: string;

    constructor(provider: ServicesResolver, baseUrl: string) {
        super(provider);
        this.baseUrl = baseUrl;
    }


    async get<T>(url: string): Promise<T> {
        const response = await fetch(this.baseUrl + url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

}
