// import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import RepositoryLinkTableComponent from './RepositoryLinkNameTableComponent';
// import { Link } from '@mui/material';
import RepositoryLinkReleasesComponent from './RepositoryLinkReleasesComponent';
// import RepositoryLinkNameTableComponent from './RepositoryLinkTableComponent copy';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

export default function RecentRepositoriesTable({
    repositories,
    session,
}) {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
            // renderCell: (params) => {
            //     const date = new Date(params.value);
            //     const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            //     return <>
            //         {formattedDate}
            //     </>
            // }
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            // renderCell: (params) => {
            //     return <>
            //         <RepositoryLinkNameTableComponent params={params}
            //         />
            //     </>
            // }
        },
        {
            field: 'created_at',
            headerName: 'Created',
            type: 'datetime',
            width: 100,
            // editable: true,
            renderCell: (params) => {
                const date = new Date(params.value);
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                return <>
                    {formattedDate}
                </>
            }
        },
        {
            field: 'updated_at',
            headerName: 'Updated',
            type: 'datetime',
            width: 100,
            // editable: true,
            renderCell: (params) => {
                const date = new Date(params.value);

                const formattedDate = daysMonthsYearsSince(date)
                var output = ""
                if (formattedDate.years > 0) {
                    output += " " + formattedDate.years + " year(s)"
                }
                if (formattedDate.months > 0) {
                    output += " " + formattedDate.months + " month(s)"
                }
                if (formattedDate.days > 0) {
                    output += " " + formattedDate.days + " day(s)"
                }
                // const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                const stringDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                return <>
                    <Tooltip arrow title={"Last update was " + output + " ago"} placement="top-start">
                        <p>{stringDate}</p>
                    </Tooltip>
                    {/* {output} */}
                </>
            }
        },
        {
            field: 'html_url',
            headerName: 'Visibility',
            width: 150,
            renderCell: (params) => {
                return <>
                    <RepositoryLinkTableComponent
                        session={session}
                        params={params}
                    />
                </>
            }
        },
        {
            field: 'releases_url',
            headerName: 'Release',
            width: 150,
            renderCell: (params) => {
                return <>
                    <RepositoryLinkReleasesComponent params={params}
                    />
                </>
            }
        },
    ];

    const [sortModel, setSortModel] = useState([
        {
            field: 'updated_at',
            sort: 'asc',
        },
    ]);

    const [pageSize, setPageSize] = useState(5);

    return <>
        <Box
            sx={{
                width: '100%'
            }}>
            <DataGrid
                rows={repositories}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 25]}
                onSortModelChange={(model) => setSortModel(model)}

            />
        </Box>
    </>
}

interface DateDifference {
    years: number;
    months: number;
    days: number;
}

function daysMonthsYearsSince(date: Date): DateDifference {
    const now = new Date();
    // const date = new Date(givenDate);

    let years = 0;
    let months = 0;
    let days = 0;

    years = now.getFullYear() - date.getFullYear();

    months = (now.getMonth() - date.getMonth());
    if (months < 0) {
        years--;
        months += 12;
    }

    if (now.getDate() < date.getDate()) {
        months--;
        days = new Date(now.getFullYear(), now.getMonth(), 0).getDate() - date.getDate() + now.getDate();
    } else {
        days = now.getDate() - date.getDate();
    }

    return { years, months, days };
}
