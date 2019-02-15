import { User } from "./user.model";
import { ExecutionType } from "./testcase.model";

export /**
 * TestSet
 */
    class TestSetExecution {
    _id: string;
    title: string;
    description: string;
    testSetId: string;
    cycleId: string;
    status: TestSetExecutionStatus;
    createdAt: Date;
    updatedAt: Date;
    startedAt: Date;
    finishedAt: Date;
    executedBy: User;
    executionType: ExecutionType;
    
    constructor(title: string, desc: string, testSetId: string, cycleId: string) {
        this.title = title;
        this.description = desc;
        this.testSetId = testSetId;
        this.cycleId = cycleId;
        this.status = TestSetExecutionStatus.Planned;
    }
}

export enum TestSetExecutionStatus {
    Running = 'RUNNING',
    Abandoned = 'ABANDONED',
    Finished = 'FINISHED',
    Planned = 'PLANNED'
}
