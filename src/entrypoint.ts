#!/usr/bin/env node
//eslint-ignore no-process-exit

import { ExitCode } from "./exit_code";
import { LockCardDaemon } from "./lock_card_daemon";
import { QueryCardDaemon } from "./query_card_daemon";

function print_help(): void {
    console.log("Usage: cardlock <query|lock>");
}

if (process.argv.length < 3) {
    print_help();
    process.exit(ExitCode.SUCCESS);
}

switch (process.argv[2]) {
    case "query":
        new QueryCardDaemon().start();
        break;
    case "lock":
        process.argv.length;
        if (process.argv.length < 4) {
            console.log("Usage: cardlock lock <card_id>");
            process.exit(ExitCode.INSUFFICIENT_ARGUMENTS);
        }
        new LockCardDaemon(process.argv[3]).start();
        break;
    default:
        print_help();
}
