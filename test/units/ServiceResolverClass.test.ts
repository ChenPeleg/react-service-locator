import { describe, it, expect, beforeEach } from 'vitest';
import { ServicesProvider, ServiceConstructorClass, ServiceWithSpecificToken, ServiceWithFactoryFunction } from '../../src/ServiceResolverClass';
import { AbstractBaseService } from '../../src/AbstractBaseService';

class TestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesProvider) {
        super(servicesProvider);
    }
}

class AnotherTestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesProvider) {
        super(servicesProvider);
    }
}

describe('ServicesResolver', () => {
    let servicesResolver: ServicesProvider;

    beforeEach(() => {
        servicesResolver = new ServicesProvider([]);
    });

    it('should add and retrieve a service by class', () => {
        servicesResolver = new ServicesProvider([TestService]);
        const service = servicesResolver.getService(TestService);
        expect(service).toBeInstanceOf(TestService);
    });

    it('should throw an error when retrieving a non-existent service', () => {
        expect(() => servicesResolver.getService(TestService)).toThrowError('[ServicesProvider] Service TestService does not exist');
    });

    it('should add and retrieve a service by specific token', () => {
        const token = 'TestServiceToken';
        const serviceWithToken: ServiceWithSpecificToken = { provide: token, useClass: TestService };
        servicesResolver = new ServicesProvider([serviceWithToken]);
        const service = servicesResolver.getService(token as unknown as ServiceConstructorClass);
        expect(service).toBeInstanceOf(TestService);
    });

    it('should add and retrieve a service by factory function', () => {
        const token = 'TestServiceFactoryToken';
        const serviceWithFactory: ServiceWithFactoryFunction = { provide: token, useFactory: (resolver) => new TestService(resolver) };
        servicesResolver = new ServicesProvider([serviceWithFactory]);
        const service = servicesResolver.getService(token as unknown as ServiceConstructorClass);
        expect(service).toBeInstanceOf(TestService);
    });

    it('should add multiple services and retrieve them', () => {
        servicesResolver = new ServicesProvider([TestService, AnotherTestService]);
        const testService = servicesResolver.getService(TestService);
        const anotherTestService = servicesResolver.getService(AnotherTestService);
        expect(testService).toBeInstanceOf(TestService);
        expect(anotherTestService).toBeInstanceOf(AnotherTestService);
    });
});
