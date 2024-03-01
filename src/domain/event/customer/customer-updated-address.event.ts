import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export default class CustomerAddressUpdatedEvent implements EventInterface {
    dataTimeOccured: Date;
    eventData: any;

    constructor(eventData: any){
        this.dataTimeOccured = new Date();
        this.eventData = eventData;
    }
}