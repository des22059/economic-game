import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ScriptsService } from 'src/app/core/services/scripts.service';

import { Script } from '../../core/models/script.model';
import { Job } from '../../core/models/job.model';
import { Bank } from 'src/app/core/models/bank.model';
import { Item } from 'src/app/core/models/item.model';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Period } from 'src/app/core/models/period.model';

import { NgxSpinnerService } from "ngx-spinner";

declare const bootstrap: { Modal: { getInstance: (arg0: HTMLElement) => any; }; };

@Component({
    selector: 'app-script',
    templateUrl: './script.component.html',
    styleUrls: ['./script.component.scss']
})

export class ScriptComponent implements OnInit {
    faTimes = faTimes;
    faSortUp = faSortUp;
    faSortDown = faSortDown;

    scripts: Script[] = [];
    scriptForm: FormGroup;
    scriptSubmitted = false;

    banks: Bank[] = localStorage.getItem('banks') ? JSON.parse(localStorage.getItem('banks')) : [];
    bankForm: FormGroup;
    bankSubmitted = false;

    jobTypes = localStorage.getItem('jobTypes') ? JSON.parse(localStorage.getItem('jobTypes')) : [];
    jobTypeForm: FormGroup;
    jobTypeSubmitted = false;

    jobs: Job[] = localStorage.getItem('jobs') ? JSON.parse(localStorage.getItem('jobs')) : [];
    jobForm: FormGroup;
    jobSubmitted = false;

    items: Item[] = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    itemForm: FormGroup;
    itemSubmitted = false;

    periods: Period[] = localStorage.getItem('periods') ? JSON.parse(localStorage.getItem('periods')) : [];
    periodForm: FormGroup;
    periodSubmitted = false;

    constructor(
        private _scriptsService: ScriptsService,
        private _formBuilder: FormBuilder,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.scriptForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        });

        this.bankForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            creditAvailable: new FormControl(false),
            creditRate: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
            depositAvailable: new FormControl(false),
            depositRate: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
        });

        this.jobTypeForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        });

        this.jobForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            salaryConfirmationType: new FormControl(false),
            salary: new FormControl(null, [Validators.required, Validators.min(0)]),
            jobTypeName: new FormControl(null, Validators.required),
        });

        this.itemForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            price: new FormControl(null, [Validators.required, Validators.min(0)]),
        });

        this.periodForm = this._formBuilder.group({
            duration: new FormControl(null, [Validators.required, Validators.min(0)]),
            manualStart: new FormControl(false),
        });

        this.getAllScripts();
    }

    get fs() { return this.scriptForm.controls; }
    get fb() { return this.bankForm.controls; }
    get fj() { return this.jobForm.controls; }
    get fjt() { return this.jobTypeForm.controls; }
    get fi() { return this.itemForm.controls; }
    get fp() { return this.periodForm.controls; }

    getAllScripts() {
        this.spinner.show();
        this._scriptsService.getAll().subscribe({
            next: (scripts) => {
                this.scripts = scripts;
                this.spinner.hide();
            },
            error: response => {
                this.spinner.hide();
            }
        })
    }

    addBank() {
        this.bankSubmitted = true;

        if (this.bankForm.invalid) {
            return;
        }

        this.fb.creditRate.setValue(this.fb.creditRate.value / 100);
        this.fb.depositRate.setValue(this.fb.depositRate.value / 100);

        this.banks.push(this.bankForm.value)
        localStorage.setItem('banks', JSON.stringify(this.banks));
        let bankModalEl = document.getElementById('bankModal')
        let modal = bootstrap.Modal.getInstance(bankModalEl)
        modal.hide()

        this.bankForm.reset();

        this.bankSubmitted = false;
    }

    addJobType() {
        this.jobTypeSubmitted = true;

        if (this.jobTypeForm.invalid) {
            return;
        }

        this.jobTypes.push(this.jobTypeForm.value);
        localStorage.setItem('jobTypes', JSON.stringify(this.jobTypes));
        let jobTypeModalEl = document.getElementById('jobTypeModal')
        let modal = bootstrap.Modal.getInstance(jobTypeModalEl)
        modal.hide()

        this.jobTypeForm.reset();

        this.jobTypeSubmitted = false;
    }

    addJob() {
        this.jobSubmitted = true;

        if (this.jobForm.invalid) {
            return;
        }

        let jobToPush = {
            id: '',
            name: this.fj.name.value,
            description: '',
            jobTypeName: this.fj.jobTypeName.value.name,
            salaryConfirmationType: this.fj.salaryConfirmationType.value
                ? 'BY_MODERATOR'
                : 'NONE',
            salary: this.fj.salary.value
        }
        this.jobs.push(jobToPush);
        localStorage.setItem('jobs', JSON.stringify(this.jobs));
        let jobModalEl = document.getElementById('jobModal')
        let modal = bootstrap.Modal.getInstance(jobModalEl)
        modal.hide()

        this.jobForm.reset();

        this.jobSubmitted = false;
    }

    addItem() {
        this.itemSubmitted = true;

        if (this.itemForm.invalid) {
            return;
        }

        this.items.push(this.itemForm.value);
        localStorage.setItem('items', JSON.stringify(this.items));
        let itemModalEl = document.getElementById('itemModal')
        let modal = bootstrap.Modal.getInstance(itemModalEl)
        modal.hide()

        this.itemForm.reset();

        this.itemSubmitted = false;
    }

    addPeriod() {
        this.periodSubmitted = true;

        if (this.periodForm.invalid) {
            return;
        }

        this.periods.push(this.periodForm.value);
        localStorage.setItem('periods', JSON.stringify(this.periods));
        let periodModalEl = document.getElementById('periodModal')
        let modal = bootstrap.Modal.getInstance(periodModalEl)
        modal.hide()

        this.periodForm.reset();

        this.periodSubmitted = false;
    }

    onScriptSubmit() {
        this.scriptSubmitted = true;

        if (!this.scriptForm.valid) {
            return;
        }

        let script: Script = {
            description: '',
            name: this.scriptForm.get('name').value,
            entities: {
                banks: this.banks,
                items: this.items,
                jobTypes: this.jobTypes,
                jobs: this.jobs,
                periods: this.periods.map((x, i) => {
                    return {
                        duration: x.duration,
                        manualStart: x.manualStart,
                        order: i
                    }
                }),
            }
        }
        this.spinner.show();
        this._scriptsService.save(script).subscribe({
            next: (data) => {
                console.log('success')
                localStorage.removeItem('banks');
                localStorage.removeItem('jobTypes');
                localStorage.removeItem('jobs');
                localStorage.removeItem('items');
                localStorage.removeItem('periods');

                let scriptModalEl = document.getElementById('scriptModal')
                let modal = bootstrap.Modal.getInstance(scriptModalEl)
                modal.hide()

                this.scriptForm.reset();

                this.bankForm.reset();
                this.jobTypeForm.reset();
                this.jobForm.reset();
                this.itemForm.reset();
                this.periodForm.reset();

                this.banks = [];
                this.jobTypes = [];
                this.jobs = [];
                this.items = [];
                this.periods = [];
                this.spinner.hide();
                this.getAllScripts();
            },
            error: response => {
                this.spinner.hide();
            }
        });

        this.scriptSubmitted = false;
    }

    swapOrder(pos1: number, pos2: number) {
        var temp = this.periods[pos1];
        this.periods[pos1] = this.periods[pos2];
        this.periods[pos2] = temp;
        localStorage.setItem('periods', JSON.stringify(this.periods));
    }

    deleteScript(id: number) {

    }
}