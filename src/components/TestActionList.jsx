import React from 'react'
import ActionWrapper from './ActionWrapper'
import { Button } from '@mui/material'
import { useState } from 'react';
import DataTable from './DataTable';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export default function TestActionList({ actions, variableExpressions, addTestData, validDataSets, clearValidDataSets, disableInputTestData }) {
  const [tempData, setTempData] = useState({});

  const changeTempData = (newTempData) => {
    setTempData(newTempData);
  }

  function addData() {
    const newTestData = {};
    variableExpressions.forEach((variableExpression) => {
      let realData = variableExpression;
      const singleVariables = variableExpression.split(/\s*[&|]\s*/);
      singleVariables.forEach((singleVariable) => {
        realData = realData.replace(singleVariable, tempData[singleVariable]);
      });
      newTestData[variableExpression] = realData;
    });
    addTestData(newTestData);
    changeTempData({});

  }
  return (
    <div>
      <Button style={{ margin: '10px', padding: '2px' }}
        size="small" variant="contained"
        onClick={() => {
          clearValidDataSets();
          disableInputTestData();
        }}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Change Actions
      </Button>
      {
        actions.map((action, index) => {
          console.log(action)
          return <div key={index} style={{ marginTop: '20px' }}>
            <ActionWrapper
              index={index}
              action={action}
              tempData={tempData}
              changeTempData={changeTempData}
              addTestData={addTestData}
            />
          </div>
        })
      }
      <Button style={{ marginTop: '10px' }} size="small" variant="contained" onClick={addData}>Add data</Button>

      <DataTable variableExpressions={variableExpressions} dataList={validDataSets} />
    </div>

  )
}
