
import { Consumer } from './components/Comsumer.tsx';
import { ConsumerTwo } from './components/ComsumerTwo.tsx';
import { LocalStorageService } from './services/LocalStorageService.ts';
import { DataService } from './services/dataService.ts';
import { ServicesProvider } from '../src/ServicesProvider.tsx';
import { HttpService } from './services/http.service.ts';

function App() {

    return (

        <ServicesProvider
            services={[
                LocalStorageService,
                DataService,
                {
                    provide: HttpService,
                    useFactory: (provider) => new HttpService(provider, 'https://jsonplaceholder.typicode.com'),
                }]}>
            <h1>React Service Locator pattern</h1>
            <Consumer />
            <ConsumerTwo />

        </ServicesProvider>

    );
}

export default App;
