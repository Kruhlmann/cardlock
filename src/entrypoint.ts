#!/usr/bin/env node

import { SystemEnvironment } from "./io";
import { LockCardDaemon, QueryCardDaemon } from "./daemon";
import { ExitCode } from "./exit_code";

function print_help(): void {
    console.log("Usage: cardlock <query|lock>");
}

if (process.argv.length < 3) {
    print_help();
    process.exit(ExitCode.SUCCESS);
}

const environment = new SystemEnvironment(["LOCK_CMD", "UNLOCK_CMD"], process.env);

switch (process.argv[2]) {
    case "query":
        new QueryCardDaemon().start();
        break;
    case "lock":
        if (process.argv.length < 4) {
            console.log("Usage: cardlock lock <card_id>");
            process.exit(ExitCode.INSUFFICIENT_ARGUMENTS);
        }
        new LockCardDaemon(process.argv[3], environment).start();
        break;
    default:
        print_help();
}
