import EventEmitter from "events";
import { CardEvent } from "../../src/daemon/event";

export class MockCardReaderDevice extends EventEmitter {
    protected on_insert_callback?: (...args: any[]) => void;
    protected on_remove_callback?: (...args: any[]) => void;

    public override on(event: string | symbol, callback?: (...args: any[]) => void): this {
        if (event === "card-inserted") {
            this.on_insert_callback = callback;
        }
        if (event === "card-removed") {
            this.on_remove_callback = callback;
        }
        return this
    }

    public insert_card(event: CardEvent): void {
        if (this.on_insert_callback === undefined) {
            throw Error("Attempted to insert card without callback");
        }
        this.on_insert_callback(event)
    }

    public remove_card(event: CardEvent): void {
        if (this.on_remove_callback === undefined) {
            throw Error("Attempted to insert card without callback");
        }
        this.on_remove_callback(event)
    }
}
