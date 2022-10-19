import React, {useState} from "react";
import {IconButton, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {TextFieldProps} from "@mui/material/TextField/TextField";


const CustomPasswordField = (props: TextFieldProps) => {

    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField type={visible ? "text" : "password"}
                   InputLabelProps={{
                       style: {"font": "Montserrat"},
                   }}
                   autoComplete={"new-password"}
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position="end">
                               <IconButton
                                   aria-label="toggle password visibility"
                                   onClick={toggleVisibility}
                                   onMouseDown={handleMouseDownPassword}
                               >
                                   {visible ? <VisibilityOff/> : <Visibility/>}
                               </IconButton>
                           </InputAdornment>
                       )
                   }}
                   {...props}
        ></TextField>
    );
};

export default CustomPasswordField;
