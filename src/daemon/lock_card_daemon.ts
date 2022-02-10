import { EventEmitter } from "stream";
import { SystemEnvironment, Executor } from "../io";
import { CardDaemon } from "./card_daemon";
import { CardEvent } from "./event";

export class LockCardDaemon extends CardDaemon {
    protected card_id: string;
    protected lock_cmd: string;
    protected unlock_cmd: string;
    protected command_executor: Executor;

    public constructor(card_id: string, environment: SystemEnvironment, card_reader: EventEmitter, command_executor: Executor) {
        super(card_reader);
        this.card_id = card_id;
        this.lock_cmd = environment.get("LOCK_CMD")
        this.unlock_cmd = environment.get("UNLOCK_CMD")
        this.command_executor = command_executor;
    }

    protected on_card_inserted(event: CardEvent): void {
        if (this.is_card_event_valid(event)) {
            console.log(`Unlocking`);
            this.command_executor.exec(this.unlock_cmd);
        }
    }

    protected on_card_removed(event: CardEvent): void {
        if (this.is_card_event_valid(event)) {
            console.log(`Locking`);
            this.command_executor.exec(this.lock_cmd);
        }
    }

    protected is_card_event_valid(event: CardEvent): boolean {
        return event.card.getAtr() === this.card_id;
    }
}
