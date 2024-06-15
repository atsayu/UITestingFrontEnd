import React from 'react'
import ActionWrapper from './ActionWrapper'
import { Button } from '@mui/material'
export default function TestActionList({ actions, variableExpressions, tempData, changeTempData, addTestData }) {
  console.log(actions);

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
      {
        actions.map((action, index) => {
          console.log(action)
          return <div key={index} style={{marginTop: '20px'}}>
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
      <Button style={{marginTop: '10px'}} size="small" variant="contained" onClick={addData}>Add data</Button>

    </div>

  )
}
