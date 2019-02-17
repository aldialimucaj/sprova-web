import { TestCase } from 'app/_models';
import { CycleService } from 'app/_services';

export /**
 * Cycle
 */
    class Cycle {
    _id: string;
    title: string;
    description: string;
    remarks: any;
    projectId: string;
    status: CycleStatus;
    testCases: string[];

    constructor() {
        this.status = CycleStatus.Active;
        this.testCases = [];
    }
}

export enum CycleStatus {
    Active = 'ACTIVE',
    Abandoned = 'ABANDONED',
    Finished = 'FINISHED',
    Planned = 'PLANNED'
}
