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

### How to use

#### Create a service

Create a service by extending the `AbstractBaseService` class:

```typescript 
    export class DataService extends AbstractBaseService {
        constructor(provider: ServicesResolver) {
            super(provider);
        }
        setItem(key, value) {
            localStorage.setItem(key, value);
        }
        getItem(key) {
            return localStorage.getItem(key);
        }
    }
```

Add the `ServiceLocatorProvider` to the root of your application:

```jsx
import React from 'react';

import { ServiceLocatorProvider } from 'react-service-locator';
    <ServicesProvider
            services={[
                LocalStorageService,
                DataService ]}> 
            <Consumer /> 

        </ServicesProvider>
```


