import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Divider, Paper, Button, TextField } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { DatePicker } from '@mui/x-date-pickers';
import { calculateRewardsPoints } from './hooks/rewardsPoints';
import { format, parse, sub } from 'date-fns';

function App() {
  const [ filteredData, setFilteredData ] = useState(null); // todo: build out custom hook to retrieve results on new data
  const [ startDate, setStartDate ] = useState(sub(new Date(), { months: 3 }));
  const [ endDate, setEndDate ] = useState(new Date());
  const theme = useTheme();

  useEffect(() => {
    getRewardsReport();
  }, []);

  function handleSetEndDate(date) {
    if (endDate < startDate) { // just to keep start date always equal or less than end date
      setStartDate(date);
    }
    setEndDate(date);
  }

  async function getRewardsReport() {
    let rewardsReport = await calculateRewardsPoints(startDate, endDate);
    setFilteredData(rewardsReport);
  }

  return (
    <Container sx={{ backgroundColor: theme.palette.background.default }}>
      <Grid container>
        <Grid
          item
          xs={12}
        >
          <Paper style={styles.paper}>
            <Grid item xs={12}>
              <Typography variant="h4">Rewards Points</Typography>
              <Divider />
            </Grid>
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
            >
              <Grid
                container
                item
                xs={10}
                alignItems="center"
                justifyContent="center"
                spacing={3}
              >
                <Grid item style={styles.rowItem}>
                  <DatePicker
                    disableFuture
                    label="Start Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    value={startDate}
                    onChange={ (newValue) => setStartDate(newValue) }
                    renderInput={ (params) => <TextField {...params} /> }
                  />
                </Grid>
                <Grid item style={styles.rowItem}>
                  <DatePicker
                    disableFuture
                    label="End Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    value={endDate}
                    onChange={ (newValue) => handleSetEndDate(newValue) }
                    renderInput={ (params) => <TextField {...params} /> }
                  />
                </Grid>
                <Grid item style={styles.rowItem}>
                  <Button
                    variant="outlined"
                    onClick={ () => getRewardsReport() }
                  >
                    Filter Results
                  </Button>
                </Grid>
              </Grid>
              <Grid container item xs={10} style={styles.resultsContainer} justifyContent="center">
                <Grid item xs={12} >
                  <Typography variant="h5">Results</Typography>
                  <Divider />
                </Grid>
                <Grid item style={styles.results}>
                  {
                    filteredData ?
                      filteredData.map((customer, index) => (
                        <Box
                          key={index}
                          style={styles.resultsCustomerContainer}
                        >
                          <Typography variant="h6"><span style={{ color: theme.palette.text.secondary }}>Customer:</span> {customer.lastName}, {customer.firstName}</Typography>
                          {
                            customer.transactionsByDate ?
                              Object.keys(customer.transactionsByDate).map((dateKey, i) => (
                                <Box 
                                  key={i}
                                  style={styles.resultsTransactionsByDateContainer}
                                >
                                  <Typography variant="subtitle1" style={{ color: theme.palette.text.secondary }}>{format(parse(dateKey, 'yyyy-MM', new Date()), 'MMMM yyyy')}</Typography>
                                  <Grid
                                    container
                                    style={styles.resultsTransactionsContainer}
                                    flexDirection="column"
                                  >
                                    {
                                      customer.transactionsByDate[dateKey].map((transaction, k) => (
                                        <Grid 
                                          key={k}
                                          container
                                          item
                                          style={styles.resultsTransactionDateContainer}
                                          justifyContent="space-between"
                                        >
                                          <Grid item style={styles.rowItemSmall}>
                                            <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>Transaction Date</Typography>
                                            <Typography variant="body1">{transaction.transactionDate}</Typography>
                                          </Grid>
                                          <Grid item style={styles.rowItemSmall}>
                                            <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>Transaction Total</Typography>
                                            <Typography variant="body1">${parseFloat(transaction.transactionTotal).toFixed(2)}</Typography>
                                          </Grid>
                                          <Grid item style={styles.rowItemSmall}>
                                            <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>Rewards points this transaction</Typography>
                                            <Typography variant="body1">{transaction.rewardPointsThisTransaction}</Typography>
                                          </Grid>
                                        </Grid>
                                      ))
                                    }
                                    <Divider />
                                    <Grid
                                      container
                                      item
                                      style={styles.resultsTransactionDateContainer}
                                      justifyContent="flex-end"
                                      spacing={4}
                                    >
                                      <Grid item style={styles.rowItemSmall}>
                                        <Typography variant="body1"><span style={{ color: theme.palette.text.secondary }}>{format(parse(dateKey, 'yyyy-MM', new Date()), 'MMM yyyy')} Transaction Total:</span> ${parseFloat(customer.totalSpentByDate[dateKey]).toFixed(2)}</Typography>
                                        {/* <Typography variant="body1">${parseFloat(customer.totalSpentByDate[dateKey]).toFixed(2)}</Typography> */}
                                      </Grid>
                                      <Grid item style={styles.rowItemSmall}>
                                        <Typography variant="body1"><span style={{ color: theme.palette.text.secondary }}>{format(parse(dateKey, 'yyyy-MM', new Date()), 'MMM yyyy')} Rewards Points Total:</span> {customer.totalRewardsPointsByDate[dateKey]}</Typography>
                                        {/* <Typography variant="body1">{customer.totalRewardsPointsByDate[dateKey]}</Typography> */}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))
                            :
                            <Typography variant="subtitle1">No transactions to show</Typography>
                          }
                          {/* <Divider /> */}
                          <Typography variant="subtitle1" style={styles.overallTotals}>Customer Total Spent: ${parseFloat(customer.overallSpentTotal).toFixed(2)}</Typography>
                          <Typography variant="subtitle1" style={styles.overallTotals}>Customer Total Rewards Points Earned: {customer.overallRewardsPointsTotal}</Typography>
                        </Box>
                      ))
                    :
                      <Typography variant="subtitle1">No data</Typography>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const styles = {
  container: {
    // textAlign: "center",
    // alignItems: "center",
    // justifyContent: "center"
  },
  paper: {
    marginTop: '2rem',
    padding: '2rem',
  },
  row: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  rowItem: {
    marginTop: '4rem',
  },
  rowItemSmall: {
    marginBottom: '.25rem',
  },
  formInput: {
    // margin: '1rem',
  },
  resultsContainer: {
    margin: '3rem',
  },
  results: {
    marginTop: '1.5rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    width: '100%',
  },
  resultsCustomerContainer: {
    padding: '1rem 0',
  },
  resultsTransactionsContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-end',
  },
  resultsTransactionsByDateContainer: {
    padding: '0.75rem 0',
  },
  resultsTransactionDateContainer: {
    padding: '0.25rem 0.75rem',
  },
  overallTotals: {
    marginTop: '.25rem',
    textAlign: 'right',
  }
}

export default App;
