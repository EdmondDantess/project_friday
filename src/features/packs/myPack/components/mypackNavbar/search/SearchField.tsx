import {useDebounce} from '../../../../../../hooks/useDebounce/useDebounce';
import {useAppDispatch, useAppSelector} from '../../../../../../app/hooks';
import {setSearchQuestion} from '../../../mypack-reducer';
import {IconButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React, {useEffect, useState} from 'react';

export const SearchField = () => {

    const [valueTextField, setValueTextField] = useState<string>("")
    const isFetching = useAppSelector(state => state.userFeedback.circularEntity)

    const dispatch = useAppDispatch()

    const debouncedSearch = useDebounce<string>(valueTextField)

    useEffect(() => {
        dispatch(setSearchQuestion(debouncedSearch))

    }, [debouncedSearch]);

    const handleClearClick = () => {
        setValueTextField("")
    }

    return (
        <div>
            <TextField size={'small'} sx={{marginTop: '8px', height: '36px', width: '100%'}}
                       InputProps={{
                           startAdornment: <SearchIcon sx={{height: "19px", opacity: 0.5}}/>,
                           endAdornment: (<IconButton sx={{visibility: valueTextField ? "visible" : "hidden"}}
                                                      onClick={handleClearClick}><ClearIcon/></IconButton>),
                       }}
                       placeholder={`Provide your text`}
                       value={valueTextField}
                       onClick={handleClearClick}
                       onChange={(e) => {
                           setValueTextField(e.currentTarget.value)
                       }}
                       disabled={isFetching}
            ></TextField>
        </div>
    );
};