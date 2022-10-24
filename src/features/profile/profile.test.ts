import {profileReducer, setIsLoggedAC, setUserNameEmailAC} from './profile-reducer';

type initStateType = {
    isLogged: boolean
    name: string
    email: string
    avatar: string
}
let initialState: initStateType

beforeEach(() => {
    initialState = {
        isLogged: true,
        name: 'Loading...',
        email: 'Loading...',
        avatar: ''
    };
});

test('profile all reducers tests', () => {
    const nameACtest =  profileReducer(initialState, setUserNameEmailAC({name: 'Jhon', email: 'www.test@test.com'}))
    const loggedACtest = profileReducer(initialState, setIsLoggedAC(false))

    expect(nameACtest.name).toBe('Jhon');
    expect(nameACtest.email).toBe('www.test@test.com');
    expect(loggedACtest.isLogged).toBe(false);
});

