import { Typography, Box, Container, TableContainer } from '@mui/material';
import { Table, TableBody,tableCellClasses , TableCell, TableHead,Paper,TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://data.covid19india.org/v4/min/data.min.json')
      .then(res => res.json())
      .then(jsonData => setData(jsonData))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Container>
        <center>
          <Box sx={{ textTransform: 'uppercase', m: 2 }}>
            <Typography variant='h2'> India COVID-19 Dashboard</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table >
           
              <TableHead  >
                <TableRow>
                {/* <Box sx={{ color: 'text.primary' }}> */}
                  <StyledTableCell>State</StyledTableCell>
                  <StyledTableCell>Confirmed</StyledTableCell>
                  <StyledTableCell>Recovered</StyledTableCell>
                  <StyledTableCell>Deceased</StyledTableCell>
                  {/* </Box> */}
                </TableRow>
              </TableHead>
             
              <TableBody>
                {Object.keys(data).map((stateCode, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{stateCode}</StyledTableCell>
                    <StyledTableCell>{data[stateCode].total.confirmed}</StyledTableCell>
                    <StyledTableCell>{data[stateCode].total.recovered}</StyledTableCell>
                    <StyledTableCell>{data[stateCode].total.deceased}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </center>
      </Container>
    </>
  );
}

export default App;
