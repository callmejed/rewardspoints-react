import { parse, isWithinInterval } from 'date-fns';

/**
 *
 * A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
 *
 * A customer receives 2 points for every dollar spent over $100 in each transaction,
 * plus 1 point for every dollar spent over $50 in each transaction
 * (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
 *
 * Given a record of every transaction during a three month period,
 * calculate the reward points earned for each customer per month and total.
 *
 **/

let sampleData = [
  {
    userId: "0000001",
    firstName: 'Jim',
    lastName: 'Andrews',
    transactionHistory: [
      {
        transactionDate: "2022-08-01",
        items: [
          { itemId: "u32h682hsji-h330" },
          { itemId: "u32h682hsji-h331" }
        ],
        transactionTotal: "127.32",
      },
      {
        transactionDate: "2022-07-31",
        items: [
          { itemId: "u32h682hsji-h330" },
          { itemId: "u32h682hsji-h331" }
        ],
        transactionTotal: "127.32",
      },
      {
        transactionDate: "2022-07-15",
        items: [
          { itemId: "u32h682hsji-h330" },
          { itemId: "u32h682hsji-h331" }
        ],
        transactionTotal: "127.32",
      },
      {
        transactionDate: "2022-07-13",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "84.57",
      },
      {
        transactionDate: "2022-07-01",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "50.57",
      },
      {
        transactionDate: "2022-06-31",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "50.57",
      },
      {
        transactionDate: "2022-06-12",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "50.57",
      },
      {
        transactionDate: "2022-06-05",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "100.00",
      },
      {
        transactionDate: "2022-06-01",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "100.57",
      },
      {
        transactionDate: "2022-05-25",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "523.55",
      },
    ],
  },
  {
    userId: "0000002",
    firstName: 'Jerry',
    lastName: 'Johnston',
    transactionHistory: [
      {
        transactionDate: "2022-07-11",
        items: [
          { itemId: "u32h682hsji-h330" },
          { itemId: "u32h682hsji-h331" },
          { itemId: "u32h682hsji-h331" },
          { itemId: "u32h682hsji-h331" },
        ],
        transactionTotal: "354.98",
      },
      {
        transactionDate: "2022-03-13",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "32.22",
      },
      {
        transactionDate: "2022-01-15",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "68.51",
      },
    ],
  },
  {
    userId: "0000003",
    firstName: 'Amy',
    lastName: 'Smith',
    transactionHistory: [
      {
        transactionDate: "2022-07-11",
        items: [
          { itemId: "u32h682hsji-h330" },
          { itemId: "u32h682hsji-h331" },
          { itemId: "u32h682hsji-h331" },
          { itemId: "u32h682hsji-h331" },
        ],
        transactionTotal: "34.42",
      },
      {
        transactionDate: "2022-05-23",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "12.99",
      },
      {
        transactionDate: "2021-11-25",
        items: [
          { itemId: "u32h682hsji-h332" },
          { itemId: "u32h682hsji-h333" }
        ],
        transactionTotal: "69.44",
      },
    ],
  },
];


async function simulateAPICall() {
  // todo: simulate api call
  let data = sampleData;

  return data;
}

async function calculateRewardsPoints(startDate, endDate, allResults = false) {
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
            let transactionDate = new Date(parse(transaction.transactionDate, 'yyyy-MM-dd', new Date()));//console.log(transaction.transactionDate, transactionDate, transactionDate.getMonth() + 1);

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
  // console.log('customerTransactionReport', customerTransactionReport);
  return customerTransactionReport;
}

export { calculateRewardsPoints, sampleData };