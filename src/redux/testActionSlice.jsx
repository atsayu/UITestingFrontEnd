import { createSlice } from "@reduxjs/toolkit";

export const testActionSlice = createSlice({
    name: 'testAction',
    initialState: {
        testcases: []
    },
    reducers: {
        addTestCase: (state) => {
            state.testcases.push({
                actions: [],
            })
        },
        changeTestCaseName: (state, action) => {
            state.testcases[action.payload.testcaseIndex].scenario   = action.payload.newName;
        },
        addAndAction:(state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'and',
                actions: action.payload.actions || []
            });
        },
        changeFlow: (state, action) => {
            state.testcases[action.payload.testcaseIndex].actions[action.payload.actionIndex].flow = action.payload.newFlow;
        },
        addOrAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let actions = state.testcases[action.payload.testcaseIndex].actions;
            if (actionIndexes) actionIndexes.forEach((innerIndex) => {
                actions = actions[innerIndex].actions;
            })
            actions.push({
                type: 'or',
                actions: action.payload.actions || []
            });
        },
        addFlowDescribe: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let actions = state.testcases[action.payload.testcaseIndex].actions;
            if (actionIndexes) actionIndexes.forEach((innerIndex) => {
                actions = actions[innerIndex].actions;
            });
            actions.push({
                type: 'flow',
            })
        },
        addClickAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })

            tempAction.actions.push({
                type: 'click',
                describedLocator: action.payload.locator
            })
        },
        addOpenURLAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'open',
                url: action.payload.url,
            });
        },
        changeURL: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.url = action.payload.newURL;
        },
        addInputAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'input',
                describedLocator: action.payload.locator,
                value: action.payload.value
            })
        },
        addHoverAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'hover',
                describedLocator: action.payload.locator,
            })
        },
        addMultipleActions: (state, action) => {
            const currentActionIndex = action.payload.currentActionIndex;
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach((actionIndex, index) => {
                if (index !== actionIndexes.length - 1) tempAction = tempAction.actions[actionIndex];
            });
            tempAction.actions.splice(currentActionIndex, currentActionIndex + 1);
            tempAction.actions.splice(currentActionIndex, 0, ...action.payload.newActions);
        },  
        addVerifyURLAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            });
            tempAction.actions.push({
                type: 'verifyURL',
            })
        },
        setVerifyActionExist: (state, action) => {
            const testcase = state.testcases[action.payload.testcaseIndex];
            testcase.haveAssert = action.payload.verifyActionExist;
        },
        changeExpectedURL : (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            });
            tempAction.url = action.payload.newURL;
        },
        chageFlow: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            console.log(actionIndexes)
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.flow = action.payload.newFlow;
        },
        changeDescribedLocator: (state, action) => {
            console.log("change locator")
            const actionIndexes = action.payload.actionIndexes;
            console.log(actionIndexes)
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.describedLocator = action.payload.newLocator;
            
        },
        changeValue: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.value = action.payload.newValue;
        },
        addAssertUrlAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'verifyUrl',
                url: action.payload.url
            })
        },
        addAssertElementAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'verifyElement',
                describedLocator: action.payload.locator
            })
        },
        deleteAction:(state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.splice(action.payload.actionIndex, 1);
        },
        toogleSelectAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            let oldSelectState = tempAction.selected;
            tempAction.selected = !oldSelectState;
        },
        addSelectAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'select',
                answer: action.payload.answer,
                question: action.payload.question
            })
        },
        addCheckboxAction: (state, action) => {
            const actionIndexes = action.payload.actionIndexes;
            let tempAction = state.testcases[action.payload.testcaseIndex]; 
            actionIndexes.forEach(index => {
                tempAction = tempAction.actions[index];
            })
            tempAction.actions.push({
                type: 'checkbox',
                describedLocator: action.payload.locator,
                value: action.payload.value
            })
        }
    }
 
})

export const { addTestCase, addOpenURLAction, changeURL, changeFlow, addMultipleActions, changeTestCaseName, addFlowDescribe, addAndAction, addOrAction, addClickAction, addInputAction, addVerifyURLAction, changeExpectedURL, chageFlow, changeDescribedLocator, setVerifyActionExist, changeValue, deleteAction, toogleSelectAction, addAssertUrlAction, addAssertElementAction, addSelectAction, addCheckboxAction } = testActionSlice.actions;

export default testActionSlice.reducer;