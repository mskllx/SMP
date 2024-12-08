export type ValidationOutcome = {
    success: boolean;
    issues?: string[];
};

export interface Checker<T> {
    verify(input: T): ValidationOutcome;
}
