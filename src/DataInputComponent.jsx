
import { InputComponent } from './components/InputComponent'
import { Button, Input } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function DataInputComponent({ data, setNewData, variables, updateStoredData, storedData }) {
  console.log(storedData);
  const handleChange = (index, e) => {
    const newVal = e.target.value;
    const newData = [...data];
    newData[index] = newVal;
    setNewData(newData);
  }

  const storeData = () => {
    const newStoreData = {

    };
    variables.forEach((variable, index) => {
      newStoreData[variable] = data[index];
    });
    updateStoredData(newStoreData);
    setNewData([]);
  }
  return (
    <div>
      {
        variables.map((variable, index) => {
          return (
            <div key={index}>
              <span style={{ fontWeight: 'bold' }}>{variable} </span>
              <Input placeholder={`real data for ${variable}`} value={data[index] || ''} onChange={(e) => handleChange(index, e)} />
            </div>
          )
        })
      }
      {/* {
        storedData &&
          storedData.map((userData, index) => {
            return (
              <div key={index}>
                <span style={{ fontWeight: 'bold' }}>{JSON.stringify(userData)}</span>
              </div>
            )
          })
      } */}
      {
        storedData &&
        <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                variables.map((variable, index) => {
                  return <TableCell key={index}>{variable}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              storedData.map((userData, index) => {
                return <TableRow key={index}>
                  {
                    variables.map((variable, index) => {
                      return <TableCell key={index}>{userData[variable]}</TableCell>
                    })
                  }
                </TableRow>
              })
            }
          
          </TableBody>
        </Table>
      </TableContainer></>
      }
      <Button size="small" variant='contained' onClick={storeData}>ADD NEW Data</Button>
    </div>


  )
}
