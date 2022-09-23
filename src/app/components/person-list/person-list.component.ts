import { Component, OnInit } from "@angular/core";
import { Person } from "src/app/models/person.model";
import { PersonService } from "src/app/shared/person-service.service";
import Utils from '../../shared/utils';

@Component({
    selector: 'person-list',
    templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit{
    persons: Array<Person> | undefined;

    constructor(private personService: PersonService) {}

    ngOnInit(): void {
        this.personService.getPersons()
            .subscribe(response => {
                this.persons = response;
            });
    }

    formatUrl(url: string | undefined) {
        return Utils.formatUrl(url);
    }
}