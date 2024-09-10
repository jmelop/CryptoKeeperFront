import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/user/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { RegisterComponent } from './components/home/register/register.component';
import { CryptosComponent } from './components/user/cryptos/cryptos.component';
import { LandingComponent } from './components/home/landing/landing.component';
import { LoginComponent } from './components/home/login/login.component';
import { ReportsComponent } from './components/user/reports/reports.component';
import { NgChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { NewsComponent } from './components/user/news/news.component';
import { PrivacyPolicyComponent } from './components/home/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './components/home/terms-of-use/terms-of-use.component';
import { RulesComponent } from './components/home/rules/rules.component';
import { CommunityComponent } from './components/home/community/community.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { HomeNavbarComponent } from './components/home/home-navbar/home-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AboutUsComponent } from './components/home/about-us/about-us.component';

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
    NewsComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    RulesComponent,
    CommunityComponent,
    FooterComponent,
    HomeNavbarComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
