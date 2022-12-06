import React, {useEffect, useState} from "react";
import {IconButton, TableCell} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {setSortPacks} from "../../packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {TableCellProps} from "@mui/material/TableCell/TableCell";

type ValueType = "updated"

type CustomTableHeadCellType = {
    title: string
    value: ValueType
}

export const CustomTableHeadCell = (props: CustomTableHeadCellType & TableCellProps) => {

    const {title, value, ...restProps} = props

    const isFetching = useAppSelector(state => state.packs.isFetching)

    const disabler = useAppSelector(state => state.packs.disabler)

    const dispatch = useAppDispatch()

    const [toggleSorted, setToggleSorted] = useState(0);

    const handleClick = () => {
        if(toggleSorted === 0) {
            setToggleSorted(1)
            dispatch(setSortPacks(`1${value}`))
        }
        if(toggleSorted === 1) {
            setToggleSorted(0)
            dispatch(setSortPacks(`0${value}`))
        }
    }

    useEffect(() => {
        setToggleSorted(0)
    }, [isFetching]);

    return (
        <TableCell {...restProps}>
            {title}
            <IconButton size={"small"} disabled={disabler} onClick={handleClick}>
                {toggleSorted === 0 ?
                    <ArrowDropDownIcon/>
                    :
                    <ArrowDropUpIcon/>}
            </IconButton>
        </TableCell>
    );
};
