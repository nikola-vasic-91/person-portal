export class SocialMediaAccount {
    public socialMediaAccountId: string;
    public type: string;

    constructor(socialmediaAccountId: string, type: string) {
        this.socialMediaAccountId = socialmediaAccountId;
        this.type = type;
    }
}