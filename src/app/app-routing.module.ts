import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptosComponent } from './cryptos/cryptos.component';

const routes: Routes = [
  {
    path: 'cryptos',
    component: CryptosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
