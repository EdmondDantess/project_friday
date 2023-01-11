import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {IconButton, TableHead} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {sortCardsAC} from '../../mypack-reducer';
import {useAppDispatch} from '../../../../../app/hooks';

type TableHeadPropsType = {
    sortButState: boolean
    setSortButState: (value: boolean) => void
}

export const TableHeadCell: React.FC<TableHeadPropsType> = ({sortButState, setSortButState}) => {

    const dispatch = useAppDispatch()
    const sortCardsOfDate = (value: boolean) => {
        setSortButState(value)
        if (sortButState) {
            dispatch(sortCardsAC('0update'))
        }
        if (!sortButState) {
            dispatch(sortCardsAC(''))
        }
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Answer</TableCell>
                <TableCell>
                    Last Update
                    <IconButton
                        size={'small'}
                        onClick={() => sortCardsOfDate(!sortButState)}>
                        {
                            sortButState ?
                                <ArrowDropDownIcon/>
                                : <ArrowDropUpIcon/>
                        }
                    </IconButton>
                </TableCell>
                <TableCell width={'200px'}>Grade</TableCell>
            </TableRow>
        </TableHead>
    );
};
