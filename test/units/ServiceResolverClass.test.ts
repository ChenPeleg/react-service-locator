import { describe, it, expect, beforeEach } from 'vitest';
import { ServicesResolver, ServiceConstructorClass, ServiceWithSpecificToken, ServiceWithFactoryFunction } from '../../src/ServiceResolverClass';
import { AbstractBaseService } from '../../src';

class TestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesResolver) {
        super(servicesProvider);
    }
}

class AnotherTestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesResolver) {
        super(servicesProvider);
    }
}

describe('ServicesResolver', () => {
    let servicesResolver: ServicesResolver;

    beforeEach(() => {
        servicesResolver = new ServicesResolver([]);
    });

    it('should add and retrieve a service by class', () => {
        servicesResolver = new ServicesResolver([TestService]);
        const service = servicesResolver.getService(TestService);
        expect(service).toBeInstanceOf(TestService);
    });

    it('should throw an error when retrieving a non-existent service', () => {
        expect(() => servicesResolver.getService(TestService)).toThrowError('[ServicesResolver] Service TestService does not exist');
    });

    it('should add and retrieve a service by specific token', () => {
        const token = 'TestServiceToken';
        const serviceWithToken: ServiceWithSpecificToken = { provide: token, useClass: TestService };
        servicesResolver = new ServicesResolver([serviceWithToken]);
        const service = servicesResolver.getService(token as unknown as ServiceConstructorClass);
        expect(service).toBeInstanceOf(TestService);
    });

    it('should add and retrieve a service by factory function', () => {
        const token = 'TestServiceFactoryToken';
        const serviceWithFactory: ServiceWithFactoryFunction = { provide: token, useFactory: (resolver) => new TestService(resolver) };
        servicesResolver = new ServicesResolver([serviceWithFactory]);
        const service = servicesResolver.getService(token as unknown as ServiceConstructorClass);
        expect(service).toBeInstanceOf(TestService);
    });

    it('should add multiple services and retrieve them', () => {
        servicesResolver = new ServicesResolver([TestService, AnotherTestService]);
        const testService = servicesResolver.getService(TestService);
        const anotherTestService = servicesResolver.getService(AnotherTestService);
        expect(testService).toBeInstanceOf(TestService);
        expect(anotherTestService).toBeInstanceOf(AnotherTestService);
    });
});
