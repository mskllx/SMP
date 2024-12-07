import { Versioned } from 'interfaces/Version';
import { Article } from '../interfaces/article';
import { ContentOperations } from './ContentOperations';
import {hasPermission} from './hasPermission';
import { User,Role,Permission } from 'interfaces/user';

export class ArticleOperations implements ContentOperations<Article> {
    private versionedArticles: Map<string, Versioned<Article>> = new Map();

    async create(user:User,item: Article): Promise<Versioned<Article>> {
        if(!hasPermission(user,"WRITE")){
            throw new Error('Not enough rights');
        }
        const versionedArticle: Versioned<Article> = {
            ...item,
            version: 1,
        };
        this.versionedArticles.set(item.id, versionedArticle);
        return versionedArticle;
    }

    async read(user:User,id: string): Promise<Article | null> {
        if(!hasPermission(user,"READ")){
            throw new Error('Not enough rights');
        }
        const article = this.versionedArticles.get(id);
        return article ?? null;
    }

    async update(user:User,id: string, updates: Partial<Article>): Promise<Versioned<Article>> {
        if(!hasPermission(user,"UPDATE")){
            throw new Error('Not enough rights');
        }
        const existingArticle = this.versionedArticles.get(id);
        if (!existingArticle) {
            throw new Error('Article not found');
        }

        const updatedArticle: Versioned<Article> = {
            ...existingArticle,
            ...updates,
            version: existingArticle.version + 1
        };

        this.versionedArticles.set(id, updatedArticle);
        return updatedArticle;
    }

    async delete(user:User,id: string): Promise<void> {
        if(!hasPermission(user,"DELETE")){
            throw new Error('Not enough rights');
        }
        this.versionedArticles.delete(id);
    }

    async list(user:User,params?: any): Promise<Article[]> {
        if (!hasPermission(user, "READ")) {
            throw new Error('Not enough rights');
        }

        return Array.from(this.versionedArticles.values());
    }
}