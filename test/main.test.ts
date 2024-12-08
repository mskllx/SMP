import { Article } from '../src/interfaces/article';
import { Product } from '../src/interfaces/product';
import { ArticleValidator } from '../src/services/articleValidator';
import { ArticleOperations } from '../src/services/articleOperations';
import { User } from '../src/interfaces/user';
import { hasPermission } from '../src/services/hasPermission';

let draftArticle;
let operations;
let adminUser;
let regularUser;

beforeEach(() => {
    draftArticle = {
        id: '001',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'Чернетка',
        title: 'Проста тест стаття',
        authorId: 'Альберт',
        tags: ['Айті', 'Технології'],
        content: 'Наповення статті'
    };
    adminUser = {
        id: 'admin01',
        username: 'superadmin',
        password: 'securepass',
        role: {
            permissions: ['CREATE', 'EDIT', 'DELETE', 'VIEW']
        }
    };
    regularUser = {
        id: 'user02',
        username: 'guest',
        password: 'guestpass',
        role: {
            permissions: ['VIEW']
        }
    };
    operations = new ArticleOperations();
});

describe('Операції з контентом', () => {
    it('Повинно створювати статтю', async () => {
        const newArticle = await operations.create(adminUser, draftArticle);
        expect(newArticle).toEqual(expect.objectContaining(draftArticle));
    });

    it('Повинно оновлювати статтю', async () => {
        const savedArticle = await operations.create(adminUser, draftArticle);
        const updatedArticle = await operations.update(adminUser, savedArticle.id, { title: 'Updated Title' });
        expect(updatedArticle.title).toBe('Updated Title');
    });
});

describe('Контроль доступу', () => {
    it('Повинно дозволяти адмінам створювати статтю', () => {
        const isAllowed = hasPermission(adminUser, 'CREATE');
        expect(isAllowed).toBe(true);
    });

    it('Повинно заборонити користувачу створювати статтю', () => {
        const isAllowed = hasPermission(regularUser, 'CREATE');
        expect(isAllowed).toBe(false);
    });
});

describe('Валідація статей', () => {
    let validArticle;
    let invalidArticle;

    beforeEach(() => {
        validArticle = {
            id: '001',
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'Чернетка',
            title: 'Проста тест стаття',
            authorId: 'Альберт',
            tags: ['Технології'],
            content: 'Наповнення статті'
        };
        invalidArticle = {
            id: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'Draft',
            title: '',
            authorId: '',
            tags: [],
            content: ''
        };
    });

    it('Одобрення правильно-оформленної статті', () => {
        const validationResult = new ArticleValidator().validate(validArticle);
        expect(validationResult.isValid).toBe(true);
    });

    it('Відхилення погано-оформленної статті', () => {
        const validationResult = new ArticleValidator().validate(invalidArticle);
        expect(validationResult.isValid).toBe(false);
    });
});

describe('Контроль версій', () => {
    it('При створенні повинно встановити версію 1', async () => {
        const newArticle = await operations.create(adminUser, draftArticle);
        expect(newArticle.version).toBe(1);
    });

    it('При оновленні повинно встановити версію 2', async () => {
        const savedArticle = await operations.create(adminUser, draftArticle);
        const updatedArticle = await operations.update(adminUser, savedArticle.id, { title: 'Another Update' });
        expect(updatedArticle.version).toBe(2);
    });
});
