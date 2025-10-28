import { Routes } from '@angular/router';

import { Labs } from './pages/labs/labs';
import { Home } from './pages/home/home';
import {Homev1 } from './pages/homev1/homev1'


export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {  
        path: 'labs',
        component: Labs
    },
    {
        path: 'v1',
        component: Homev1
    }
];

