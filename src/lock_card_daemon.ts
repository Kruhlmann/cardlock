import { exec } from "child_process";
import { CardDaemon } from "./card_daemon";
import { CardEvent } from "./card_event";

export class LockCardDaemon extends CardDaemon {
    protected card_id: string;
    protected lock_cmd: string;
    protected unlock_cmd: string;

    public constructor(card_id: string) {
        super();
        this.card_id = card_id;
        this.lock_cmd = process.env.LOCK_CMD || "betterlockscreeen -l";
        this.unlock_cmd = process.env.UNLOCK_CMD || "pkill i3lock";
    }

    protected on_card_inserted(event: CardEvent): void {
        if (event.card.getAtr() !== this.card_id) {
            return;
        }
        exec(this.unlock_cmd);
    }

    protected on_card_removed(event: CardEvent): void {
        if (event.card.getAtr() !== this.card_id) {
            return;
        }
        exec(this.lock_cmd);
    }
}
