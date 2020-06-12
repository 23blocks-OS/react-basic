import React, { useEffect, useState } from "react"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getFrom } from "../../api/api"

import Search from './Search';

export default function Countries() {
  let [countries, setCountries] = useState([])

  let [searchText, setSearchText] = useState("")

  useEffect(() => {
    getFrom(`counties/?state=&search=${searchText}`)
      .then((response) => {
        console.log(response)
        setCountries(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [searchText])

  return (
    <div style={{padding: '20px'}}>
      <h2 data-testid="title">Counties</h2>
      <div style={{marginBottom: '20px'}}>
        <Search handleChange={setSearchText} />
      </div>
      {searchText ? <div data-testid="table"><TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {country.attributes.name}
                </TableCell>
            <TableCell>{country.attributes.state_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div>  :   <p>Enter search text</p>}
    </div>
  )
}
