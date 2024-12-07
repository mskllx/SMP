import { Article } from '../src/interfaces/article';
import {Product} from '../src/interfaces/product';
import { ArticleValidator } from '../src/services/articleValidator';
import { ArticleOperations } from '../src/services/articleOperations';
import { User } from '../src/interfaces/user';
import { hasPermission } from '../src/services/hasPermission';

let article: Article;
let articleOps: ArticleOperations;
let user:User;
let user1:User;

beforeEach(()=>{
    article = {
        id: '1', createdAt: new Date(), updatedAt: new Date(),
        status: 'Чорновик', title: 'тестова стаття', authorId: 'Джон', tags: ['ІТ', 'технології'],
        content: 'Текст статті'
    };
    user = {
        id:"1",username:"admin",password:"1234",
        role:{
            permissions:['DELETE','READ','UPDATE','WRITE']
        }
    }
    user1 = {
        id:"2",username:"reader",password:"12345",
        role:{
            permissions:['READ']
        }
    }
    articleOps = new ArticleOperations();
});

describe('Операції з контентом', () => {
    it('Повинно створювати статтю', async () => {
        const createdArticle = await articleOps.create(user,article);
        expect(createdArticle).toMatchObject(article);
    });

    it('Повинно оновлювати статтю', async () => {
        const createdArticle = await articleOps.create(user,article);
        const updatedArticle = await articleOps.update(user, createdArticle.id, { title: "Оновлена назва" });
        expect(updatedArticle.title).toBe("Оновлена назва");
    });
});

describe('Тести доступу',() => {
    it('Повинно дозволяти адмінам створювати статтю', () => {
        const canCreate = hasPermission(user,'WRITE');
        expect(canCreate).toBe(true);
    });
    it('Повинно заборонити користувачу створювати статтю', () => {
        const canCreate = hasPermission(user1,'WRITE');
        expect(canCreate).toBe(false);
    });
});

describe('Валідація статей', () => {
    let article: Article;
    let wrongArticle: Article;

    beforeEach(()=>{
        article = {
            id: '1', createdAt: new Date(), updatedAt: new Date(),
            status: 'Чорновик', title: 'тестова стаття', authorId: 'Джон', tags: ['ІТ', 'технології'],
            content: 'Текст статті'
        };
        wrongArticle = {
            id:'',createdAt: new Date(), updatedAt: new Date(),
            status:"Чорновик",title:'',authorId:'',tags:[],
            content:''
        }
    });

    it('Повинно одобрити правильно оформлену статтю', () => {
        const result = new ArticleValidator().validate(article);
        expect(result.isValid).toBe(true);
    });
    it('Повинно відхилити неправильно оформлену статтю', () => {
        const result = new ArticleValidator().validate(wrongArticle);
        expect(result.isValid).toBe(false);
    });
});

describe('Перевірка системи версіювання', () => {
    it('Повинно при створенні встановити версію 1', async () => {
        const createdArticle = await articleOps.create(user,article);
        expect(createdArticle.version).toBe(1);
    });
    it('Повинно встановити версію на 2 при оновленні', async () => {
        const art = await articleOps.create(user,article);
        const createdArticle = await articleOps.update(user,art.id,{title:"Нова назва"});
        expect(createdArticle.version).toBe(2);
    });
});