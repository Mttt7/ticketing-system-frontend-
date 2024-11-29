import {UserProfile} from "./UserProfile";

export interface LoginResponsePayload {
  accessToken: string
  user: UserProfile
}
