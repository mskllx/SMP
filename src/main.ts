import { Content } from './interfaces/content';
import { ContentValidator } from './services/contentValidator';
import { ContentManager } from './services/contentManager';
import { Account, Role, Access } from './interfaces/account';
import { checkAccess } from './services/accessControl';

// Стаття для тестування
const content: Content = {
    id: '001',
    createdOn: new Date(),
    modifiedOn: new Date(),
    state: 'Draft',
    headline: 'Тема статті',
    body: 'Це текст статті',
    author: 'author001',
    categories: ['технології', 'новини'],
};

// Користувач із адміністративними правами
const adminUser: Account = {
    id: 'admin001',
    username: 'superuser',
    password: 'securepass',
    role: {
        access: ['VIEW', 'CREATE', 'REMOVE']
    }
};

// Валідація статті
const contentValidator = new ContentValidator();
const validationResult = contentValidator.validate(content);

if (validationResult.isValid) {
    console.log('Вміст пройшов перевірку');
} else {
    console.error('Виявлені помилки:', validationResult.errors);
}

// Операції з контентом
const contentManager = new ContentManager();
contentManager.add(adminUser, content).then((result: Content | string) => {
    console.log('Новий вміст додано:', result);
});
