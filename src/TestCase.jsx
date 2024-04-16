import { IconButton, ListItem } from "@mui/material";
import { InputComponent } from "./components/InputComponent";
import { NestedDropdown } from "mui-nested-menu";
import Action from "./userAction/Action";
import { List } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addUserClickActionEvent, addUserAndExpressionEvent } from "./redux/actions";
import { addAndAction, addCheckboxAction, addClickAction, addFlowDescribe, addInputAction, addOrAction, addSelectAction, addVerifyURLAction, changeTestCaseName } from "./redux/testActionSlice";


export function TestCase({testcaseIndex, actionIndexes, currentData, handleSetCurrentData}) {
    const actions = useSelector(state => state.testAction.testcases[testcaseIndex].actions);
    console.log(actions);
    const dispatch = useDispatch();

    const handleAddClickAction = () => {
        // dispatch({type: 'ADD_USER_ACTION_CLICK', index})
        
        dispatch(addClickAction({testcaseIndex, actionIndexes}));
    }

    const handleAddAndExpression = () => {
        // dispatch(addUserAndExpressionEvent(testcaseIndex, actionIndexes: []));
        dispatch(addAndAction({testcaseIndex, actionIndexes}));
    }

    const handleAddInputAction = () => {
        dispatch(addInputAction({testcaseIndex, actionIndexes}));
    }

    const handleAddSelect = () => {
        dispatch(addSelectAction({testcaseIndex, actionIndexes}));
    }

    const handleAddCheckbox = () => {
        dispatch(addCheckboxAction({testcaseIndex, actionIndexes}));
    }

    const handleAddFlow = () => {
        dispatch(addFlowDescribe({testcaseIndex, actionIndexes}));
    }

    const handleAddVerifyURL = () => {
        dispatch(addVerifyURLAction({testcaseIndex, actionIndexes}));
    }

    const handleAddOrExpression = () => {
        dispatch(addOrAction({testcaseIndex, actionIndexes}));
    }
    
    const menuItemsData = {
        label:'Add action',
        items:[
            {
                label: 'Actions flow',
                callback: handleAddFlow
            },
    
            {
                label: 'Normal actions',
                items:[
                    {
                        label: 'Click Element',
                        callback: handleAddClickAction
                    },
                    {
                        label: 'Input text',
                        callback: handleAddInputAction
                    },
                    {
                        label: 'Checkbox',
                        callback: handleAddCheckbox
                    },
                    {
                        label: 'Select',
                        callback: handleAddSelect
                    },
                    {
                        label: 'And Expression',
                        callback: handleAddAndExpression
                    },
                    {
                        label: 'Or Expression',
                        callback: handleAddOrExpression
                    }
                ],
            },
            {
                label: 'Verify Actions',
                items: [
                    {
                        label: 'Verify URL',
                        callback: handleAddVerifyURL
                    }
                ]
            }
        ],
            
    }
    
    function changeName(e) {
        const newName = e.target.value;
        dispatch(changeTestCaseName({testcaseIndex, newName}));
    } 

    return (
        <div style={{border: '1px solid black', margin: '5px', padding: '5px'}}>
            <span>Scenario: </span>
            <InputComponent placeholder="Test Case Name" onChange={changeName}/>
            <NestedDropdown menuItemsData={menuItemsData}/>
            <List sx={{ listStyle: "decimal", pl: 2 }}>
            {
                actions.map((action, index) => {
                    return (
                        <ListItem key={index} sx={{display: "list-item"}}>
                            <Action {...action} actionIndexes={[...actionIndexes, index]} testcaseIndex={testcaseIndex} currentData={currentData} handleSetCurrentData={handleSetCurrentData}/>
                        </ListItem>
                    )
                })
            }
            </List>
            
        
        
        </div>
    );
}