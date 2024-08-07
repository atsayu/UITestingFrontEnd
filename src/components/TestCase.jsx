import { Button, Switch, FilledInput } from "@mui/material";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import TestOutline from "./TestOutline";
import TestActionList from "./TestActionList";
import DataTable from "./DataTable";
import TestScript from "../TestScript";


export function TestCase() {
    const [isLoading, setIsLoading] = useState(false);
    const [isInputTestData, setIsInputTestData] = useState(false);
    const [flow, setFlow] = useState("");
    const [scenario, setScenario] = useState("");
    const [actions, setActions] = useState([]);
    const [testDataList, setTestDataList] = useState([]);
    const [tempData, setTempData] = useState({});
    const [variableExpressions, setVariableExpressions] = useState([]);
    const [testScript, setTestScript] = useState();
    const [url, setUrl] = useState('');
    const [isRequiredLogin, setIsRequiredLogin] = useState(false);
    const [editFlowEnabled, setEditFlowEnabled] = useState(false);

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

    function clearTestData() {
        setTestDataList([]);
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

    function sendRequestGenScript() {
        setIsLoading(true);
        const testcase = {};
        testcase.actions = actions;
        testcase.scenario = name;
        testcase.haveAssert = true;
        const body = {};
        body.testcases = [testcase];
        body.url = actions[0].url;
        body.variables = variableExpressions;
        body["storedData"] = testDataList;
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
            setIsLoading(false);
        }).catch(err => {
            console.log("Error request create script: ", err);
            setIsLoading(false);
        });
    }

    function sendRequestRunScript() {
        setIsLoading(true);
        fetch("http://localhost:8081/run/robot", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
            },
            responseType: 'blob',
            method: "GET",
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Failed to download zip file');
            }
            return response.blob();
        }).then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setIsLoading(false);
        }).catch(err => {
            console.log("Error: ", err);
            setIsLoading(false);
        });
    }

    function handleGenScenario() {
        if (scenario === "") {
            alert("Please input a scenario");
        } else {
            //CALL API LLM
            const reqBody = {
                isRequiredLogin: isRequiredLogin,
                url: url,
                action: scenario
            };
            console.log(reqBody)
            setIsLoading(true);
            fetch("http://localhost:8081/generate-test-scenario", {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                },
                body: JSON.stringify(reqBody),
                method: "POST",
            }).then((response) => {
                return response.text();
            }).then((data) => {

                setEditFlowEnabled(true);
                setFlow(data);
                setIsLoading(false);
            }).catch(err => {
                console.log("Error get scenario from LLM: ", err);
                setIsLoading(false);
            });
        }
    }
    return (
        <div style={{ border: '1px solid black', margin: '5px', padding: '5px', borderRadius: '5px', fontFamily: 'sans-serif' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
                Processing request...
            </Backdrop>
            <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>UET UI Testing</h1>
            <div>
                {
                    isInputTestData
                    && <Button style={{ margin: '10px', padding: '2px' }}
                        size="small" variant="contained"
                        onClick={() => {
                            setIsInputTestData(false);
                            clearTestData();
                            setTestScript(undefined);
                        }}
                        startIcon={<ArrowBackIosNewIcon />}
                    >
                        Change Actions
                    </Button>
                }
            </div>
            <div style={{ margin: '5px' }}>
                <span>Scenario: </span>
                <FilledInput
                    value={scenario}
                    placeholder="Specify a scenario"
                    onChange={(e) => setScenario(e.target.value)}
                    inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
                />
            </div>
            <div style={{ margin: '5px' }}>
                <span>Required login </span>
                <Switch checked={isRequiredLogin} onClick={() => setIsRequiredLogin(isRequiredLogin => !isRequiredLogin)} />
            </div>
            <div style={{ margin: '5px' }}>
                <span>URL: </span>
                <FilledInput
                    value={url}
                    placeholder="Target website url"
                    onChange={(e) => setUrl(e.target.value)}
                    inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
                />
            </div>

            <Button style={{ margin: '10px', padding: '2px' }}
                size="small" variant="contained"
                onClick={handleGenScenario}
            >
                GENERATE SCENARIO
            </Button>


            {
                isInputTestData ?
                    <TestActionList actions={actions} variableExpressions={variableExpressions} tempData={tempData} changeTempData={changeTempData} addTestData={addTestData} />
                    : <TestOutline clearTestData={clearTestData} editFlowEnabled={editFlowEnabled} flow={flow} changeActionList={changeActionList} setNewFlow={setNewFlow} />
            }
            {
                isInputTestData && testDataList.length > 0
                && <DataTable variableExpressions={variableExpressions} dataList={testDataList} />
            }
            {
                isInputTestData && testDataList.length > 0
                && <Button style={{ marginTop: '10px' }} size="small" variant="contained" onClick={sendRequestGenScript}>Generate Script</Button>
            }
            {
                isInputTestData && testScript
                && <TestScript script={testScript} />
            }
            {
                isInputTestData && testScript
                && <Button style={{ marginTop: '10px' }} size="small" variant="contained" onClick={sendRequestRunScript}>Run Script</Button>
            }
        </div>
    );
}


scenario = {
    required: -1, /* -1: not required; 0, 1, 2, ...: required scenario with index of 1, 2, 3, ... */
    img: "base64",
    name: "string",
    url: "string", //if required !== -1 then url = ""
    actions: [
        {
            type: "open", // "open", "click", "input", "select", "verifyURL", "checkbox", "and", "or"
            describedLocator: "string",
            "other fields for specify type": "string",
        },

        {
            type: "and",
            actions: [
                {
                    type: "open", // "open", "click", "input", "select", "verifyURL", "checkbox", "and", "or"
                    describedLocator: "string",
                    "other fields for specify type": "string",
                }
            ]
        }
    ],
    validDataSets: [
        {
            //key value
        }
    ],
}