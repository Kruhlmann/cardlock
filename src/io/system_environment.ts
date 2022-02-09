import { IllegalAccessError } from "../error";
import { SystemEnvironmentValidator } from "./system_environment_validator";

export class SystemEnvironment {
    protected readonly available_keys: string[];
    protected readonly environment: NodeJS.ProcessEnv;

    public constructor(available_keys: string[], environment: NodeJS.ProcessEnv = process.env) {
        this.available_keys = available_keys;
        this.environment = environment;
        new SystemEnvironmentValidator(available_keys, environment).validate();
    }

    public get(key: string): string {
        if (!this.available_keys.includes(key)) {
            throw new IllegalAccessError(`Attempted to access illegal environment variable "${key}"`);
        }
        return this.environment[key]!;
    }
}
