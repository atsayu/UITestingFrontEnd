import { Button, TextField, FilledInput } from "@mui/material";

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
    const [name, setName] = useState("");
    const [actions, setActions] = useState([]);
    const [testDataList, setTestDataList] = useState([]);
    const [tempData, setTempData] = useState({});
    const [variableExpressions, setVariableExpressions] = useState([]);
    const [testScript, setTestScript] = useState();
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

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
        if (description === "") {
            alert("Please input description");
        } else {
            //CALL API LLM
            const body = {url, description};
            fetch("LLM_API_URL", {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                },
                body: JSON.stringify(body),
                method: "POST",
            }).then((response) => {
                return response.text();
            }).then((data) => {
                console.log(data);
                setFlow(data);
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
                    // endIcon={<EditIcon />}
                    >
                        Change Actions
                    </Button>
                }
            </div>
            <div style={{ margin: '5px' }}>
                <span>Scenario: </span>
                <FilledInput
                    value={name}
                    placeholder="Test Case Name"
                    onChange={changeName}
                    inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
                />
            </div>
            <div style={{ margin: '5px' }}>
                <span>URL: </span>
                <FilledInput
                    value={url}
                    placeholder="Web site url"
                    onChange={(e) => setUrl(e.target.value)}
                    inputProps={{ style: { textAlign: "center", fontStyle: "italic", padding: 0 } }}
                />
            </div>
            <div style={{ margin: '5px' }}>
                <span>Description: </span>
                <TextField
                    value={description}
                    size='small'
                    onChange={(e) => setDescription(e.target.value)} variant='outlined'
                    multiline rows={5} fullWidth
                    placeholder='Describe the scenario for LLM genration'
                    style={{ marginTop: '20px' }}
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
                    : <TestOutline clearTestData={clearTestData} flow={flow} changeActionList={changeActionList} setNewFlow={setNewFlow} />
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