import { SystemEnvironment } from "../src/io";
import { IllegalAccessError, InvalidEnvironmentError } from "../src/error";

describe("System environment", () => {
    it("allows lookup on registered key", () => {
        process.env["ALLOWED"] = "allowed";
        const environment = new SystemEnvironment(["ALLOWED"]);
        expect(environment.get("ALLOWED")).toBe("allowed");
    });

    it("disallows lookup on unregistered key", () => {
        const environment = new SystemEnvironment([], {"DISALLOWED": "disallowed"});
        const should_throw = () => environment.get("DISALLOWED")
        expect(should_throw).toThrow(IllegalAccessError);
    });

    it("checks for invalid environment", () => {
        const should_throw = () => new SystemEnvironment(["MISSING_IN_ENVIRONMENT_DICT"], {});
        expect(should_throw).toThrow(InvalidEnvironmentError)
    });
});
