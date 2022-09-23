import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonListComponent } from "./components/person-list/person-list.component";
import { PersonComponent } from "./components/person/person.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/new-person', pathMatch: 'full'},
    { path: 'new-person', component: PersonComponent},
    { path: 'person-list', component: PersonListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}