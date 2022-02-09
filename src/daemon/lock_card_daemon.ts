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
        if (event.card.getAtr() !== this.card_id) {
            return;
        }
        console.log(`Unlocking`);
        exec(this.unlock_cmd);
    }

    protected on_card_removed(event: CardEvent): void {
        if (event.card.getAtr() !== this.card_id) {
            return;
        }
        console.log(`Locking`);
        exec(this.lock_cmd);
    }
}
