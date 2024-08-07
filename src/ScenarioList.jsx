import { Button } from '@mui/material';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addScenario } from './redux/scenarioListSlice';
import Scenario from './Scenario';

export default function ScenarioList() {
    const dispatch = useDispatch();
    const scenarioList = useSelector(state => state.scenarioList.scenarioList);
    const scenarioIndexNameMap = {};
    scenarioList.forEach((scenario, index) => {
        scenarioIndexNameMap[index] = scenario.name;
    });
    console.log(scenarioIndexNameMap)

    const addBlankScenario = () => {
        const blankScenario = {
            name: '',
            required: -1,
            image: null,
            url: '',
            description: '',
            actions: [],
            validDataSets: [],
        }
        dispatch(addScenario(blankScenario));
    }
  return (
    <div>
        {scenarioList.map((scenario, index) => (
            <Scenario key={index} scenarioIndexNameMap={scenarioIndexNameMap} scenarioIndex={index} scenario={scenario}/>
        ))}
        <Button style={{ margin: '10px', padding: '2px' }} onClick={addBlankScenario} size="small" variant="contained">
            Add Scenario
        </Button>
    </div>
  )
}
