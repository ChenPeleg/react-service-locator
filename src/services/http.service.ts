
export class HttpService {
    public baseUrl: string;
    constructor(baseUrl : string) {
         this.baseUrl = baseUrl;
    }
    getStrings() {
        return ['a', 'b', 'c'];
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

}
