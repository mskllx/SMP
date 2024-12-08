import {
    addTeacher,
    scheduleLesson,
    getAvailableRooms,
    teacherSchedule,
    checkConflicts,
    roomUsage,
    mostPopularLessonType,
    updateRoom,
    removeLesson,
    Teacher,
    Room,
    Subject,
    ScheduleItem,
    Day,
    Slot,
    LessonType,
    teachers,
    clearTeachers
} from './index';

describe('Система управління розкладом', () => {
    const викладач: Teacher = { id: 1, fullName: 'Лінус Торвальдс', faculty: 'Інформатика' };

    beforeEach(() => {
        clearTeachers();

        // Додавання тестових даних
        addTeacher(викладач);
    });

    test('повинно додавати викладача', () => {
        expect(teachers.length).toBe(1);
        expect(teachers[0]).toEqual(викладач);
    });
});
