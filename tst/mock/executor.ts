import { Executor } from "../../src/io";

export class MockExecutor implements Executor {
    protected commands_executed: string[];

    public constructor() {
        this.commands_executed = [];
    }

    public exec(command: string): void {
        this.commands_executed.push(command);
    }

    public get_executed_commands(): string[] {
        return this.commands_executed;
    }
}
