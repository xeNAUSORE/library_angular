import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/domains' },
    
    {   
        path: 'domains',
        canActivate: [authenticationGuard],
        loadChildren: () =>
        import('./pages/domains/domains.module').then((m) => m.DomainsModule)
    },

    {   
        path: 'authors',
        canActivate: [authenticationGuard],
        loadChildren: () =>
        import('./pages/authors/authors.module').then((m) => m.AuthorsModule)
    },

    {   
        path: 'books',
        canActivate: [authenticationGuard],
        loadChildren: () =>
        import('./pages/books/books.module').then((m) => m.BooksModule)
    },
    
    {   
        path: 'users',
        canActivate: [authenticationGuard],
        loadChildren: () =>
        import('./pages/users/users.module').then((m) => m.UsersModule)
    },

    {   
        path: 'rentals',
        canActivate: [authenticationGuard],
        loadChildren: () =>
        import('./pages/rentals/rentals.module').then((m) => m.RentalsModule)
    },

    {   
        path: 'auth',
        loadChildren: () =>
        import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
    },


    {path: '**', redirectTo: '/'}
];
