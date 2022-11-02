import React, {useCallback, useEffect} from "react";
import styles from "../../../packsList.module.scss";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {setIsFetching, setMinMaxCards, setSearchUserId} from "../../../packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";

export const ToggleUserButton = React.memo(() => {

    const currentUserId = useAppSelector(state => state.packs.currentUserId)
    const userSearchId = useAppSelector(state => state.packs._id)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams();

    const [alignment, setAlignment] = React.useState(params.curUserId === currentUserId ? "my" :  'all');

    useEffect(() => {
        if (params.curUserId === currentUserId) {
            dispatch(setSearchUserId(params.curUserId))
            setAlignment("my")
        } else {
            setAlignment('all')
        }
        dispatch(setIsFetching(false))
    }, [dispatch, currentUserId, userSearchId]);

    const handleChange = useCallback(
        (
            event: React.MouseEvent<HTMLElement>,
            newAlignment: string,
        ) => {
            if (newAlignment === 'all') {
                dispatch(setMinMaxCards(null, null))
                dispatch(setSearchUserId(""))
                navigate(`/packslist/all`)
            }
            if (newAlignment === 'my') {
                dispatch(setMinMaxCards(null, null))
                dispatch(setSearchUserId(currentUserId))
                navigate(`/packslist/${currentUserId}`)
            }
            if (newAlignment !== null) {
                setAlignment(newAlignment);
            }
        }, [dispatch, navigate, currentUserId]);


    return (
        <div className={styles.toggledButtonPack}>
            <div className={styles.fieldTitle}>
                Show packs cards
            </div>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                size={'small'}
            >
                <ToggleButton value="my" sx={{width: '100px'}}>My</ToggleButton>
                <ToggleButton value="all" sx={{width: '100px'}}>All</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
});
