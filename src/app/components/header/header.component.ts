import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    ngOnInit(): void {
    }

    logout() {
        const item = localStorage.getItem('auth');
        if (item === "admin" || item === "akcije") {
            localStorage.removeItem("auth");

        }
    }
}