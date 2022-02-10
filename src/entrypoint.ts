#!/usr/bin/env node

import { Devices } from "smartcard";
import { LockCardDaemon, QueryCardDaemon } from "./daemon";
import { ExitCode } from "./exit_code";
import { SystemCommandExecutor, SystemEnvironment } from "./io";

function print_help(): void {
    console.log("Usage: cardlock <query|lock>");
}

if (process.argv.length < 3) {
    print_help();
    process.exit(ExitCode.SUCCESS);
}

const environment = new SystemEnvironment(["LOCK_CMD", "UNLOCK_CMD"], process.env);
const command_executor = new SystemCommandExecutor()
const card_reader = new Devices()

switch (process.argv[2]) {
    case "query":
        new QueryCardDaemon(new Devices()).start();
        break;
    case "lock":
        if (process.argv.length < 4) {
            console.log("Usage: cardlock lock <card_id>");
            process.exit(ExitCode.INSUFFICIENT_ARGUMENTS);
        }
        new LockCardDaemon(process.argv[3], environment, card_reader, command_executor).start();
        break;
    default:
        print_help();
}
