import { MockCardReader, MockCardReaderDevice, MockCard, MockExecutor } from "./mock";
import { LockCardDaemon } from "../src/daemon";
import { SystemEnvironment } from "../src/io";

describe("Card daemon", () => {
    it("detects inserts and removals", () => {
        const card_reader = new MockCardReader();
        const card_reader_device = new MockCardReaderDevice();
        const environment = new SystemEnvironment(["LOCK_CMD", "UNLOCK_CMD"], {"LOCK_CMD": "lock", "UNLOCK_CMD": "unlock"})
        const executor = new MockExecutor();

        new LockCardDaemon("my_card_id", environment, card_reader, executor).start();

        card_reader.activate_device({ device: card_reader_device })
        card_reader_device.insert_card({ card: new MockCard("my_card_id") })
        card_reader_device.remove_card({ card: new MockCard("my_card_id") })
        card_reader_device.insert_card({ card: new MockCard("not_my_card_id") })
        card_reader_device.remove_card({ card: new MockCard("not_my_card_id") })
        card_reader.deactivate_device({ device: card_reader_device })

        card_reader.activate_device({ device: undefined })
        card_reader.deactivate_device({ device: undefined })


        expect(executor.get_executed_commands()).toStrictEqual(["unlock", "lock"])
    });
});
