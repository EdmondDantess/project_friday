import {profileReducer, setIsLoggedAC, setUserEmailAC, setUserNameAC} from './profile-reducer';

type initStateType = {
    isLogged: boolean
    name: string
    email: string
}
let initialState: initStateType

beforeEach(() => {
    initialState = {
        isLogged: true,
        name: 'Loading...',
        email: 'Loading...'
    };
});

test('profile all reducers tests', () => {
    const nameACtest =  profileReducer(initialState, setUserNameAC('Jhon'))
    const emailACtest =  profileReducer(initialState, setUserEmailAC('www.test@test.com'))
    const loggedACtest = profileReducer(initialState, setIsLoggedAC(false))

    expect(nameACtest.name).toBe('Jhon');
    expect(emailACtest.email).toBe('www.test@test.com');
    expect(loggedACtest.isLogged).toBe(false);
});

