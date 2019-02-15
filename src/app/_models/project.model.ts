export /**
 * Project
 */
    class Project {
    _id: String;
    title: String;
    description: String;
    status: String;
    cycleFields: CycleExtraField[];
    testCaseFields: TestCaseExtraField[];

    constructor() {
        this.cycleFields = [];
        this.testCaseFields = [];
    }
}


export class TestSetExtraField {
    public title: string = '';
    public type: ExtraFieldType = ExtraFieldType.String;
    public key: string = '';

}

export class CycleExtraField {
    public title: string = '';
    public type: ExtraFieldType = ExtraFieldType.String;
    public key: string = '';

}

export class TestCaseExtraField {
    public title: string = '';
    public type: ExtraFieldType = ExtraFieldType.String;
    public key: string = '';

}

export enum ExtraFieldType {
    String = "String",
    Number = "Number",
    Select = "Select",
    Date = "Date"
}
