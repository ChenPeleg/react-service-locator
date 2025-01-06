# React service locator

This version is not stable yet, I'm still working on it.

## Features

This utility is a simple service locator for React applications.

This is a simple service locator for React, my goals while building this library were:

1. To have a centered place to store all the services that my application needs.
2. Services can use other services (Almost proper Dependency injection).
3. To make it easy to understand so that you can copy and paste it into your project and start using it.

## Copy paste

Yes! You've read correctly, you can copy and paste the code from the `src` folder into your project and start using it.
The code is very simple and easy to understand.

### Why copy and paste you ask?

You can tweak it to your needs, and you can see how it works.
You don't have to install a library that will be a black box for you, or worry about support and updates.
It's just 4 files all together, about 100 lines of typescript code.

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
    services={[DataService]}>
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
import { DataService } from './dataService';

export class ProfileDataService extends AbstractBaseService {
    constructor(provider: ServicesResolver) {
        super(provider);
    }

    async getProphileData() {
      const dataService =  this.servicesProvider.getService(DataService)
      dataService.getData('https://getmydata.com/prohile');
    }
}
```

Notice the `AbstractBaseService` class has a `servicesProvider` property that you can use to get other services.

As you can see, the `ProfileDataService` depends on the `DataService` service.
This is not classic Dependency Injection, but it's close enough:
The main difference is that it's lazy-loaded, so you don't have to worry about the order of the services.

> This means you can't use get Other services inside the service class constructor. Because the services are not yet registered.


Add the `ProfileDataService` to the `ServiceLocatorProvider`:

```tsx
import React from 'react';
import { ServiceLocatorProvider } from 'react-service-locator';

<ServicesProvider
    services={[DataService,ProfileDataService]}>
    <Consumer />
</ServicesProvider>
```

And use the hook in the `Consumer` component:

 
```tsx
export const Consumer = () => {
    const [dataService, prophileDataService] = useService([DataService,ProfileDataService]);
    
    const [data, setData] = useState(null);
    const [prophileData, setProphileData] = useState(null);
    useEffect(() => {
        dataService.getData('https://getmydata.com').then((data) => {
            setData(data);
        });
        prophileDataService.getProphileData().then((data) => {
            setProphileData(data);
        });
    }, []);
    
    return <div>
        {data}
        {prophileData}
       </div>;
};
```


## Todo

- add tests
- add more examples
- add more documentation about complex usage


## Inspiration

This library was inspired by the [Angular service locator](https://angular.io/guide/dependency-injection-providers) and the [React hooks](https://reactjs.org/docs/hooks-intro.html) API.
And also [react-service-locator](https://github.com/rhyek/react-service-locator) library.
