
export /**
 * TestCase
 */
    class TestCase {

    _id: string;
    title: string;
    description: string;
    executable: boolean;
    version: string;
    projectId: string;
    status: string;
    executionType: ExecutionType;
    testSteps: TestStep[];
    parentId: string;
    parent: TestCase;
    isParent: boolean;

    constructor() {
        this.testSteps = [];
    }
}

export /**
 * TestStep
 */
    class TestStep {
    status: TestStepStatus = TestStepStatus.Pending;
    action: string = '';
    payload: string = '';
    expected: string = '';
    comment: string = '';
    artifacts: any[];
    updatedAt: Date;

    constructor() {
        this.artifacts = [];
    }
}

export
    enum TestStepStatus {
    Failed = 'FAILED',
    Successful = 'SUCCESSFUL',
    Pending = 'PENDING'
}


export enum ExecutionType {
    Automated = 'AUTOMATED',
    Manual = 'MANUAL',
    ManualAutomated = 'MANUAL_AUTOMATED'
}

