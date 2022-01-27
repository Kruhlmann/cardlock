import { CardEvent } from "./card_event";

export type CardReaderEvent = {
    device: {
        on(event_code: string, event_handler: (event: CardEvent) => void): void;
    };
}
