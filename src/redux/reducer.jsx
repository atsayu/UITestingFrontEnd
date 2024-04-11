const initialState = {
    testcases: [],
}


export const reducer = (state = initialState, action) => {
    let testcases = state.testcases;
    let actions;
    switch (action.type) {
        case 'ADD_TEST_CASE':
            return {
                testcases: [...state.testcases, {
                    actions: []
                }]
            }
        case 'ADD_ACTION_CLICK':
            testcases[action.testCaseIndex].actions = [...testcases[action.testCaseIndex].actions, {
                type: 'click',
                target: action.target ? action.target : ''
            }]
            return {
                testcases
            }
        case 'CHANGE_ACTION_CLICK_TARGET':
            console.log('change target')
            actions = [...testcases[action.testCaseIndex].actions];
            actions[action.actionIndex].target = action.newTarget;
            testcases[action.testCaseIndex].actions = actions;
            return {
                testcases
            }
        case 'ADD_EXPRESSION_AND':
            testcases[action.testCaseIndex].actions = [...testcases[action.testCaseIndex].actions, {
                type: 'and',
                actions: action.actions ? action.actions : []
            }]
            return {
                testcases
            }
        default:
            return state;
    }
    
}