

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

async function getSampleData() {
  const data = await sampleData;

  return data;
}

export { getSampleData };