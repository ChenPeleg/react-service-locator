import { describe, it, expect, beforeEach } from 'vitest';
import { AbstractBaseService } from '../../src';
import { ServicesResolver } from '../../src';

class TestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesResolver) {
        super(servicesProvider);
    }
    public getServiceProvider() {
        return this.servicesResolver;
    }
}

describe('AbstractBaseService', () => {
    let servicesResolver: ServicesResolver;
    let testService: TestService;

    beforeEach(() => {
        servicesResolver = new ServicesResolver([]);
        testService = new TestService(servicesResolver);
    });

    it('should initialize with a services provider', () => {
        expect(testService.getServiceProvider()).toBe(servicesResolver);
    });

    it('should return the correct services provider', () => {
        expect(testService.getServiceProvider()).toBeInstanceOf(ServicesResolver);
    });
});
