import { AbstractBaseService } from './abstract/AbstractBaseService.ts';
import { ServicesResolver } from './resolvers/ServiceResolverClass.ts';

export class LocalStorageService extends AbstractBaseService {
    public static readonly STYLE_SETTINGS = 'app_sorcery_style_settings';
    public static readonly SHOW_RECOMMENDED_FONTS =
        'app_sorcery_show_recommended_fonts';
    public static readonly USER_SETTINGS = 'app_sorcery_user_settings';
    public static readonly USER_ADVENTURE_SHEET =
        'app_sorcery_user_adventure_sheet';
    public static readonly USER_ADVENTURE_ADDITIONAL_DATA =
        'app_sorcery_user_additional_data';

    private _localStorage: Storage;

    constructor(provider: ServicesResolver) {
        super(provider);
        this._localStorage = localStorage;
    }

    getObjectOrNull(key: string) {
        try {
            const item = this._localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    }

    storeObjectForLimitedTime(key: string, value: any, timeInMinutes: number) {
        const stored = {
            value: value,
            expires: Date.now() + timeInMinutes * 60 * 1000,
        };
        this.setItem(key, JSON.stringify(stored));
    }
    getObjectForLimitedTime(key: string) {
        const stored = this.getObjectOrNull(key);
        if (!stored) {
            return null;
        }
        if (stored.expires < Date.now()) {
            this.removeItem(key);
            return null;
        }
        return stored.value;
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
