import React from 'react';
import {TableFooter, TablePagination} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import {TablePaginationActions} from '../../../../common/components/tablePaginationActions/TablePaginationActions';
import {getCardsTC} from '../mypack-reducer';
import {useAppDispatch} from '../../../../app/hooks';

type TableFooterPropsType = {
    cardsTotalCount: number
    pageCount: number
    page: number
    packId: string
    sortCards: string
}

export const TableFooterPagination: React.FC<TableFooterPropsType> = ({
                                                                          sortCards,
                                                                          packId,
                                                                          page,
                                                                          cardsTotalCount,
                                                                          pageCount
                                                                      }) => {

    const dispatch = useAppDispatch()

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(getCardsTC({
            cardsPack_id: packId,
            page: ++newPage,
            pageCount: pageCount,
            sortCards: sortCards
        }))
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(getCardsTC({
            cardsPack_id: packId,
            pageCount: +event.target.value,
            sortCards: sortCards
        }))
    };

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[5, 8, 10]}
                    colSpan={3}
                    count={cardsTotalCount}
                    rowsPerPage={pageCount}
                    page={page - 1}
                    SelectProps={{
                        inputProps: {'aria-label': 'Cards per Page',},
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
};
