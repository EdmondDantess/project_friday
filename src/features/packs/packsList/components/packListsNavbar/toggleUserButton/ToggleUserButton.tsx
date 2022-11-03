import React, {useCallback, useEffect} from "react";
import styles from "../../../packsList.module.scss";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useAppSelector} from "../../../../../../app/hooks";
import {useNavigate, useSearchParams} from "react-router-dom";

export const ToggleUserButton = React.memo(() => {

    const currentUserId = useAppSelector(state => state.packs.currentUserId)

    const navigate = useNavigate()

    let [searchParams, setSearchParams] = useSearchParams();

    const packQuery = searchParams.get("pack") || ''
    const [alignment, setAlignment] = React.useState(packQuery ? "my" :  'all');

    useEffect(() => {
        if (packQuery === currentUserId) {
            setAlignment("my")
        } else {
            setAlignment('all')
        }
    }, [currentUserId, packQuery]);

    const handleChange = useCallback(
        (
            event: React.MouseEvent<HTMLElement>,
            newAlignment: string,
        ) => {
            if (newAlignment === 'all') {
                setSearchParams({pack: "all"})
            }
            if (newAlignment === 'my') {
                setSearchParams({pack: `${currentUserId}`})
            }
            if (newAlignment !== null) {
                setAlignment(newAlignment);
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
            >
                <ToggleButton value="my" sx={{width: '100px'}}>My</ToggleButton>
                <ToggleButton value="all" sx={{width: '100px'}}>All</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
});
