import { exec } from "child_process";

import { Executor } from "./executor";

export class SystemCommandExecutor implements Executor {
    public exec(command: string): void {
        exec(command);
    }
}
