import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { CryptosComponent } from './components/user/cryptos/cryptos.component';
import { ReportsComponent } from './components/user/reports/reports.component';
import { KeeperGuard } from './keeper/keeper.guard';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cryptos',
    component: CryptosComponent,
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
