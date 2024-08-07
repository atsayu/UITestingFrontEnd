import { Button, FilledInput, Select, MenuItem, FormControl } from '@mui/material';
import React from 'react'
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeScenario, changeScenarioName, changeScenarioDescription, changeScenarioRequired, changeScenarioImage, changeScenarioUrl, changeScenarioActionList, changeScenarioValidDataSets } from './redux/scenarioListSlice';
import ScenarioDescription from './ScenarioDescription';
import TestActionList from './components/TestActionList';



export default function Scenario({ scenario, scenarioIndex, scenarioIndexNameMap }) {
  const dispatch = useDispatch();
  const { required, name, url, actions, image, description, validDataSets } = { ...scenario };
  const fileInputRef = useRef(null);
  const [isInputTestData, setIsInputTestData] = useState(false);
  const [variableExpressions, setVariableExpressions] = useState([]);
  let modifiedScenarioIndexNameMap = { ...scenarioIndexNameMap };
  delete modifiedScenarioIndexNameMap[scenarioIndex];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        changeThisScenarioImage(reader.result.split(',')[1])

      };
      reader.readAsDataURL(file);
    }
  };


  const hanldeClickImage = () => {
    fileInputRef.current.click();
  }

  const deleteThisScenario = () => {
    dispatch(removeScenario(scenarioIndex));
  }

  const changeThisScenarioName = (newName) => {
    dispatch(changeScenarioName({ index: scenarioIndex, newName }));
  }

  const changeThisScenarioImage = (newImage) => {
    dispatch(changeScenarioImage({ index: scenarioIndex, newImage }));
  }

  const changeThisScenarioRequired = (newRequired) => {
    dispatch(changeScenarioRequired({ index: scenarioIndex, newRequired }));
    if (required !== -1) {
      changeThisScenarioUrl("");
    }
  }

  const changeThisScenarioUrl = (newUrl) => {
    dispatch(changeScenarioUrl({ index: scenarioIndex, newUrl }));
  }

  const changeThisScenarioDescription = (newDescription) => {
    dispatch(changeScenarioDescription({ index: scenarioIndex, newDescription }));
  }

  const changeThisScenarioActionList = (newActionList) => {
    dispatch(changeScenarioActionList({ index: scenarioIndex, newActionList }));
  }

  const changeThisScenarioValidDataSets = (newValidDataSets) => {
    dispatch(changeScenarioValidDataSets({ index: scenarioIndex, newValidDataSets }));
  }

  const handleGenerateScenarioDescription = () => {
    //TODO: CALL LLM API
  }

  const createVariableExpression = (action) => {
    const typeToOperator = {
      'or': ' | ',
      'and': ' & '
    };

    if (action.type === 'click' || action.type === 'input' || action.type === 'select' || action.type === 'verifyURL' || action.type === 'checkbox') {
      return action.value || action.url || '';
    } else if (action.type !== 'open') {
      const children = action.actions;
      const childrenExpression = [];
      children.forEach((child) => {
        const expression = createVariableExpression(child);
        if (expression !== '') childrenExpression.push(expression);
      });
      const outputExpression = childrenExpression.join(typeToOperator[action.type]);
      if (childrenExpression.length > 1) return `(${outputExpression})`;
      else return outputExpression;
    } else {
      return '';
    }

  }
  function changeActionList(newActionList) {
    changeThisScenarioActionList(newActionList);
    const newVariableExpressions = [];
    newActionList.forEach((action) => {
      let expression = createVariableExpression(action);
      if (expression[0] === '(') expression = expression.slice(1, -1);
      if (expression) newVariableExpressions.push(expression);
    })
    setVariableExpressions(newVariableExpressions);
    setIsInputTestData(true);
  }

  function addValidTestDataSet(newTestDataSet) {
    changeThisScenarioValidDataSets([...validDataSets, newTestDataSet]);
  }

  function clearValidDataSets() {
    changeThisScenarioValidDataSets([]);
  }

  const disableInputTestData = () => {
    setIsInputTestData(false);
  }

  return (
    <div style={{ border: '1.5px solid black', padding: '10px', margin: '10px', borderRadius: '8px' }}>
      <Button style={{ margin: '10px', padding: '3px', display: 'block' }} onClick={deleteThisScenario} color='error' size="small" variant="contained">
        Delete Scenario
      </Button>
      <span>Test Scenario: </span>
      <FilledInput
        value={name}
        placeholder="Name of this scenario"
        onChange={(e) => changeThisScenarioName(e.target.value)}
        inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
      />
      <br></br>
      <span>Require: </span>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select value={required} onChange={(e) => changeThisScenarioRequired(e.target.value)} variant='filled' displayEmpty>
          <MenuItem value={-1}>None</MenuItem>
          {
            Object.keys(modifiedScenarioIndexNameMap).map((index) => {
              return <MenuItem key={index} value={index}>{scenarioIndexNameMap[index]}</MenuItem>
            })
          }
        </Select>
      </FormControl>


      {
        required === -1 &&
        <div >
          <span>Url: </span>
          <FilledInput
            value={url}
            placeholder="Url of this scenario"
            onChange={(e) => changeThisScenarioUrl(e.target.value)}
            inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
          />
        </div>
      }

      <input style={{ display: image ? 'none' : 'block' }} type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
      {image ? (
        <div onClick={hanldeClickImage} style={{ cursor: 'pointer' }}>
          <img src={`data:image/jpeg;base64,${image}`} alt="Uploaded" style={{
            maxWidth: '200px',
            maxHeight: '200px',
            width: 'auto',
            height: 'auto',
          }} />
        </div>
      ) : (
        <>
          <p>No image uploaded</p>

        </>
      )
      }

      <Button style={{ margin: '10px', padding: '2px' }}
        size="small" variant="contained"
        onClick={handleGenerateScenarioDescription}
      >
        GENERATE DESCRIPTION
      </Button>

      {
        isInputTestData 
        ? <TestActionList actions={actions} changeActionList={changeActionList} addTestData={addValidTestDataSet} validDataSets={validDataSets} variableExpressions={variableExpressions} addValidTestDataSet={addValidTestDataSet} clearValidDataSets={clearValidDataSets} disableInputTestData={disableInputTestData} />
        : <ScenarioDescription description={description} changeDescription={changeThisScenarioDescription} changeActionList={changeThisScenarioActionList} enableInputTestData={() => setIsInputTestData(true)}/>
      }
    </div>


  )
}
