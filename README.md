[![Status badge](https://github.com/ChenPeleg/react-services-locator/actions/workflows/ci-test.yml/badge.svg?branch=main)](https://github.com/ChenPeleg/react-services-locator/actions/?query=branch%3Amain)
[![npm version](https://badge.fury.io/js/react-services-locator.svg)](https://badge.fury.io/js/react-services-locator)
[![Licence](https://img.shields.io/github/license/ChenPeleg/react-services-locator.svg?style=flat&colorA=18181B&colorB=28CF8D)](https://github.com/ChenPeleg/react-services-locator/LICENCE)


# React services locator
 
A very simple (yet effective) implementation of the [service locator pattern](https://en.wikipedia.org/wiki/Service_locator_pattern) for React 18+ using Hooks, Context API

## Features

This utility is a simple service locator for React applications.

This is a simple service locator for React, my goals while building this library were:

1. To have a centered place to store all the services that my application needs.
2. Services can use other services (Almost proper Dependency injection).
3. To make it easy to understand so that you can copy and paste it into your project and start using it.

## How to use
## Recommended: Copy and paste 📋

You can directly copy and paste the code from the `src` folder into your project and start using it. The code is designed to be simple and easy to read.

### Why copy and paste you ask?

1. You can tweak it to your needs
2. you can see exactly how it works.
3. You don't have to install a library that will make you worry about support and updates.
4. It's just 4 files all together, about 100 lines of (relatively readable) typescript code.

If you're not convinced, you can install it via npm:

##  Npm Installation

Of course, you can install it via npm:

```shell
npm install react-services-locator
```

### Basic usage

#### Create a service

Create a service by extending the `AbstractBaseService` class:

```typescript 
import { AbstractBaseService, ServicesResolver } from 'react-services-locator'
export class DataService extends AbstractBaseService {
    constructor(provider: ServicesResolver) {
        super(provider);
    }
    getData(url) {
         // fetch data from the url
    }
}
```
Note that the class should extend the `AbstractBaseService` class and have a constructor that receives the `ServicesResolver` as an argument.


#### Add the `ServiceLocatorProvider`

Add the `ServiceLocatorProvider` to the root of your application:

```tsx
import React from 'react';

import { ServiceLocatorProvider } from 'react-services-locator';

<ServicesProvider
    services={[DataService]}>
    <Consumer />
</ServicesProvider>
```

#### Use the useService hook

In your components, use the `useService` hook to get the service instance:

```tsx
import { useService  } from 'react-services-locator'

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
The purpose of the service locator is to allow services to depend on other services.
To demonstrate this, let's create a new service that depends on the `DataService`:

```typescript
import { DataService } from './dataService';
import { AbstractBaseService  } from 'react-services-locator'
export class ProfileDataService extends AbstractBaseService {
    constructor(provider: ServicesResolver) {
        super(provider);
    }

    async getProphileData() {
      // use this servicesProvider.getService to get other services  
      const dataService =  this.servicesProvider.getService(DataService)
      dataService.getData('https://getmydata.com/prohile');
    }
}
```

Notice the `AbstractBaseService` class has a `servicesProvider` property that you can use to get other services. 
This property is injected by the `ServiceLocatorProvider`, and has only one method: `getService`.

As you can see, the `ProfileDataService` depends on the `DataService` service.
This is not classic Dependency Injection, but it's close enough:
The main difference is that it's lazy-loaded, so you don't have to worry about the order of the services.

> [!IMPORTANT] 
> This also means you can't use get Other services **inside the service class constructor**. Because the services are not yet registered.


Add the `ProfileDataService` to the `ServiceLocatorProvider`:

```tsx
import React from 'react';
import { ServicesProvider } from 'react-services-locator';

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

### Advanced usage - useClass (mainly for testing)

You can use the `ServiceLocatorProvider` to provide a different service implementation for testing purposes:

```tsx
import React from 'react';
import { ServicesProvider } from 'react-services-locator';

export class MockDataService extends AbstractBaseService {
    constructor(provider: ServicesResolver) {
        super(provider);
    }
    getData(url) {
        return Promise.resolve('mocked data');
    }
}
// for testing purposes
<ServicesProvider
    services={[{ provide: DataService, useClass : MockDataService },ProfileDataService]}>
    <Consumer />
</ServicesProvider>
```

In this example, the `DataService` service is replaced with the `MockDataService` service.
The Consumer component will now use the `MockDataService` service instead of the `DataService` service.


### Advanced usage - Factory function (for complex initialization)

You can use a factory function to create a service instance, this can be useful when you need to pass arguments to the service constructor:

```tsx
import React from 'react';
import { ServicesProvider } from 'react-services-locator';

export class HttpService extends AbstractBaseService {
    constructor(provider: ServicesResolver, baseUrl: string) {
        super(provider);
        this.baseUrl = url;
    } 
}

<ServicesProvider
    services={[{
        provide: HttpService,
        useFactory: (provider) => new HttpService(provider, 'https://baseurl.com'),
    }]}>
    <Consumer />
</ServicesProvider>
```
> [!IMPORTANT] 
> Notice that the factory function receives the `ServicesResolver` as a first argument, so all other arguments should come after it.


## Caveats

### Services are not available in the service constructor

You can't use get Other services **inside the service class constructor**. Because the services are not yet registered:

```typescript
import { DataService } from './dataService';
import { AbstractBaseService  } from 'react-services-locator'
export class ProfileDataService extends AbstractBaseService {
    constructor(provider: ServicesResolver) {
        super(provider);
        const dataService =  this.servicesProvider.getService(DataService); 
        // ❌ error: Service DataService does not exist 
    }
}
```
### No support for multiple ServiceProviders

You can use multiple service providers that some are children of others etc. But, this library was build for **only one global service provider**.

So if you would build something like this:
```tsx
<ServicesProvider services={[FirstService]}>>
    <ServicesProvider
        services={[SecondService]}>
        <Consumer />
    </ServicesProvider>
</ServicesProvider>
```

The `Consumer` will not be able to get the second service because of how React Context works:

```tsx
export const Consumer = () => {
    const firstService = useService(FirstService);
    // ❌ error: Service FirstService does not exist 
    return <div>
      
       </div>;
};
```
So just use it as one global service provider. 

## Inspiration

This library was inspired by the [Angular service locator](https://angular.io/guide/dependency-injection-providers) and the [React hooks](https://reactjs.org/docs/hooks-intro.html) API.
And also [react-service-locator](https://github.com/rhyek/react-service-locator) library.
