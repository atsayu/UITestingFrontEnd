import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { TestCase } from './TestCase';
import { addTestCaseEvent } from './redux/actions';
import { addTestCase, setVerifyActionExist } from './redux/testActionSlice';
import { useState } from 'react';
import DataInputComponent from './DataInputComponent';
import UrlComponent from './Url';
import TestScript from './TestScript';


export default function TestSuite() {
    const [url, setUrl] = useState();
    const [testScript, setTestScript] = useState("");
    const testcases = useSelector(state => state.testAction.testcases);
    const dispatch = useDispatch();
    const [isInputData, setIsInputData] = useState(false);
    const [data, setData] = useState([]);
    const [storedData, setStoredData] = useState([]);
    const [variableExpressions, setVariableExpressions] = useState([]);

    const valueVariables = useSelector((state) => {
        const testcases = state.testAction.testcases;
        const arr = [];
        testcases.forEach((testcase) => {
            const newArr = find(testcase.actions);
            arr.push(...newArr);

        })
        return [...new Set(arr)];
    })
    const handleAddTestCase = () => {
        // dispatch({type: 'ADD_TEST_CASE'});
        // dispatch(addUserClickAction());
        dispatch(addTestCase());
    }
    function find(actions) {
        const arr = [];
        actions.forEach((action) => {
            if (action.type !== 'and' && action.type !== 'or') {
                if (action.value) arr.push(action.value);
                if (action.url) arr.push(action.url);
            }

            else {
                arr.push(...find(action.actions));
            }
        })
        return arr;
    }
    function findAllByKey(obj, keyToFind) {
        return Object.entries(obj)
            .reduce((acc, [key, value]) => (key === keyToFind)
                ? acc.concat(value)
                : (typeof value === 'object')
                    ? acc.concat(findAllByKey(value, keyToFind))
                    : acc
                , [])
    }
    const setNewData = (newData) => {
        setData(newData);
    }

    const updateStoredData = (newStoredData) => {
        setStoredData(storedData => [...storedData, newStoredData]);
    }

    const containsVerifyAction = (action) => {
        if (action.type !== 'or' && action.type !== 'and') {
            const ans = action.type.includes('verify');
            return ans;
        } else {
            const childrenActions = action.actions;

            const verifyActionExist = childrenActions.reduce((exist, child) => {
                return exist || containsVerifyAction(child);
            }, false);
            return verifyActionExist;
        }
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

    const sendTestCaseAndData = () => {
        const obj = {};
        obj.url = url;
        obj.testcases = JSON.parse(JSON.stringify(testcases));
        // const haveAssertMap = {};
        obj.testcases.forEach((testcase, index) => {
            const testActions = testcase.actions;
            const verifyActionExist = testActions.reduce((exist, action) => {
                console.log(containsVerifyAction(action));
                return exist || containsVerifyAction(action);
            }, false);
            console.log(verifyActionExist);
            // haveAssertMap[index] = verifyAcionExist;
            // let testcaseIndex = index;
            // dispatch(setVerifyActionExist({testcaseIndex, verifyActionExist}))
            testcase.haveAssert = verifyActionExist;
        });
        // Object.keys(haveAssertMap).forEach(key => {
        //     obj.testcases[key].haveAssert = haveAssertMap[key];
        // })
        obj.variables = variableExpressions;
        obj.data = data;
        obj.storedData = storedData;
        console.log(JSON.stringify(obj));
        fetch("http://localhost:8081/v2/getScript", {
            body: JSON.stringify(obj),
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
        <div style={{ fontFamily: 'sans-serif' }}>
            <UrlComponent setUrl={setUrl} url={url} />
            <Button size="small" onClick={handleAddTestCase}>
                <AddIcon />
                <span>New Test Case</span>
            </Button>
            {
                testcases.map((testcase, index) => {
                    return <TestCase key={index} testcaseIndex={index} actionIndexes={[]} />
                })
            }
            <div>
                <Button onClick={() => {
                    setIsInputData(true);
                    console.log(testcases[0].actions);
                    testcases[0].actions.forEach((action) => {
                        console.log(action);
                        let expression = createVariableExpression(action);
                        if (expression[0] === '(') expression = expression.slice(1, -1);
                        if (expression) setVariableExpressions(prev => [...prev, expression]);
                    })
                    const newData = valueVariables.map((value) => "");
                    setData(newData);
                }}>Input data</Button>
                {
                    isInputData && <DataInputComponent data={data} setNewData={setNewData} updateStoredData={updateStoredData} variables={variableExpressions} storedData={storedData}/>
                }
                <Button onClick={sendTestCaseAndData}>Generate Script</Button>
                <Button>RUN SCRIPT</Button>
            </div>
            {testScript !== "" && <TestScript script={testScript}/>}

        </div>
    )
}
