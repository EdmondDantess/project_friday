import React, {useEffect, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import styles from '../../../packsList.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch, useAppSelector} from '../../../../../../app/hooks';
import {useDebounce} from '../../../../../../hooks/useDebounce/useDebounce';
import {setPackName} from '../../../packsList-reducer';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchField = () => {

    const packName = useAppSelector(state => state.packs.packName)

    const [valueTextField, setValueTextField] = useState<string>('')
    const debouncedSearch = useDebounce<string>(valueTextField)
    const dispatch = useAppDispatch()

    const handleClearClick = () => {
        setValueTextField('')
    }

    useEffect(() => {
        dispatch(setPackName(valueTextField))
    }, [debouncedSearch]);

    useEffect(() => {
        if (packName === '') {
            setValueTextField(packName)
        }
    }, [packName]);

    return (
        <div>
            <div className={styles.fieldTitle}>
                Search
            </div>
            <TextField className={styles.inputPack}
                       size={'small'}
                       value={valueTextField}
                       placeholder={`Search...`}
                       sx={{height: '36px', minWidth: '420px'}}
                       InputProps={{
                           startAdornment: <SearchIcon sx={{height: '19px', opacity: 0.5}}/>,
                           endAdornment: (<IconButton sx={{visibility: valueTextField ? 'visible' : 'hidden'}}
                                                      onClick={handleClearClick}><ClearIcon/></IconButton>),
                       }}
                       onChange={(e) => {
                           setValueTextField(e.currentTarget.value)
                       }}
            ></TextField>
        </div>
    );
};