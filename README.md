# Angular-Module-Core

This module consist the core functionalities of fmblog. I assume that you have created Angular project with `@angular/cli`

**Required Packages**
1. `"sweetalert2": "^8.8.7"`, for alerts.

**Required Modules**
*--no required modules--*

**Functionalities**
1. Caching Service, `cache.service`
2. Request Service, `main-request.service`
3. Pagination helper, `main.service`

**Installation**
1. Add the module to Angular Project as a submodule. 
`git submodule add https://github.com/bwqr/Angular-Module-Core src/app/core`
2. Import `CoreModule` from inside `AppModule`.
3. Create a new file inside the `src/app` called `routes.ts`. This file will contain our API routes. File content should be like this: 
                `export const routes: any = {}`
    Inside of the routes, you can define your routes. When making a request from `main-request.service`, 
    you can pass url as object access notation, eg. 
    `service.makeGetRequest('test.access')`, and the routes content should be 
                `export const routes: any = {
                    test: {
                        url: '/test/',
                        access: {
                            url: 'access/'
                        }
                    }
                };`

