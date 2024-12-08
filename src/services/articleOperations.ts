import { Tracked } from '../interfaces/Tracked';
import { Content } from '../interfaces/content';
import { ContentManagerActions } from './ContentManagerActions';
import { checkAccess } from './accessControl';
import { Account, Role, Access } from '../interfaces/account';

export class ContentManager implements ContentManagerActions<Content> {
    private trackedContents: Map<string, Tracked<Content>> = new Map();

    async add(account: Account, item: Content): Promise<Tracked<Content>> {
        if (!checkAccess(account, "CREATE")) {
            throw new Error('Недостатньо прав');
        }

        const trackedContent: Tracked<Content> = {
            ...item,
            version: 1,
        };

        this.trackedContents.set(item.id, trackedContent);
        return trackedContent;
    }

    async fetch(account: Account, id: string): Promise<Content | null> {
        if (!checkAccess(account, "VIEW")) {
            throw new Error('Недостатньо прав');
        }

        const content = this.trackedContents.get(id);
        return content ?? null;
    }

    async modify(account: Account, id: string, changes: Partial<Content>): Promise<Tracked<Content>> {
        if (!checkAccess(account, "UPDATE")) {
            throw new Error('Недостатньо прав');
        }

        const existingContent = this.trackedContents.get(id);
        if (!existingContent) {
            throw new Error('Контент не знайдено');
        }

        const updatedContent: Tracked<Content> = {
            ...existingContent,
            ...changes,
            version: existingContent.version + 1,
        };

        this.trackedContents.set(id, updatedContent);
        return updatedContent;
    }

    async remove(account: Account, id: string): Promise<void> {
        if (!checkAccess(account, "REMOVE")) {
            throw new Error('Недостатньо прав');
        }

        this.trackedContents.delete(id);
    }

    async listAll(account: Account, filters?: any): Promise<Content[]> {
        if (!checkAccess(account, "VIEW")) {
            throw new Error('Недостатньо прав');
        }

        return Array.from(this.trackedContents.values());
    }
}
