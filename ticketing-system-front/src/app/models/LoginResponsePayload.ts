export class LoginResponsePayload {
    constructor(public accessToken: string, public user: any) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
