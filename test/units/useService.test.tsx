import { describe, it, expect, beforeEach } from 'vitest';
import { ServicesProviderContext } from '../../src/ServicesProvider';
import { ServicesProvider } from '../../src/ServiceResolverClass';
import { useService } from '../../src/useService';
import { AbstractBaseService } from '../../src/AbstractBaseService';
import React from 'react';
import { renderHook } from '@testing-library/react';

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

describe('useService', () => {
    let servicesResolver: ServicesProvider;

    beforeEach(() => {
        servicesResolver = new ServicesProvider([TestService, AnotherTestService]);
    });

    it('should retrieve a service by class', () => {
        const wrapper = ({ children }: {
            children: React.ReactNode;
        }) => (
            <ServicesProviderContext.Provider value={servicesResolver}>
                {children}
            </ServicesProviderContext.Provider>
        );

        const { result } = renderHook(() => useService(TestService), { wrapper });
        expect(result.current).toBeInstanceOf(TestService);
    });

    it('should retrieve multiple services by class array', () => {
        const wrapper = ({ children }: {
            children: React.ReactNode;
        }) => (
            <ServicesProviderContext.Provider value={servicesResolver}>
                {children}
            </ServicesProviderContext.Provider>
        );

        const { result } = renderHook(() => useService([TestService, AnotherTestService]), { wrapper });
        expect(result.current[0]).toBeInstanceOf(TestService);
        expect(result.current[1]).toBeInstanceOf(AnotherTestService);
    });

    it('should throw an error when retrieving a non-existent service', () => {
        const wrapper = ({ children }: {
            children: React.ReactNode;
        }) => (
            <ServicesProviderContext.Provider value={servicesResolver}>
                {children}
            </ServicesProviderContext.Provider>
        );

        try {
            renderHook(() => useService(
                // @ts-ignore
                class NonExistentService extends AbstractBaseService {}), { wrapper });
        } catch (error) {
            expect(error).toBeDefined();
            // @ts-ignore
            expect(error.message).toBe('[ServicesProvider] Service NonExistentService does not exist');
        }
    });
});
