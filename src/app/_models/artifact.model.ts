import { TestCase } from 'app/_models';
import { ArtifactService } from 'app/_services';

export /**
 * Artifact
 */
    class Artifact {
    _id: string;
    title: string;
    description: string;
    fileName: any;
    artifactType: ArtifactType;
    executionId: string;
    cycleId: string;

    constructor() {
    }
}

export enum ArtifactType {
    TESTCASE = 'TESTCASE',
    EXECCUTION = 'EXECUTION',
    OTHER = 'OTHER'
}
