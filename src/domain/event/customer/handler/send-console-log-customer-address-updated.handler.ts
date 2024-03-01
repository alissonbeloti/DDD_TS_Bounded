import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-updated-address.event";

export default class SendConsoleLogWhenCustomerAddressIsUpdatedHandler implements EventHandlerInterface<CustomerAddressUpdatedEvent> {
    handle(event: CustomerAddressUpdatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id},  ${event.eventData.nome} alterado para:  ${event.eventData.endereco}`);
    }
}