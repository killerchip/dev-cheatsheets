# Navigations

## Important: import `RouterModule`

Before you proceed, make sure that your module has first imported the `RouterModule`.

Typically this can be imported via the `AppRoutingModule` if you have created the project via CLI.

**<your-component>Module.ts**
```
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    ...
    imports: [CommonModule, AppRoutingModule]
})
```

## With Links

The following example goes one step beyond and reprsents an `<a>` element as button:

**<your-component>.component.html**
```
<a href="./other-page">
    <button>Other Page</button>
</a>
```

## Programmatically

In order to navigate programmatically you have to import the `Router` service.

**<your-component>.component.ts**
```
import { Router } from '@angular/router';

...
constructor( private router: Router){}

...
this.router.navigate('./to-a-page');
```
