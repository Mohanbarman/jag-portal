import React, { useContext, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Navbar from '../components/Navbar';
import { authenticatedRoutes } from '../Routes';
import { LEADS } from "../graphql/profileSchemas";
import { useLazyQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { SEVERITY, utilsContext } from "../context/UtilsContext";
import { CloudDownload } from "@material-ui/icons";
import { ExportToCsv } from 'export-to-csv';



const Leads = () => {
  const { displayModal, setIsLoading } = useContext(utilsContext);

  const [fetchLeads, { loading, data, error }] = useLazyQuery(LEADS);
  const [downloadLeads, downloadLeadState] = useLazyQuery(LEADS);
  const [rows, setRows] = useState(undefined);

  // Pagination states
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (!loading) {
      setIsLoading(true);
      fetchLeads({ variables: { limit: 10, page: 1 } });
      setRowsPerPage(10);
    }
  }, [])

  useEffect(() => {
    if (error) {
      displayModal(error.message, SEVERITY.ERROR);
    } else if (data?.leads) {
      setRows(data?.leads?.docs);
      setPage(Number(data?.leads?.page));
      setCount(Number(data?.leads?.totalDocs));
      setIsLoading(false);
    }
  }, [data])

  const handleChangePage = (event, newPage) => {
    setIsLoading(true);
    fetchLeads({ variables: { limit: rowsPerPage, page: newPage + 1 } });
  }

  const handleChangeRowsPerPage = (event) => {
    setIsLoading(true);
    setRowsPerPage(event.target.value);
    fetchLeads({ variables: { limit: event.target.value, page } });
  }

  const handleDownloadClick = () => {
    setIsLoading(true);
    downloadLeads({ variables: { page: 1, limit: count } });
  }

  // for handling download lead
  useEffect(() => {
    if (downloadLeadState.data && !downloadLeadState.loading) {
      // remove __typename and _id field from each lead object
      const allLeads = downloadLeadState.data?.leads?.docs?.map(({ firstName, lastName, email, city, state, createdAt }) => ({
        firstName,
        lastName,
        email,
        city,
        state,
        time: new Date(Date(createdAt)).toLocaleString()
      }));
      downloadLeadsToCsv(allLeads);
      setIsLoading(false);
    }
  }, [downloadLeadState])

  const downloadLeadsToCsv = (leads) => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: `Downloaded at ${new Date().toLocaleString()}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'all-leads'
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(leads);
  }

  return (
    <>
      <Navbar routes={authenticatedRoutes} />
      <div className='leads-table-container'>
        <div className='table-toolbar-container'>
          <h3 className="leads-heading">All leads</h3>
          <Button
            variant={'contained'}
            color={'primary'}
            endIcon={<CloudDownload />}
            style={{ float: 'right' }}
            onClick={handleDownloadClick}
          >
            Download
          </Button>
        </div>
        <TableContainer >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">State</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.state}</TableCell>
                  <TableCell align="right">{new Date(Number(row?.createdAt)).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  )

}

export default Leads;
