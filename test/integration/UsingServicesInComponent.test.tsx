import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AbstractBaseService } from '../../src/AbstractBaseService';
import { useService } from '../../src/useService';
import { ServicesProvider, ServicesResolver } from '../../src';

class TestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesResolver) {
        super(servicesProvider);
    }
    getValue() {
        return 'TestService Value';
    }
}

class AnotherTestService extends AbstractBaseService {
    constructor(servicesProvider: ServicesResolver) {
        super(servicesProvider);
    }
    getValue() {
        return 'AnotherTestService Value';
    }
}

const TestComponent = () => {
    const testService = useService(TestService);
    return <div>{testService.getValue()}</div>;
};

const MultipleServicesComponent = () => {
    const [testService, anotherTestService] = useService([TestService, AnotherTestService]);
    return (
        <div>
            <div>{testService.getValue()}</div>
            <div>{anotherTestService.getValue()}</div>
        </div>
    );
};

describe('ServicesProvider Integration Tests', () => {

    it('should provide a single service to a component', () => {
        render(
            <ServicesProvider services={[TestService]}>
                <TestComponent />
            </ServicesProvider>
        );
        expect(screen.getByText('TestService Value')).toBeTruthy();
    });

    it('should provide multiple services to a component', () => {
        render(
            <ServicesProvider services={[TestService, AnotherTestService]}>
                <MultipleServicesComponent />
            </ServicesProvider>
        );
        expect(screen.getByText('TestService Value')).toBeTruthy();
        expect(screen.getByText('AnotherTestService Value')).toBeTruthy();
    });

    it('should throw an error when a non-existent service is used', () => {
        const NonExistentServiceComponent = () => {
            try {
                useService(
                    // @ts-expect-error Testing non-existent service
                    class NonExistentService extends AbstractBaseService {});
            } catch (error) {
                // @ts-expect-error Testing error message
                return <div>{error.message}</div>;
            }
            return null;
        };

        render(
            <ServicesProvider services={[TestService, AnotherTestService]}>
                <NonExistentServiceComponent />
            </ServicesProvider>
        );
        expect(screen.getByText('[ServicesProvider] Service NonExistentService does not exist')).toBeTruthy();
    });
});
