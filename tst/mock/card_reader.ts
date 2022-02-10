import EventEmitter from "events";
import { CardReaderEvent } from "../../src/daemon/event";

export class MockCardReader extends EventEmitter {
    protected on_activation_callback?: (...args: any[]) => void;
    protected on_deactivation_callback?: (...args: any[]) => void;

    public override on(event: string | symbol, callback?: (...args: any[]) => void): this {
        if (event === "device-activated") {
            this.on_activation_callback = callback;
        }
        if (event === "device-deactivated") {
            this.on_deactivation_callback = callback;
        }
        return this
    }

    public activate_device(event: CardReaderEvent): void {
        if (this.on_activation_callback === undefined) {
            throw Error("Attempted to activate device without callback");
        }
        this.on_activation_callback(event);
    }

    public deactivate_device(event: CardReaderEvent): void {
        if (this.on_deactivation_callback === undefined) {
            throw Error("Attempted to deactivate device without callback");
        }
        this.on_deactivation_callback(event);
    }
}
