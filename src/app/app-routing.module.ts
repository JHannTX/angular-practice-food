import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'fruit',
    loadChildren: () => import('./fruit-pages/fruit.module').then(m => m.FruitModule),
    title: 'Fruit'
  },
  {
    path: 'home',
    component: AppHomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'cocktail', loadChildren: () => import('./cocktail-pages/cocktail.module').then(m => m.CocktailModule) },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
