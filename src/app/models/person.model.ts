import { PersonSocialMediaAccount } from "./person-social-media-account.model";

export class Person {
    public personId!: string;
    public firstName: string;
    public lastName: string;
    public socialSkills: Array<string>;
    public socialMediaAccounts: Array<PersonSocialMediaAccount>;

    constructor(firstName: string, lastName: string, socialSkills: Array<string>, socialMediaAccounts: Array<PersonSocialMediaAccount>) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.socialSkills = socialSkills;
        this.socialMediaAccounts = socialMediaAccounts;
    }
}