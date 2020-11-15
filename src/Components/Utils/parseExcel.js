import * as XLSX from 'xlsx';

/**
 *
 * @param reader the file reader object { FileReader() }
 * @returns a csv data object {obj}
 */
export default function parseExcel(reader){
   const bstr = reader.result;
   const wb = XLSX.read(bstr, {type:'binary'});
   const wsname = wb.SheetNames[0];
   const ws = wb.Sheets[wsname];
   const data = XLSX.utils.sheet_to_csv(ws, {header:1});
   return data;
}
