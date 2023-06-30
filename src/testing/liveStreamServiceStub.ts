import { of } from "rxjs";
import { LiveStreamEvent } from "src/app/models/liveStreamEvent";

export class LiveStreamServiceStub {
  
    addLiveStreamEvent(liveStreamEvent :LiveStreamEvent) {
        console.log("addEvent() from stub is called");
        return of({} as LiveStreamEvent);
    }
}
