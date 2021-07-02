import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/user/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/home/register/register.component';
import { CryptosComponent } from './components/user/cryptos/cryptos.component';
import { LandingComponent } from './components/home/landing/landing.component';
import { LoginComponent } from './components/home/login/login.component';
import { ReportsComponent } from './components/user/reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { NewsComponent } from './components/user/news/news.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    CryptosComponent,
    LandingComponent,
    LoginComponent,
    HomeComponent,
    ReportsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
