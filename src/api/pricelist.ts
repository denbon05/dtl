import type { PriceListByKey } from '@/types/api/pricelist';
import axios from 'axios';

export const fetchPriceList = async (): Promise<PriceListByKey> =>
  axios
    .get('https://api.npoint.io/2a0e1ddaf77f4bb6f283')
    .then(({ data }) => Object.freeze(data));

// ? Uncomment below for fetching from google sheets
// /** Fetch pricelist from google spreadsheet. */
// export const fetchPriceList = async () => {
//   const spreadSheetURI = new URL(
//     `${import.meta.env.VITE_SHEET_ID}/gviz/tq`,
//     'https://docs.google.com/spreadsheets/d/'
//   );
//   const sheetNames = ['services', 'cleaning'];
//   const sheetQuery = 'Select A,B,C';
//   const promises = sheetNames.map((sheet) =>
//     axios
//       .get(spreadSheetURI.toString(), {
//         params: {
//           sheet,
//           tq: sheetQuery,
//           tqx: 'out:json',
//         },
//       })
//       .then(({ data }) => {
//         // google sheets return a string with function declaration
//         // cut off declaration, left only json syntax string
//         const text = data.replaceAll(
//           '/*O_o*/\ngoogle.visualization.Query.setResponse(',
//           ''
//         );
//         // console.log('jsonString', text);
//         const {
//           cols,
//           // `c` eq to the 2nd row
//           rows: [{ c: prices }],
//         } = JSON.parse(text.substring(0, text.length - 2)).table;
//         return cols.map(({ label }: { label: string }, idx: number) => ({
//           // retrieve corresponding price by column name and row value (v)
//           [label]: prices[idx].v,
//         }));
//       })
//   );
//   const orderedPriceLists = await Promise.all(promises);
//   // aggregated in the same order as `sheetNames
//   const pricelistByKey = sheetNames.reduce<PriceListByKey>(
//     (acc, key, idx) => ({
//       ...acc,
//       [key]: orderedPriceLists[idx],
//     }),
//     {} as PriceListByKey
//   );
//   // console.log('RES', pricelistByKey);
//   return pricelistByKey;
// };
