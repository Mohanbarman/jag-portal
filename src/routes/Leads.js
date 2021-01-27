import React, {useContext, useEffect, useState} from 'react';
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
import { LinearProgress } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import {SEVERITY, utilsContext} from "../context/UtilsContext";


const Leads = () => {
  const {displayModal} = useContext(utilsContext);

  const [fetchLeads, { loading, data, error }] = useLazyQuery(LEADS);
  const [rows, setRows] = useState(undefined);

  // Pagination states
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (!loading) {
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
    }
  }, [data, error, displayModal])

  const handleChangePage = (event, newPage) => {
    fetchLeads({ variables: { limit: rowsPerPage, page: newPage + 1} });
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    fetchLeads({ variables: { limit: event.target.value, page } });
  }

  return (
    <>
      <Navbar routes={authenticatedRoutes} />
      {loading && <LinearProgress color='primary' />}
      <div className='leads-table-container'>
        <h3 className="leads-heading">All leads</h3>
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
              {rows?.map((row, index) => (
                <TableRow key={index}>
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
