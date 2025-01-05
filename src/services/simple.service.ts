export class SimpleService {
    public env: string;
    constructor(env : string) {
         this.env = env;
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

}
