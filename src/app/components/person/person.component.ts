import { Component, OnInit } from "@angular/core";
import { ModifiedPerson } from "src/app/models/modified-person.model";
import { Person } from "src/app/models/person.model";
import { PersonService } from "src/app/shared/person-service.service";
import { NgToastService } from 'ng-angular-popup';
import { SocialMediaAccount } from "src/app/models/social-media-account.model";

@Component({
    selector: 'person',
    templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit {

    person: Person | undefined;
    modifiedPersonData!: ModifiedPerson;
    socialMediaAccounts: Array<SocialMediaAccount> | undefined;

    constructor(private personService: PersonService, private toast: NgToastService) {}

    ngOnInit(): void {
        this.getSocialMediaAccounts();
    }
    
    forwardPersonId($event: string) {
        if(!this.isEmptyOrSpaces($event)) {
            this.personService.getPerson($event)
            .subscribe({
                next: (response) => {
                    this.person = response;
                    this.toast.success({detail:"", summary:"Person added with id: " + $event, position:'br', duration: 5000});

                    this.getSocialMediaAccounts();
                }
            });

            this.personService.getModifiedPersonData($event)
            .subscribe(response => {
                this.modifiedPersonData = response;
            });
        }
    }

    getSocialMediaAccounts() {
        this.personService.getSocialMediaAccounts()
            .subscribe(response => {
                this.socialMediaAccounts = response;
            });
    }

    isEmptyOrSpaces(str: string){
        return str === null || str.match(/^ *$/) !== null;
    }
}