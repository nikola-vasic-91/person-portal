import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./shared/admin-guard";
import { AkcijaComponent } from "./components/akcija/akcija.component";
import { AzurirajAkcijuComponent } from "./components/azuriraj-akciju/azuriraj-akciju.component";
import { LoggedInGuard } from "./shared/logged-in-guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/akcije', pathMatch: 'full' },
    { path: 'akcije', component: AkcijaComponent, canActivate: [LoggedInGuard] },
    { path: 'azuriraj-akcije', component: AzurirajAkcijuComponent, canActivate: [AdminGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}