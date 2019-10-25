# Angular Material Design

Information about using Angular Material from [material.angular.io](https://material.angular.io)

## Installing Angular Material

Use cli command to install `@angular/material` and follow instructions.

```
ng add @angular/material
```

It's a good practice to have a single module import and export all the @angular/material components you wish to use. Then you can import this module in any module that must use the material components.

So, create a separate module:
```
ng generate module material-design
```

### Generate a material-design module

Then in in this module import+export all the components you wish to use:

**material-design.module.ts**
```
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule], //-> What you import
    exports: [MatButtonModule, MatCheckboxModule]  //-> you should export
})
export class MaterialDesignModule {}
```

Then you can import this module to `app.module.ts` or any other module, and its `exports` will be automatically available.

### Test the installation

Edit a component template, and see if the design (e.g of a button) changes. Example:

**home-page.component.html**
```
<button mat-button>Search Github repos</button>
```
