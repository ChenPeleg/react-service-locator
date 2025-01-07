import { describe, it, expect, beforeEach } from 'vitest';
import { ServicesProviderContext } from '../../src';
import { ServicesResolver } from '../../src';
import { useService } from '../../src';
import { AbstractBaseService } from '../../src';
import React from 'react';
import { renderHook } from '@testing-library/react';

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

describe('useService', () => {
    let servicesResolver: ServicesResolver;

    beforeEach(() => {
        servicesResolver = new ServicesResolver([TestService, AnotherTestService]);
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
                // @ts-expect-error Testing non-existent service
                class NonExistentService extends AbstractBaseService {}), { wrapper });
        } catch (error) {
            expect(error).toBeDefined();
            // @ts-expect-error Testing error message
            expect(error.message).toBe('[ServicesResolver] Service NonExistentService does not exist');
        }
    });
});
