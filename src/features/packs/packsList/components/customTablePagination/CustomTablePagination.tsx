import React from "react";
import {styled, TablePagination, TableRow} from "@mui/material";
import {setPage, setPageCount} from "../../packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {TablePaginationActions} from "../../../../../common/components/tablePaginationActions/TablePaginationActions";

const MyTablePagination = styled(TablePagination)({
    ".MuiTablePagination-toolbar": {
        justifyContent: "center",
        padding: "0",
    },
    ".MuiTablePagination-spacer": {
        flex: 0,
    }
});

export const CustomTablePagination = () => {

    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const page = useAppSelector(state => state.packs.page)

    const disabler = useAppSelector(state => state.packs.disabler)

    const dispatch = useAppDispatch()

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(setPage(++newPage))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPageCount(+event.target.value))
    };

    return (
        <TableRow>
            <MyTablePagination
                rowsPerPageOptions={[5, 8, 10]}
                count={cardPacksTotalCount}
                rowsPerPage={pageCount}
                page={page - 1}
                SelectProps={{
                    inputProps: {
                        "aria-label": "Cards per Page",
                        "disabled": disabler
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </TableRow>
    );
};
