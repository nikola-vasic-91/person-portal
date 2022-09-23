import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { PersonSocialMediaAccount } from "src/app/models/person-social-media-account.model";
import { Person } from "src/app/models/person.model";
import { SocialMediaAccount } from "src/app/models/social-media-account.model";
import { PersonService } from "src/app/shared/person-service.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from "../dialog-modal/dialog-modal.component";

@Component({
    selector: 'add-person',
    templateUrl: './add-person.component.html'
})
export class AddPersonComponent implements OnInit {
    
    newSocialMediaAccountAddress: any
    socialSkills: Array<any> = [];
    personSocialMediaAccounts: Array<PersonSocialMediaAccount> = [];
    @Input()
    socialMediaAccounts: Array<SocialMediaAccount> | undefined;
    @Output() personIdEvent = new EventEmitter<any>();

    addPersonForm = this.formBuilder.group({
        firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z ]*$')
                  ]),
        lastName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-Z ]*$')
                  ]),
        socialSkill: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
                  ]),
        socialMediaAccountType: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
                  ]),
        socialMediaAccountAddress: new FormControl('', [
            Validators.required,
            Validators.minLength(3)
                ])
      });

    constructor(private formBuilder: FormBuilder, private personService: PersonService, public dialog: MatDialog) {}

    ngOnInit(): void {
    }

    get firstName() { return this.addPersonForm.get('firstName'); }
    get lastName() { return this.addPersonForm.get('lastName'); }
    get socialSkill() { return this.addPersonForm.get('socialSkill'); }
    get socialMediaAccountType() { return this.addPersonForm.get('socialMediaAccountType'); }
    get socialMediaAccountAddress() { return this.addPersonForm.get('socialMediaAccountAddress'); }

    onAddSocialSkill(){
        this.socialSkills.push(this.addPersonForm.value.socialSkill?.valueOf());
        this.addPersonForm.controls['socialSkill'].reset();
    }

    onDeleteSocialSkill(socialSkill: string){
        var index = this.socialSkills.indexOf(socialSkill);
        if (index !== -1) {
            this.socialSkills.splice(index, 1);
        }
    }

    onAddSocialMediaAccount(){
        this.personSocialMediaAccounts.push(new PersonSocialMediaAccount(
            this.addPersonForm.value.socialMediaAccountType?.valueOf()!,
            this.addPersonForm.value.socialMediaAccountAddress?.valueOf()!
        ));
        this.addPersonForm.controls['socialMediaAccountType'].reset();
        this.addPersonForm.controls['socialMediaAccountAddress'].reset();
    }

    onDeleteSocialMediaAccount(personSocialMediaAccount: PersonSocialMediaAccount){
        var index = this.personSocialMediaAccounts.indexOf(personSocialMediaAccount);
        if (index !== -1) {
            this.personSocialMediaAccounts.splice(index, 1);
        }
    }

    onPickSocialMediaAccount(socialMediaAccount: SocialMediaAccount) {
        const dialogRef = this.dialog.open(DialogModalComponent, {
            width: '250px',
            hasBackdrop: true,
            disableClose: true,
            data: {type: socialMediaAccount.type, address: this.newSocialMediaAccountAddress},
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result !== null) {
                const personSocialMediaAccount = new PersonSocialMediaAccount(
                    socialMediaAccount.type, result);
                    personSocialMediaAccount.socialMediaAccountId = socialMediaAccount.socialMediaAccountId;
    
                this.personSocialMediaAccounts.push(personSocialMediaAccount);
            }
          });
    }

    onSubmit(){
        const person = new Person(this.addPersonForm.value.firstName?.valueOf()!, 
            this.addPersonForm.value.lastName?.valueOf()!, this.socialSkills, this.personSocialMediaAccounts)

        this.personService.addPerson(person)
            .subscribe(response => {
                this.personIdEvent.emit(response)
            });

        this.clearForm();
    }

    clearForm() {
        this.addPersonForm.controls['firstName'].reset();
        this.addPersonForm.controls['lastName'].reset();
        this.addPersonForm.controls['socialSkill'].reset();
        this.addPersonForm.controls['socialMediaAccountType'].reset();
        this.addPersonForm.controls['socialMediaAccountAddress'].reset();
        this.socialSkills.length = 0;
        this.personSocialMediaAccounts.length = 0;
    }
}