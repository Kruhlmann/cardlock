import { CardDaemon } from "./card_daemon";
import { CardEvent } from "./event";

export class QueryCardDaemon extends CardDaemon {
    protected on_card_inserted(event: CardEvent): void {
        console.log(`Card inserted: "${event.card.getAtr()}"`);
    }

    protected on_card_removed(event: CardEvent): void {
        console.log(`Card removed: "${event.card.getAtr()}"`);
    }
}
