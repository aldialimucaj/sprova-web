export /**
 * TestSet
 */
    class TestSet {
    _id: string;
    title: string;
    description: string;
    projectId: string;
    cycleId: string;
    status: TestSetStatus;
    testCases: string[];

    constructor() {
        this.status = TestSetStatus.Active;
        this.testCases = [];
    }
}

export enum TestSetStatus {
    Active = 'ACTIVE',
    Abandoned = 'ABANDONED',
    Finished = 'FINISHED',
    Planned = 'PLANNED'
}
