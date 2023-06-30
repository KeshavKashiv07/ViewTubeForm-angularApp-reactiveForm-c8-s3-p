import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveStreamEvent } from '../models/liveStreamEvent';
import { LiveStreamService } from '../services/livestream.service';

@Component({
  selector: 'app-studio-livestream',
  templateUrl: './studio-livestream.component.html',
  styleUrls: ['./studio-livestream.component.css']
})
export class StudioLivestreamComponent implements OnInit {

constructor (private snackBar: MatSnackBar , private eventService : LiveStreamService){ }

  liveStreamForm = new FormGroup({
    eventTitle: new FormControl('' , [Validators.required,Validators.maxLength(100)]),
    eventDate: new FormControl('',[Validators.required]),
    fromTime: new FormControl('' ,[Validators.required]),
    toTime: new FormControl('' ,[Validators.required]),
    description: new FormControl(''),
    guests: new FormControl('',[Validators.required , this.checkIfGuestEmailsAreValid])
  });

  minDate : Date = new Date();

  timeValues : string[] = [
  "00:00", "00:15", "00:30", "00:45", 
  "01:00", "01:15", "01:30", "01:45", 
  "02:00", "02:15", "02:30", "02:45", 
  "03:00", "03:15", "03:30", "03:45", 
  "04:00", "04:15", "04:30", "04:45", 
  "05:00", "05:15", "05:30", "05:45", 
  "06:00", "06:15", "06:30", "06:45", 
  "07:00", "07:15", "07:30", "07:45", 
  "08:00", "08:15", "08:30", "08:45", 
  "09:00", "09:15", "09:30", "09:45", 
  "10:00", "10:15", "10:30", "10:45", 
  "11:00", "11:15", "11:30", "11:45", 
  "12:00", "12:15", "12:30", "12:45", 
  "13:00", "13:15", "13:30", "13:45", 
  "14:00", "14:15", "14:30", "14:45", 
  "15:00", "15:15", "15:30", "15:45", 
  "16:00", "16:15", "16:30", "16:45", 
  "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45", 
  "19:00", "19:15", "19:30", "19:45", 
  "20:00", "20:15", "20:30", "20:45", 
  "21:00", "21:15", "21:30", "21:45", 
  "22:00", "22:15", "22:30", "22:45", 
  "23:00", "23:15", "23:30", "23:45"  ];

  guestList?: string[] = [];

  get eventTitle(){
    return this.liveStreamForm.get('eventTitle');
  }

  get eventDate(){
    return this.liveStreamForm.get('eventDate');
  }

  get fromTime(){
    return this.liveStreamForm.get('fromTime');
  }

  get toTime(){
    return this.liveStreamForm.get('toTime');
  }

  get description(){
    return this.liveStreamForm.get('description');
  }

  get guests(){
    return this.liveStreamForm.get('guests');
  }

  ngOnInit(): void {
    this.liveStreamForm.controls['guests'].valueChanges.subscribe( (guestEmails) => { this.guestList= guestEmails?.split(',');
    });
  }

  checkIfGuestEmailsAreValid(item: AbstractControl) {
    if (item.value !== '') {
      const emailString = item.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (anyInvalidEmail === false) {
        return { invalidGuestEmails: true }
      }
    }
    return null;
  }

  onSubmit() {
    let eventsValues: LiveStreamEvent = this.liveStreamForm.value as LiveStreamEvent;
    this.eventService.addLiveStreamEvent(eventsValues).subscribe({
      next: data => {
        this.snackBar.open('Congrats!!You have submiited the form!!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      },
      error: err => {
        this.snackBar.open('Failed to register user !! Please Try Again Later', 'Failure', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    });
  }

}
