import { Entity } from "./entity";
import { Project } from "./project.model";
import { TestCase } from "./testcase.model";
import { Cycle } from "./cycle.model";

export /**
 * ProjectReport
 */
class ProjectReport extends Entity {
    project: Project;
    testCases: TestCase[];
    cycles: Cycle[];
}
