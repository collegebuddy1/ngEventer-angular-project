import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

 @Component({
     templateUrl: './profile.component.html',
     styles: [`
        em { float:right; color:#E05C65; padding-left: 10px; }
        .error input { background-color: #E3C3C5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error :ms-input-placeholder { color: #999; }
     `]
 })
 export class ProfileComponent implements OnInit {
    profileForm:FormGroup;
    private _firstName:FormControl;
    private _lastName:FormControl;

    constructor(private authService:AuthService,
                private router:Router,
                @Inject(TOASTR_TOKEN) private toastr:Toastr) {

    }

    ngOnInit() {
        this._firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this._lastName = new FormControl(this.authService.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
        this.profileForm = new FormGroup({
            firstName: this._firstName,
            lastName: this._lastName
        })
    }

    get firstName(): FormControl {
        return this._firstName;
    }

    get lastName(): FormControl {
        return this._lastName;
    }

    saveProfile(formValues) {
        if(this.profileForm.valid) {
            this.authService.updateCurrentUser(formValues._firstName, formValues._lastName);
            this.toastr.success('Profile saved')
        }
    }

    cancel() {
        this.router.navigate(['events']);
    }

    validateFirstName(): boolean {
        return this._firstName.valid || this._firstName.untouched
    }

    validateLastName(): boolean {
        return this._lastName.valid || this._lastName.untouched
    }
 }