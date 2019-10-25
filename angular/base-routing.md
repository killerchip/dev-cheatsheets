# Base routing

Right after initializing an Angular project, I prefer to setup the top level routing. This way more features can be easily added later.

One of the first components, although 'dummy' ones, are the a Home Page, and the 'Not Found' page.

## Creating Home Page

I preffer to use Angular modules for hosting my services, modules, etc. This way the app becomes much more easily scalable.

So first create the `HomePageModule`.
```
ng generate module home-page
```

And import it in:

**app.module.ts**
```
...
import { HomePageModule } from './home-page/home-page.module';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, HomePageModule],
...
```

Then create the `HomePageComponent`.
```
ng generate component home-page/home-page
```

## Create Not Found Page

I like the idea of a module that has across-app components and stuff. In there I put the `NotFoundPage`.

```
ng generate module app-common
```

And import it in:

**app.module.ts**
```
...
import { AppCommonModule } from './app-common/app-common.module';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, HomePageModule, AppCommonModule],
...
```

Then create the `NotFoundPageComponent`.
```
ng generate component app-common/not-found-page
```

## Configure Routing

Edit the 

**app-routing.module.ts**
```
...
import { NotFoundPageComponent } from './app-common/not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent},
    { path: '**', component: NotFoundPageComponent }
];

@NgModule({
...
```

The above makes root '/' redirect to '/home' which presents the `HomePageComponent`. Every other route falls back to `NotFoundPageComponent`.

Make sure also that `app.component.html` has the `<router-outlet>` component:

**app.component.html**
```
<router-outlet></router-outlet>
```
