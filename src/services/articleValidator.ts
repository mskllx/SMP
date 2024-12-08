import { Content } from '../interfaces/content';
import { Checker, ValidationOutcome } from './Checker';

export class ContentChecker implements Checker<Content> {
    verify(input: Content): ValidationOutcome {
        const issues: string[] = [];

        if (!input.headline) issues.push('Заголовок є обов’язковим.');
        if (!input.body) issues.push('Текст статті є обов’язковим.');
        if (!input.author) issues.push('ID автора є обов’язковим.');

        return {
            success: issues.length === 0,
            issues: issues.length ? issues : undefined,
        };
    }
}
