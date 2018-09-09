// This is a nice TypeScript helper that allows for exhaustive switch cases
export default class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`);
    }
}