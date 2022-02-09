import { exec } from "child_process";
import { SystemEnvironment } from "../io";
import { CardDaemon } from "./card_daemon";
import { CardEvent } from "./event";

export class LockCardDaemon extends CardDaemon {
    protected card_id: string;
    protected lock_cmd: string;
    protected unlock_cmd: string;

    public constructor(card_id: string, environment: SystemEnvironment) {
        super();
        this.card_id = card_id;
        this.lock_cmd = environment.get("LOCK_CMD")
        this.unlock_cmd = environment.get("UNLOCK_CMD")
    }

    protected on_card_inserted(event: CardEvent): void {
        if (this.is_card_event_valid(event)) {
            console.log(`Unlocking`);
            exec(this.unlock_cmd);
        }
    }

    protected on_card_removed(event: CardEvent): void {
        if (this.is_card_event_valid(event)) {
            console.log(`Locking`);
            exec(this.lock_cmd);
        }
    }

    protected is_card_event_valid(event: CardEvent): boolean {
        try {
            const card_id = event.card.getAtr();
            const card_id_exists = card_id !== undefined:
            const card_is_known = card_id === this.card_id;
            return card_id_exists && card_is_known;
        } catch {
            return false;
        }

    }
}
