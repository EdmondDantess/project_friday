import React from "react";
import {styled, TablePagination, TableRow} from "@mui/material";
import {useAppSelector} from "../../../../../app/hooks";
import {TablePaginationActions} from "../../../../../common/components/tablePaginationActions/TablePaginationActions";
import {useSearchParams} from "react-router-dom";
import {useAllSearchParams} from "../../../../../hooks/useAllSearchParams";

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

    let [searchParams, setSearchParams] = useSearchParams();
    const params = useAllSearchParams();

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setSearchParams({...params, "page": `${++newPage}`})
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setSearchParams({...params, "pageCount": `${+event.target.value}`})
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
