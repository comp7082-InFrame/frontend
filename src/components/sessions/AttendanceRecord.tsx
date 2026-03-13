
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableFooter, TablePagination, TablePaginationActions, TableHead, Menu, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import '@/assets/styles/form.css';

export default function AttendanceRecord({ records }: { records: Array<any> }) {
    const rows = records;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        status: string,
    ) => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <div>

            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell scope="row">
                                    {row.student_number}
                                </TableCell>
                                <TableCell>
                                    {row.first_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {row.last_name}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {row.status}
                                </TableCell>
                                <TableCell>
                                    <Button variant="text" className='icon-btn' onClick={handleClickListItem}
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >...</Button>
                                    <Menu
                                        id="basic-menu"
                                        aria-labelledby="basic-button"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        slotProps={{
                                            list: {
                                                'aria-labelledby': 'basic-button',
                                            }
                                        }}
                                        className='select-menu'
                                    >
                                        <MenuItem
                                            key={'absent'}
                                            onClick={(event) => handleMenuItemClick(event, 'absent')}
                                        >
                                            Mark as absent
                                        </MenuItem>
                                        <MenuItem
                                            key={'present'}
                                            onClick={(event) => handleMenuItemClick(event, 'present')}
                                        >
                                            Mark as present
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}
