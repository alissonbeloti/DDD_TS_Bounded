import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer/customer-created.event";
import CustomerAddressUpdatedEvent from "../customer/customer-updated-address.event";
import SendConsoleLogWhenCustomerAddressIsUpdatedHandler from "../customer/handler/send-console-log-customer-address-updated.handler";
import SendConsoleLogWhenCustomerIsCreatedHandler from "../customer/handler/send-console-log-customer-created.handler";
import SendConsoleLogWhenCustomerIsCreated2Handler from "../customer/handler/send-console-log-customer-created2.handler";
import SendEmailWhenProductIsCreateHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler =  new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler =  new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all events handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler =  new SendEmailWhenProductIsCreateHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler =  new SendEmailWhenProductIsCreateHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
                    name: "Product 1",
                    description: "Product 1 description",
                    price: 10.0,
                    createAt: new Date()
        })

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify all event handlers of customer", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler =  new SendConsoleLogWhenCustomerIsCreatedHandler();
        const eventHandler2 =  new SendConsoleLogWhenCustomerIsCreated2Handler();
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
            .toMatchObject(eventHandler);
        var customer = new Customer("123", "Customer 1")
        const customerCreatedEvent = new CustomerCreatedEvent({
                    name: customer.name,
                    customer: customer,
                    createAt: new Date()
        })

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify event handler of customer address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler =  new SendConsoleLogWhenCustomerIsCreatedHandler();
        const eventHandler2 =  new SendConsoleLogWhenCustomerIsCreated2Handler();
        const addressEventHandler = new SendConsoleLogWhenCustomerAddressIsUpdatedHandler();

        const spyAddressEventHandler = jest.spyOn(addressEventHandler, "handle")

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerAddressUpdatedEvent", addressEventHandler);

        var customer = new Customer("123", "Customer 1")
        const customerCreatedEvent = new CustomerCreatedEvent({
                    name: customer.name,
                    customer: customer,
                    createAt: new Date()
        })

        eventDispatcher.notify(customerCreatedEvent);
        customer.changeAddress(new Address("Rua Nova", 123, "18258-314", "Sorocaba"))

        const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent(
            {
                id : customer.id,
                nome: customer.name,
                endereco: customer.address.toString()
            }
        )
        eventDispatcher.notify(customerAddressUpdatedEvent);

        expect(spyAddressEventHandler).toHaveBeenCalled();
        
    });
})