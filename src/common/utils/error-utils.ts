import {AppDispatch} from "../../app/store";
import {setError} from "../../features/userFeedback/userFeedback-reducer";

export const handleError = (data: any, dispatch: AppDispatch) => {
    if (data.message === "Network Error") {
        dispatch(setError("Network Error"))
        return
    }
    if (data.response.data.error) {
        dispatch(setError(data.response.data.error))
    } else {
        dispatch(setError("some error occurred"))
    }
}



