import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LiveStreamService } from 'src/app/services/livestream.service';
import { StudioLivestreamComponent } from 'src/app/studio-livestream/studio-livestream.component';
import { LiveStreamServiceStub } from './liveStreamServiceStub';

describe('StudioLivestreamComponent', () => {
    let component: StudioLivestreamComponent;
    let fixture: ComponentFixture<StudioLivestreamComponent>;
    let liveStreamService:LiveStreamService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudioLivestreamComponent],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                MatToolbarModule,
                MatButtonModule,
                MatInputModule,
                MatDatepickerModule,
                MatNativeDateModule,
                ReactiveFormsModule,
                MatChipsModule,
                MatAutocompleteModule,
                MatSnackBarModule,
                HttpClientModule
            ],
            providers:[{ provide: LiveStreamService, useClass: LiveStreamServiceStub }]
        })
            .compileComponents();
        fixture = TestBed.createComponent(StudioLivestreamComponent);
        component = fixture.componentInstance;
        liveStreamService = TestBed.inject(LiveStreamService);
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create 6 form mat-form-field, 1 mat-datepicker, 2 mat-autcomplete and 1 submit elements', () => {
        const formElement = fixture.debugElement.query(By.css('form'));
        expect(formElement.queryAll(By.css('mat-form-field')).length).toEqual(6);
        expect(formElement.queryAll(By.css('mat-form-field [matInput]')).length).toEqual(6);
        expect(formElement.queryAll(By.css('mat-datepicker')).length).toEqual(1);
        expect(formElement.queryAll(By.css('mat-autocomplete')).length).toEqual(2);
        expect(formElement.queryAll(By.css('button[type="submit"]')).length).toEqual(1);
    });

    it('Live stream event form should be invalid when form fields are empty', () => {
        expect(component.liveStreamForm.valid).toBeFalsy();
        const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[type='submit']");
        fixture.detectChanges();
        expect(submitButton.disabled).toBeTruthy();
    });

    it('Required form fields should have invalid status initially when no values are provided', () => {
        let eventTitle = component.liveStreamForm.controls['eventTitle'];
        expect(eventTitle.valid).toBeFalsy();
        expect(eventTitle?.errors?.['required']).toBeTruthy();

        let eventDate = component.liveStreamForm.controls['eventDate'];
        expect(eventDate.valid).toBeFalsy();
        expect(eventDate?.errors?.['required']).toBeTruthy();

        let fromTime = component.liveStreamForm.controls['fromTime'];
        expect(fromTime.valid).toBeFalsy();
        expect(fromTime?.errors?.['required']).toBeTruthy();

        let toTime = component.liveStreamForm.controls['toTime'];
        expect(toTime.valid).toBeFalsy();
        expect(toTime?.errors?.['required']).toBeTruthy();

        let guestsEmail = component.liveStreamForm.controls['guests'];
        expect(guestsEmail.valid).toBeFalsy();
        expect(guestsEmail?.errors?.['required']).toBeTruthy();

    });

    it('Event title should be invalid when it exceeds more than 100 characters', () => {
        let eventTitle = component.liveStreamForm.controls['eventTitle'];
        eventTitle.setValue('Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, illo! Eir expedita laboriosam totam sed!');
        expect(eventTitle.invalid).toBeTruthy();
        expect(eventTitle.errors?.['maxlength']).toBeTruthy();
    });

    it('Should be invalid when guests email id does not match the specified pattern', () => {
        let email = component.liveStreamForm.controls['guests'];
        email.setValue('elvis@gmail.com,john#gmail.com');
        expect(email.valid).toBeFalsy();
        expect(email?.errors?.['invalidGuestEmails']).toBeTruthy();
    });

    it('Form should be valid if all form control values are valid and submit button should be enabled', () => {
        const eventTitleElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[formControlName='eventTitle']");
        const eventDateElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[formControlName='eventDate']");
        const fromTimeElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[formControlName='fromTime']");
        const toTimeElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("input[formControlName='toTime']");
        const guestEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("textarea[formControlName='guests']");
        const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[type='submit']");

        eventTitleElement.value = "Make Learning esier";
        eventDateElement.value = Date();
        fromTimeElement.value = "10:30";
        toTimeElement.value = "11:30";
        guestEmailElement.value = "john@gmail.com,smith@gmail.com";
        eventTitleElement.dispatchEvent(new Event('input'));
        eventDateElement.dispatchEvent(new Event('input'));
        fromTimeElement.dispatchEvent(new Event('input'));
        toTimeElement.dispatchEvent(new Event('input'));
        guestEmailElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        expect(submitButton.disabled).toBeFalsy();
        const errors = fixture.debugElement.queryAll(By.css("mat-error"));
        expect(errors.length).toEqual(0);
        const compiled = fixture.debugElement.nativeElement;
        expect(fixture.debugElement.query(By.css('button[type="submit"]'))
            .triggerEventHandler('submit', compiled)).toBeUndefined();
        expect(component.liveStreamForm.valid).toEqual(true);
    })
});
