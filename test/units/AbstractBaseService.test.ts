import { describe, it, expect, beforeEach } from 'vitest';
import { AbstractBaseService } from '../../src/AbstractBaseService';
import { ServicesProvider } from '../../src/ServiceResolverClass';

class TestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesProvider) {
        super(servicesProvider);
    }
    public getServiceProvider() {
        return this.servicesProvider;
    }
}

describe('AbstractBaseService', () => {
    let servicesResolver: ServicesProvider;
    let testService: TestService;

    beforeEach(() => {
        servicesResolver = new ServicesProvider([]);
        testService = new TestService(servicesResolver);
    });

    it('should initialize with a services provider', () => {
        expect(testService.getServiceProvider()).toBe(servicesResolver);
    });

    it('should return the correct services provider', () => {
        expect(testService.getServiceProvider()).toBeInstanceOf(ServicesProvider);
    });
});
