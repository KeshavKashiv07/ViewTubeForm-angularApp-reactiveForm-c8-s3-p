import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LiveStreamEvent } from '../models/liveStreamEvent';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {

  constructor(private httpClient:HttpClient) { }
  url: string = "http://localhost:3000/events"

  addLiveStreamEvent(event:LiveStreamEvent):Observable<LiveStreamEvent>{
    return this.httpClient.post<LiveStreamEvent>(this.url,event);
  }

}
