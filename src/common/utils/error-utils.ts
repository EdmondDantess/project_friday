import {AppDispatch} from "../../app/store";
import {AxiosError} from "axios";
import {setError} from "../../features/userFeedback/userFeedback-reducer";

export const handleError = (data: any, dispatch: AppDispatch) => {
    if (data.response.data.error) {
        dispatch(setError(data.response.data.error))
    } else {
        dispatch(setError("some error occurred"))
    }
}


