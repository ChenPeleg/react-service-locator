# React service locator

This is a simple service locator for React, my goals while building this library were:

1. To have a centered place to store all the services that my application needs.
2. Services can use other services (Almost proper Dependency injection).
3. To make it easy to understand so that you can copy and paste it into your project and start using it.

## Copy paste

Yes! You've heard correctly, you can copy and paste the code from the `src` folder into your project and start using it.
The code is very simple and easy to understand.

### Why copy and paste you ask?

You can tweak it to your needs, and you can see how it works.
You don't have to install a library that will be a black box for you.

## Installation

Of course, you can install it via npm:

```shell
npm install react-service-locator
```

### Basic usage

#### Create a service

Create a service by extending the `AbstractBaseService` class:

```typescript 
export class DataService extends AbstractBaseService {
    constructor(provider: ServicesResolver) {
        super(provider);
    }

    getData(url) {
         // fetch data from the url
    }
 
}
```
#### Add the `ServiceLocatorProvider`

Add the `ServiceLocatorProvider` to the root of your application:

```tsx
import React from 'react';

import { ServiceLocatorProvider } from 'react-service-locator';

<ServicesProvider
    services={[  DataService]}>
    <Consumer />

</ServicesProvider>
```

#### Use the useService hook


```tsx
export const Consumer = () => {
    const dataService = useService(DataService);
    
    const [data, setData] = useState(null);
    
    useEffect(() => {
        dataService.getData('https://getmydata.com').then((data) => {
            setData(data);
        });
    }, []);
    
    return <div>
        {data}
       </div>;
};
```
### Service Dependency usage

create a new service that depends on the `DataService`:

```typescript
export class ProfileDataService extends AbstractBaseService {
    constructor(provider: ServicesResolver) {
        super(provider);
    }
   async getProphileData() {
      return   this.getService(DataService).getData('https://getmydata.com/prohile');
    }
 
}
```
