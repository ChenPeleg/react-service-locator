import './App.css';
import { Consumer } from './components/Comsumer.tsx';
import { ConsumerTwo } from './components/ComsumerTwo.tsx';
import { LocalStorageService } from './services/LocalStorageService.ts';
import { DataService } from './services/dataService.ts';
import { GlobalServicesProvider } from './services/context/GlobalServicesContext.tsx';

function App() {

    return (

        <GlobalServicesProvider services={[LocalStorageService, DataService]}>
            <h1>React Service Locator pattern</h1>
            <Consumer />
            <ConsumerTwo />


        </GlobalServicesProvider>

    );
}

export default App;
