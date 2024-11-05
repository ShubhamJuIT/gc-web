import { UserDataModel } from "./user.data.model";


export interface UserContextType {
    loginHandler: (data: UserDataModel) => void,
    logoutHandler: () => void,
    autoSignIn: () => void,
    userData: UserDataModel | null;
    setUserData: React.Dispatch<React.SetStateAction<UserDataModel | null>>;
    loading: boolean

}
