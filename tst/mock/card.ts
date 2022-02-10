import { Card } from "../../src/daemon";

export class MockCard implements Card {
    protected atr: string;

    public constructor(atr: string) {
        this.atr = atr;
    }

    public getAtr(): string {
        return this.atr;
    }
}
