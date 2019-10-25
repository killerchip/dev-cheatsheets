# HTTP Interceptors

## Preparing the App

The general idea that covers most of the cases is to import the `HttpClientModule` in your root `app.module.ts`. In there you also `provide` the interceptors, in a specific order, and BEFORE providing the `HttpClient` service. 

Interceptors MUST BE provided BEFORE `HttpClient` serivce.

Also it is a good idea to gather up your interceptors into a single file in top level and use this file to import them in `app.module.ts`.

So create an interceptor gathering up file:

**interceptors/index.ts**
```
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagInterceptorService } from './tag-interceptor.service';

export const httpInterceptorProviders = [];
```

And provide them in `app.module.ts` BEFORE the `HttpClient` service.

**app.module.ts**
```
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomePageModule,
        AppCommonModule,
        GithubSearchModule,
        HttpClientModule        //-> import the module here
    ],
    providers: [httpInterceptorProviders, HttpClient],  //-> provide interceptors BEFORE HttpClient
    bootstrap: [AppComponent]
})

```

## Creating Interceptors

Interceptors are services that implement the `HttpInterceptor` interface. So:

1. Implement the `HttpInterceptor` interface
1. define an `intercept` method that actually intercepts the http requests.
1. minimum: pass the original request by calling `next.handle(req)` (interceptor does nothing)

**tag-interceptor.service.ts**
```
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TagInterceptorService implements HttpInterceptor {     //-> 1. implement the interface
    constructor() {}

    intercept(                                                      //-> 2. define the intercep method.
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req);                                    //->3. call next interceptor
    }
}
```

Then import your interceptor into the interceptors provider array:

**interceptors/index.ts**
```
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagInterceptorService } from './tag-interceptor.service';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TagInterceptorService, multi: true },
];
```

## Modifying Requests

ALWAYS modify request and pass them on, after you have CLONED them. (Immutability).

Example of modifying headers:

**tag-interceptor.service.ts**
```
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const newReq = req.clone({                 //-> 1. Clone the request
            headers: req.headers.set(              //-> 2. Modify the new request instance
                'X-Tag', 
                'killerchip Angular blog example'
            )
        })
        return next.handle(newReq);                //-> 3. Return the new request
    }
```

## Modifying Responses

For modifying responses, you can pipe RxJS operators in the `next.handle()` Observable that you return:

Example of logging response with `tap` operator:

**tag-interceptor.service.ts**
```
...
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        //Do you stuff here
        return next.handle(newReq).pipe(        //-> pipe operations here
            tap((response: HttpEvent<any>) => console.log(response))
        );

    }
```