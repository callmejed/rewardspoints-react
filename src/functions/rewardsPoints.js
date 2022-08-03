import { parse, isWithinInterval } from 'date-fns';
import { getSampleData } from '../api/sampleData';


async function simulateAPICall() {
  // todo: simulate api call
  let data = await getSampleData();

  return data;
}

async function calculateRewardsPoints(startDate, endDate) {
  const singlePointsThreshold = 50;
  const doublePointsThreshold = 100;
  let customerTransactionReport = [];

  try {
    let customerData = await simulateAPICall();

    if (customerData) {
      customerData.forEach((customerData, i) => {

        customerTransactionReport.push({
          'userId': customerData.userId,
          'firstName': customerData.firstName,
          'lastName': customerData.lastName,
          'overallSpentTotal': 0,
          'overallRewardsPointsTotal': 0,
          'transactionsByDate': {},
          'totalSpentByDate': {},
          'totalRewardsPointsByDate': {},
        });

        if (customerData.transactionHistory) {
          customerData.transactionHistory.forEach((transaction) => { // group transactions by month
            let transactionDate = new Date(parse(transaction.transactionDate, 'yyyy-MM-dd', new Date()));

            if (isWithinInterval(transactionDate, { start: startDate, end: endDate })) { // if transaction date is within provided date range, continue
              let tDateName = transactionDate.getFullYear() + "-" + (transactionDate.getMonth() + 1);

              if (!customerTransactionReport[i]['transactionsByDate'][tDateName]) { // initialize each new group
                customerTransactionReport[i]['transactionsByDate'][tDateName] = [];
                customerTransactionReport[i]['totalSpentByDate'][tDateName] = 0;
                customerTransactionReport[i]['totalRewardsPointsByDate'][tDateName] = 0;
              }

              transaction['rewardPointsThisTransaction'] = 0;
              let transTotal = parseInt(transaction.transactionTotal);

              if (transTotal > doublePointsThreshold) { // calculate double points first, then single points
                transaction['rewardPointsThisTransaction'] += (transTotal - doublePointsThreshold) * 2; // 2x points past doublePointThreshold
                transaction['rewardPointsThisTransaction'] += doublePointsThreshold - singlePointsThreshold;
              } else if (transTotal > singlePointsThreshold && transTotal <= doublePointsThreshold) { // calculate only single points ($0 - $100)
                transaction['rewardPointsThisTransaction'] += (transTotal - singlePointsThreshold) * 1;
              }

              customerTransactionReport[i].transactionsByDate[tDateName].push(transaction);
              customerTransactionReport[i].totalSpentByDate[tDateName] += parseFloat(transaction.transactionTotal);
              customerTransactionReport[i].totalRewardsPointsByDate[tDateName] += parseInt(transaction.rewardPointsThisTransaction);
              customerTransactionReport[i].overallSpentTotal += parseFloat(transaction.transactionTotal);
              customerTransactionReport[i].overallRewardsPointsTotal += parseInt(transaction.rewardPointsThisTransaction);
            }
          });
        }
      });
    } else {
      throw new Error('API returned no results');
    }
  } catch (e) {
    console.error("Error", e);
  }

  return customerTransactionReport;
}

export { calculateRewardsPoints };