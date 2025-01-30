import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { GetCoinComponent } from './components/coinPages/get-coin/get-coin.component';
import { EditCoinComponent } from './components/coinPages/edit-coin/edit-coin.component';
import { CreateCoinComponent } from './components/coinPages/create-coin/create-coin.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'home/getCoin',
        component: GetCoinComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'home/editCoin',
        component: EditCoinComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'home/createCoin',
        component: CreateCoinComponent,
        canActivate: [AuthGuard],
    },
];
