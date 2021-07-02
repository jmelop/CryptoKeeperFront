import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/home/landing/landing.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { CryptosComponent } from './components/user/cryptos/cryptos.component';
import { HomeComponent } from './components/user/home/home.component';
import { NewsComponent } from './components/user/news/news.component';
import { ReportsComponent } from './components/user/reports/reports.component';
import { KeeperGuard } from './keeper/keeper.guard';

const routes: Routes = [

  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [KeeperGuard]
  },
  {
    path: 'cryptos',
    component: CryptosComponent,
    canActivate: [KeeperGuard]
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [KeeperGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [KeeperGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
