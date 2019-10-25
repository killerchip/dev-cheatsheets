# Route Params

## Declare paths

You can declare paths that use _path parameters_ to a page.

Tip: you can also have paths to _redirect_ to default values for parameters.

**app-routing.module.ts**
```
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'search', redirectTo: '/search/killerchip', pathMatch: 'full' }, // ->  add this
    { path: 'search/:query', component: GithubSearchComponent},              //     and this
    { path: '**', component: NotFoundPageComponent }
];
```

## Reading path params

Import the `ActivatedRoute` and `ParamMap` interface:

**github-search.component.ts**
```
import { ActivatedRoute, ParamMap } from '@angular/router';
```

And read the params via the `ActivatedRoute`:
```
export class GithubSearchComponent implements OnInit {
    searchTerm: string;
    
    constructor(
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => this.searchTerm = params.get('query'));
    }
}
```
