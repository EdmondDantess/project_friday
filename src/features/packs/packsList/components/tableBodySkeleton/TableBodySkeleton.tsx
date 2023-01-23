import React from 'react';
import {Skeleton, TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";

export const TableBodySkeleton = React.memo(({rows, cols}: TableRowSkeletonType) => {
    return (
        <>
            {[...Array(rows)].map((e, i) => (
                <TableRow
                    key={i}
                    sx={{height: "73px"}}
                >
                    {[...Array(cols)].map((e, i) => (
                        <TableCell key={i}>
                            <Skeleton/>
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
});

type TableRowSkeletonType = {
    rows: number;
    cols: number;
};
