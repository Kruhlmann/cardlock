import { InvalidEnvironmentError } from "../error";

export class SystemEnvironmentValidator {
    protected readonly required_keys: string[];
    protected readonly environment: NodeJS.ProcessEnv;

    public constructor(required_keys: string[], environment: NodeJS.ProcessEnv) {
        this.required_keys = required_keys;
        this.environment = environment;
    }

    public validate(): void {
        let error: Error | undefined;
        const available_keys = Object.keys(this.environment);

        for (const key of this.required_keys) {
            if (available_keys.includes(key)) {
                continue;
            }
            console.error(`Missing environment variable "${key}"`);
            error = new InvalidEnvironmentError();
        }

        if (error !== undefined) {
            throw error;
        }
    }
}
