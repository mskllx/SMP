import { Article } from '../interfaces/article';
import { Validator, ValidationResult } from './Validator';

export class ArticleValidator implements Validator<Article> {
    validate(data: Article): ValidationResult {
        const errors: string[] = [];

        if (!data.title) errors.push('Title is required.');
        if (!data.content) errors.push('Content is required.');
        if (!data.authorId) errors.push('Author ID is required.');

        return {
            isValid: errors.length === 0,
            errors: errors.length ? errors : undefined,
        };
    }
}