import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Guard } from "./shared/guard";
import { AkcijaComponent } from "./components/akcija/akcija.component";
import { AzurirajAkcijuComponent } from "./components/azuriraj-akciju/azuriraj-akciju.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/akcije', pathMatch: 'full' },
    { path: 'akcije', component: AkcijaComponent },
    { path: 'azuriraj-akcije', component: AzurirajAkcijuComponent, canActivate: [Guard] },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}