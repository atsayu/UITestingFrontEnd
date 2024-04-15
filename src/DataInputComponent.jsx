
import { InputComponent } from './components/InputComponent'
import { Button, Input } from '@mui/material';




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
      {
        storedData &&
          storedData.map((userData, index) => {
            return (
              <div key={index}>
                <span style={{ fontWeight: 'bold' }}>{JSON.stringify(userData)}</span>
              </div>
            )
          })
      }

      <Button size="small" variant='contained' onClick={storeData}>ADD NEW Data</Button>
    </div>


  )
}
