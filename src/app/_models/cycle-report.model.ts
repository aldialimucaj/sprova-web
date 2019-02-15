import { Entity } from "./entity";
import { TestCase } from "./testcase.model";
import { Cycle } from "./cycle.model";
import { TestSet } from "./testset.model";
import { Execution } from "./execution.model";

export /**
 * CycleReport
 */
class CycleReport extends Entity {
    cycle: Cycle;
    testCases: TestCase[];
    testSets: TestSet[];
    executions: Execution[];
}
