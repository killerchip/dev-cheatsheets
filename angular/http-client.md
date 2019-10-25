# HttpClient based services

Here's an example on how to create a simple service that uses `HttpClient` to interact with an API.

## Create the service

Create the service

`ng generate service github-search/github-search`

and register it in the module that provides it

**github-search.module.ts**

```
import { GithubSearchService } from './github-search.service';

@NgModule({
    providers: [GithubSearchService]
})
```

## Create an interface

Next we create interface for the data to fetch.

1. Get a sample data JSON from the API under use.
1. You can use [json2ts](http://www.jsontots.com) to transform the JSON data to interface definition
1. Then create the interface

```
ng generate interface github-search/github-search
```

1. And copy paste the interface from [json2ts](http://www.jsontots.com). Make sure that you **export** at least the root object, after you **rename** it properly

**github-search.ts**

```
export interface GithubSearch {
  total_count: number;
  incomplete_results: boolean;
  items: Item[];
}

interface Item {
  id: number;
  score: number;
  ...
}

interface Owner {
  login: string;
  ...
}
```

## Import HttpClient and the interface

Import the `HttpClientModule` first in your module:

**github-search.module.ts**
```
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, HttpClientModule]
})
```

Then import `HttpClient` and your **interface** into your service. And inject the `HttpClient` into your service:

**github-search.service.ts**
```
import { HttpClient } from '@angular/common/http';
import { GithubSearch } from './github-search';

export class GithubSearchService {

  constructor(
      private httpClient: HttpClient       //-> Inject here
  ) { }
}
```

## Create the fetching method

Create a method that returns an observable to be consumed by service clients:

**github-search.service.ts**
```
export class GithubSearchService {
    ...
    search = (query:string ) => this.httpClient.get<GithubSearch>(`https://api.github.com/search/repositories?q=${query}`);
}
```

## Consume the service

You must inject the service in your component and subscribe to its method.

**github-search.component.ts**
```
import { HttpErrorResponse } from '@angular/common/http';
import { GithubSearchService } from '../github-search.service';
import { GithubSearch } from '../github-search';

export class GithubSearchComponent implements OnInit {
    searchTerm: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private githubSearchService: GithubSearchService    //-> inject the service
    ) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.searchTerm = params.get('query');

            this.githubSearchService
                .search(this.searchTerm)
                .subscribe(
                    (response: GithubSearch) => this.searchResults = response,
                    (error: HttpErrorResponse) => alert(error.statusText)
                );
        });
    }
}
```

Pay attention in:
* we apply `GithubSearch` type in response data
* we import and use `HttpErrorResponse` for handling http errors.

And we can visualize the data:

**github-search.component.html**
```
<p>Total results: <b>{{searchResults?.total_count}}</b></p>
```

Pay attention how we use the `?` operator to suppress errors when the template is tried to be rendered without data (while they are being fetched).
