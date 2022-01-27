import { EventEmitter } from "node:events";
import { Devices } from "smartcard";

import { CardEvent } from "./card_event";
import { CardReaderEvent } from "./card_reader_event";

export abstract class CardDaemon {
    protected card_reader: EventEmitter;

    public constructor() {
        this.card_reader = new Devices();
    }

    public start(): void {
        this.card_reader.on("device-activated", (event: CardReaderEvent) => this.setup_card_listeners(event));
        this.card_reader.on("device-deactivated", () => this.teardown_card_listeners());
    }

    protected setup_card_listeners(event: CardReaderEvent): void {
        console.log(`Detected card reader "${event.device}"`);
        event.device.on("card-inserted", (event: CardEvent) => this.on_card_inserted(event));
        event.device.on("card-removed", (event: CardEvent) => this.on_card_removed(event));
    }

    protected teardown_card_listeners(): void {
        console.log("Connection to card reader destroyed.");
    }

    protected abstract on_card_inserted(event: CardEvent): void;
    protected abstract on_card_removed(event: CardEvent): void;
}
