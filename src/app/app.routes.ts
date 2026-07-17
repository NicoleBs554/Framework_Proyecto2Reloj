import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'visualizer' },
	{
		path: 'visualizer',
		loadComponent: () => import('./visualizers/main-visualizer.component').then(m => m.MainVisualizerComponent)
	},
	{
		path: 'login',
		loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./auth/register.component').then(m => m.RegisterComponent)
	}
];
