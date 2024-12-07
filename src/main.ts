import { Article } from './interfaces/article';
import { ArticleValidator } from './services/articleValidator';
import { ArticleOperations } from './services/articleOperations';
import {User,Role,Permission} from './interfaces/user';
import { hasPermission } from 'services/hasPermission';

const article: Article = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'Чорновик',
    title: 'Заголовок статті',
    content: 'Текст статті',
    authorId: 'author1',
    tags: ['новини', 'ІТ'],
};

const admin: User = {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: { 
        permissions: ['READ', 'WRITE', 'DELETE']
    }
};


const validator = new ArticleValidator();
const validation = validator.validate(article);

if (validation.isValid) {
    console.log('Стаття валідна');
} else {
    console.error('Помилки валідації:', validation.errors);
}

const articleOps = new ArticleOperations();
articleOps.create(admin,article).then((created: Article|string) => {
    console.log('Створено статтю:', created);
});