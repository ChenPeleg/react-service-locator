import { createContext, ReactNode, useContext, useReducer } from 'react';
import { ServicesResolver } from '../resolvers/ServiceResolverClass.ts';
import { appConfig } from '../../configuration/appConfig.ts';

const GlobalServicesContext = createContext<ServicesResolver>(
    {} as ServicesResolver
);
const GlobalServiceSetterContext = createContext<any>({});
const DevelopmentDispatchServicesProvider = (
    state: ServicesResolver,
    action: {
        type: 'overriderServices';
        payload: {
            serviceName:
                | 'settingService'
                | 'localStorageService'
                | 'booksDataService'
                | 'userDataService';
            service: any;
        };
    }
): ServicesResolver => {
    switch (action.type) {
        case 'overriderServices':
            const newState = state.clone();
            newState.overrideServices(
                action.payload.serviceName,
                action.payload.service
            );
            return state;
        default:
            return state;
    }
};

export const GlobalServicesProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const servicesSupplierInitialState = new ServicesResolver(
        appConfig.environment
    );
    const [servicesGetters, dispatch] = useReducer(
        DevelopmentDispatchServicesProvider,
        servicesSupplierInitialState
    );

    return (
        <GlobalServicesContext.Provider value={servicesGetters}>
            <GlobalServiceSetterContext.Provider value={dispatch}>
                {children}
            </GlobalServiceSetterContext.Provider>
        </GlobalServicesContext.Provider>
    );
};

export const useServicesContext = () => useContext(GlobalServicesContext);
