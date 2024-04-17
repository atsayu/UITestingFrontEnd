import { Button, Input, Switch, FilledInput } from "@mui/material";
import { NestedDropdown } from "mui-nested-menu";
import Action from "./userAction/Action";
import { List } from '@mui/material';
import { useState } from "react";
import TestOutline from "./components/TestOutline";
import TestActionList from "./components/TestActionList";
import DataTable from "./components/DataTable";
import TestScript from "./TestScript";


export function TestCase() {
    const [isInputTestData, setIsInputTestData] = useState(false);
    const [flow, setFlow] = useState("");
    const [name, setName] = useState("");
    const [actions, setActions] = useState([]);
    const [testDataList, setTestDataList] = useState([]);
    const [tempData, setTempData] = useState({});
    const [variableExpressions, setVariableExpressions] = useState([]);
    const [testScript, setTestScript] = useState();

    function changeName(e) {
        const newName = e.target.value;
        setName(newName);
    }

    function setNewFlow(newFlow) {
        setFlow(newFlow);
    }

    function changeTempData(newTempData) {
        setTempData(newTempData);
    }

    function changeActionList(newActionList) {
        setActions(newActionList);
        const newVariableExpressions = [];
        newActionList.forEach((action) => {
            let expression = createVariableExpression(action);
            if (expression[0] === '(') expression = expression.slice(1, -1);
            if (expression) newVariableExpressions.push(expression);
        })
        setVariableExpressions(newVariableExpressions);
        setIsInputTestData(true);
    }

    function addTestData(newTestData) {
        setTestDataList([...testDataList, newTestData]);
    }



    const createVariableExpression = (action) => {
        const typeToOperator = {
          'or': ' | ',
          'and': ' & '
        };
    
        if (action.type === 'click' || action.type === 'input' || action.type === 'verifyURL') {
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
    
    function sendRequestGenScript() {
        const testcase = {};
        testcase.actions = actions;
        testcase.scenario = name;
        testcase.haveAssert = true;
        const body = {};
        body.testcases = [testcase];
        body.url = actions[0].url;
        body.variables = variableExpressions;
        body.storedData = testDataList;
        console.log(JSON.stringify(body))
        fetch("http://localhost:8081/v2/getScript", {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
            },
            method: "POST",
        }).then((response) => {
            return response.text();
        }).then((data) => {
            console.log(data);
            setTestScript(data);
        })
    }
    return (
        <div style={{ border: '1px solid black', margin: '5px', padding: '5px', borderRadius: '5px'}}>
            <h1 style={{textAlign: 'center', fontFamily: 'sans-serif'}}>UET UI Testing</h1>
            <div>
                <Switch checked={isInputTestData}
                    onChange={() => setIsInputTestData(!isInputTestData)} />
            </div>
            <span>Scenario: </span>
            {/* <Input value={name} placeholder="Test Case Name" onChange={changeName} /> */}
            <FilledInput
                value={name}
                placeholder="Test Case Name"
                onChange={changeName}
                inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
            />
            {
                isInputTestData? 
                <TestActionList actions={actions} variableExpressions={variableExpressions} tempData={tempData} changeTempData={changeTempData} addTestData={addTestData}/> 
                : <TestOutline flow={flow} changeActionList={changeActionList} setNewFlow={setNewFlow} />
            }
            {
                isInputTestData && testDataList.length > 0
                && <DataTable variableExpressions={variableExpressions} dataList={testDataList}/>
            }
            {
                isInputTestData && testDataList.length > 0 
                && <Button style={{marginTop: '10px'}} size="small" variant="contained" onClick={sendRequestGenScript}>Generate Script</Button>
            }
            {
                isInputTestData &&testScript
                && <TestScript script={testScript}/>
            }
        </div>
    );
}