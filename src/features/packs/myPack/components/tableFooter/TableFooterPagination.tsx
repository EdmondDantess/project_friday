import {TablePaginationActions} from '../../../../../common/components/tablePaginationActions/TablePaginationActions';
import {TableFooter, TablePagination} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../../app/hooks';
import {getCardsTC} from '../../mypack-reducer';
import TableRow from '@mui/material/TableRow';
import React from 'react';

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
    const isFetching = useAppSelector(state => state.userFeedback.circularEntity)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        !isFetching   &&  dispatch(getCardsTC({
            cardsPack_id: packId,
            page: ++newPage,
            pageCount: pageCount,
            sortCards: sortCards
        }))
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        !isFetching   && dispatch(getCardsTC({
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
