import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {changePaletteMod} from "../../../features/userFeedback/userFeedback-reducer";

export const ThemeSwitch = () => {
    const paletteMode = useAppSelector((state) => state.userFeedback.paletteMode);
    const dispatch = useAppDispatch();

    const handleChangeAppTheme = () => {
        dispatch(changePaletteMod(paletteMode === "light" ? "dark" : "light"));
    };

    return (
        <IconButton onClick={handleChangeAppTheme} sx={{mr: '10px'}}>
            {paletteMode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
    );
};