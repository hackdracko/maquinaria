import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AppConfigModule} from "./app-config.module";
import {AppRoutingModule} from "./@routing/app-routing.module";
import {NoContentComponent} from "./no-content";
import {MatCardModule} from "@angular/material";
import {AdministratorModule} from "./administrator/administrator.module";

@NgModule({
    declarations: [
        AppComponent,
        NoContentComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppConfigModule,
        AppRoutingModule,
        //RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
        MatCardModule,
        AdministratorModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
