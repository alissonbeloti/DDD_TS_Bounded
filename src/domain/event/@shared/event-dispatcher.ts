import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface []} = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
       const eventName = event.constructor.name;
       
       if (this.eventHandlers[eventName]) {
        this.eventHandlers[eventName].forEach((eventHandler) => {
            eventHandler.handle(event);
        })
       }
    }
    register(eventName: string, eventHander: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHander);
    }
    unregister(eventName: string, eventHander: EventHandlerInterface<EventInterface>): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHander);
            if (index > -1) {
                this.getEventHandlers[eventName].splice(index, 1)
            }
        }
    }
    unregisterAll(): void {
        this.eventHandlers = {};
    }

}