import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession, restrictedWords } from '../shared/index';

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styles: [`
    em { float:right; color:#E05C65; padding-left: 10px; }
    .error input, .error select, .error textarea { background-color: #E3C3C5; }
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder { color: #999; }
 `]
})
export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession = new EventEmitter();
    @Output() cancelAddSession = new EventEmitter();
    newSessionForm: FormGroup;
    private _name: FormControl;
    private _presenter: FormControl;
    private _duration: FormControl;
    private _level: FormControl;
    private _abstract: FormControl;

    get name(): FormControl {
        return this._name;
    }

    get presenter(): FormControl {
        return this._presenter;
    }

    get duration(): FormControl {
        return this._duration;
    }

    get level(): FormControl {
        return this._level;
    }

    get abstract(): FormControl {
        return this._abstract;
    }

    ngOnInit() {
        this._name = new FormControl('', Validators.required);
        this._presenter = new FormControl('', Validators.required);
        this._duration = new FormControl('', Validators.required);
        this._level = new FormControl('', Validators.required);
        this._abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);

        this.newSessionForm = new FormGroup({
            name: this._name,
            presenter: this._presenter,
            duration: this._duration,
            level: this._level,
            abstract: this._abstract
        });
    }

    saveSession(formValues) {
        let session: ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: []
        };
        this.saveNewSession.emit(session);
    }

    cancel() {
        this.cancelAddSession.emit();
    }
}
