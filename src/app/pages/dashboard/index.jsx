// lib
import moment from 'moment';
// react
import * as React from 'react';
// mui
import { ListItemText, Grid }  from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// chart.js
import { Chart, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(ArcElement)

// inc
import * as applications from '~src/app/services/applications';

const prepareDataForChart = rows => ({
  labels: [
    'Approved',
    'Rejected',
    'Canceled',
    'Ready For Review',
    'In Progress'
  ],
  datasets: [{
    label: 'Status Spread',
    data: ['approved', 'rejected', 'cancelled', 'readyForReview', 'inProgress']
      .map(status => rows.filter(r => r.status === status).length),
    backgroundColor: [
      '#8bc24b',
      '#ff9800',
      '#ff5722',
      '#f5f502',
      '#01a8f4'
    ]
  }]
})

const columns = [
  {field: 'created', headerName: 'Created',
  renderCell: ({value}) => <ListItemText
      primary={moment(value).format('MMM D, YYYY')}
      secondary={moment(value).format('HH:mm:ss')}
    />},
  {field: 'user', headerName: 'Name', renderCell: ({value}) => <ListItemText
    primary={value.fullName}
    secondary={value.email}
  />},
  {field: 'type', headerName: 'Type'},
  {field: 'riskScore', headerName: 'Risk Score'},
  {field: 'status', headerName: 'Status'},
  {field: 'actions', headerName: '', renderCell: () => '-'}
]

export const Dashboard = () => {
  const rows = applications.list();
  return <Grid container sx={{padding: 4}} spacing={4}>
    <Grid item xs={7}>
      {/* List of applications */}
      <DataGrid
        autoHeight
        autosizeOnMount
        autosizeOptions={{expand: true}}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
      />
    </Grid>
    <Grid item xs={5}>
      {/* Pie Chart */}
      <Pie data={prepareDataForChart(rows)} />
    </Grid>
  </Grid>
}
