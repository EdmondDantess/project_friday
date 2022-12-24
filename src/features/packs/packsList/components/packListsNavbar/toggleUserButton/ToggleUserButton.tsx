import React, {useCallback, useEffect} from "react";
import styles from "../../../packsList.module.scss";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useAppSelector} from "../../../../../../app/hooks";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAllSearchParams} from "../../../../../../hooks/useAllSearchParams";

export const ToggleUserButton = React.memo(() => {

    const currentUserId = useAppSelector(state => state.packs.currentUserId)
    const defaultQueryParams = useAppSelector(state => state.packs.defaultQueryParams)

    const disabler = useAppSelector(state => state.packs.disabler)

    const navigate = useNavigate()

    const params = useAllSearchParams();
    let [searchParams, setSearchParams] = useSearchParams();

    const [alignment, setAlignment] = React.useState(params.pack ? "my" :  'all');

    useEffect(() => {
        if (params.pack === currentUserId) {
            setAlignment("my")
        } else {
            setAlignment('all')
        }
    }, [currentUserId, params.pack]);

    const handleChange = useCallback(
        (
            event: React.MouseEvent<HTMLElement>,
            newAlignment: string,
        ) => {
            if (newAlignment === 'all') {
                setSearchParams({...defaultQueryParams, pack: ""})
            }
            if (newAlignment === 'my') {
                setSearchParams({...defaultQueryParams, pack: `${currentUserId}`})
            }
        }, [navigate, currentUserId]);


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
                disabled={disabler}
            >
                <ToggleButton value="my" sx={{width: '100px'}}>My</ToggleButton>
                <ToggleButton value="all" sx={{width: '100px'}}>All</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
});
