import React from "react";
import {useAppSelector} from "../../app/hooks";
import {ErrorSnackbar} from "../../common/components/errorSnackbar/ErrorSnackbar";
import LinearIndeterminate from "./components/LinearIndeterminate";
import {ResponsiveAppBar} from "./components/ResponsiveAppBar";

export const PageNavigation = () => {

    const circularEntity = useAppSelector(state => state.userFeedback.circularEntity)

    return (
        <>
            <ResponsiveAppBar/>
            <ErrorSnackbar/>
            {circularEntity && <LinearIndeterminate/>}
        </>
    );
}




