const difficultyText = [
    '尚未评定', '入门', '普及-', '普及/提高-', '普及+/提高',
    '提高+/省选-', '省选/NOI-', 'NOI/NOI+/CTSC'
];

const judgeStatusText = [
    'Waiting', 'Accepted', 'Compile Error', 'System Error',
    'Unaccepted', 'Unknown Error'
];

const testCaseStatusText = [
    'Waiting', 'Accepted', 'Compile Error', 'Compile Memory Limit Exceeded',
    'Compile Time Limit Exceeded', 'Memory Limit Exceeded', 'Output Limit Exceeded',
    'Presentation Error', 'Runtime Error', 'System Error', 'Time Limit Exceeded',
    'Unknown Error', 'Wrong Answer'
];

const TestCaseStatus = {
    NO_STATUS: 0,
    ACCEPTED: 1,
    COMPILE_ERROR: 2,
    COMPILE_MEMORY_LIMIT_EXCEEDED: 3,
    COMPILE_TIME_LIMIT_EXCEEDED: 4,
    MEMORY_LIMIT_EXCEEDED: 5,
    OUTPUT_LIMIT_EXCEEDED: 6,
    PRESENTATION_ERROR: 7,
    RUNTIME_ERROR: 8,
    SYSTEM_ERROR: 9,
    TIME_LIMIT_EXCEEDED: 10,
    UNKNOWN_ERROR: 11,
    WRONG_ANSWER: 12
};

const JudgeStatus = {
    NO_STATUS: 0,
    ACCEPTED: 1,
    COMPILE_ERROR: 2,
    SYSTEM_ERROR: 3,
    UNACCEPTED: 4,
    UNKNOWN_ERROR: 5
};

const sexText = ['其他', '男', '女'];

export {
    difficultyText, judgeStatusText, testCaseStatusText, sexText,
    TestCaseStatus, JudgeStatus
};
