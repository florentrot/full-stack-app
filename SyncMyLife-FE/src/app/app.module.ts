import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HeaderComponent } from "./layout/header/header.component";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AuthModule } from "./pages/auth/auth.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { PublicModule } from "./pages/public/public.module";
import { CommonModule } from "@angular/common";
import { DataModule } from "./data/data.module";
import { HeaderAuthComponent } from "./layout/header-auth/header-auth.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    FooterComponent,
    HeaderComponent,
    HeaderAuthComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    DataModule,
    SharedModule,
    PublicModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
