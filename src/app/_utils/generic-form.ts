import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

export abstract class GenericForm {
    public form: FormGroup;

    abstract getFormGroup(data?: any): FormGroup;

    valid(name: any): any {
        let element = this.form.get(name);
        let dirty = element.dirty || element.touched;
        if (!dirty) {
            return true;
        }
        return element.valid;
    }

}