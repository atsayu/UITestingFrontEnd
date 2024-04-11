

export function addTestCaseEvent(userActions) {
    return {
        type: 'ADD_TEST_CASE',
        userActions
    }
}

export function addUserClickActionEvent(testCaseIndex, target) {
    return {
        type: 'ADD_ACTION_CLICK',
        testCaseIndex,
        target
        
    }
}

export function changeUserClickActionTarget(testCaseIndex, actionIndex, newTarget) {
    return {
        type: 'CHANGE_ACTION_CLICK_TARGET',
        testCaseIndex,
        actionIndex,
        newTarget
    }
}

export function addUserAndExpressionEvent(testCaseIndex, children) {
    return {
        type: 'ADD_EXPRESSION_AND',
        testCaseIndex,
        children
    }
}