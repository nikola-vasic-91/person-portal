import { Component, Input, OnInit } from "@angular/core";
import { ModifiedPerson } from "src/app/models/modified-person.model";
import { Person } from "src/app/models/person.model";
import Utils from "src/app/shared/utils";

@Component({
    selector: 'person-detail',
    templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent implements OnInit {

    @Input()
    person: Person | undefined;

    @Input()
    modifiedPersonData: ModifiedPerson | undefined;

    constructor() {}
    
    ngOnInit(): void {
    }

    formatUrl(url: string | undefined) {
        return Utils.formatUrl(url);
    }
}