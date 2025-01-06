import { AbstractBaseService } from '../../src/AbstractBaseService.ts';
import { ServicesResolver } from '../../src/ServiceResolverClass.ts';


export class LocalStorageService extends AbstractBaseService {
    public static readonly STYLE_SETTINGS = 'app_sorcery_style_settings';
    protected _localStorage: Storage;
    constructor(provider: ServicesResolver) {
        super(provider);
        this._localStorage = localStorage;
    }

    getItem(key: string) {
        return this._localStorage.getItem(key);
    }
    setItem(keyName: string, keyValue: string) {
        this._localStorage.setItem(keyName, keyValue);
    }

    removeItem(key: string) {
        this._localStorage.removeItem(key);
    }
}
