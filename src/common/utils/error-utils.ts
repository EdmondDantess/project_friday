import {AppDispatch} from '../../app/store';
import {setError} from '../../features/userFeedback/userFeedback-reducer';
import {setIsLoggedAC} from '../../features/profile/profile-reducer';

export const handleError = (data: any, dispatch: AppDispatch) => {
    if (data.message === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
        dispatch(setIsLoggedAC(false))
    }
    if (data.message === 'Network Error') {
        dispatch(setError('Network Error'))
        return
    }
    if (data.response.data.error) {
        dispatch(setError(data.response.data.error))
    } else {
        dispatch(setError('some error occurred'))
    }
}
export const handleErrorAuth = (data: any, dispatch: AppDispatch) => {
    if (data.message === 'Network Error') {
        dispatch(setError('Network Error'))
    }
    if (data.message === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
        dispatch(setIsLoggedAC(false))
    }
}




