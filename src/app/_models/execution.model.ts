import { TestStep, User, ExecutionType } from "app/_models";

export /**
 * Execution
 */
    class Execution {
    // identification
    _id: string;
    testCaseId: string;
    cycleId: string;
    testSetExecutionId: string;
    title: string;
    description: string;
    user: User;

    // status related
    status: ExecutionStatus;
    testSteps: TestStep[];
    executionType: ExecutionType;

    // time related

    // when it was created or planned to be executed
    createdAt: Date; 
    // last time it was updated about anything
    updatedAt: Date;
    // first time the status changes
    startedAt: Date;
    // when it gets a final status like failed or successful
    finishedAt: Date;

    /**
     * Create new execution with default status set to pending.
     * @param testCaseId ID to reference test case
     * @param cycleId ID to reference cycle
     */
    constructor(testCaseId: string, cycleId: string, testSetExecutionId: string) {
        this.status = ExecutionStatus.Pending
        this.testCaseId = testCaseId;
        this.cycleId = cycleId;
        this.testSetExecutionId = testSetExecutionId;
    }
}

export enum ExecutionStatus {
    Failed = "FAILED",
    Successful = "SUCCESSFUL",
    Pending = "PENDING",
    Working = "WORKING"
}