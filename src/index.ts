// Типи для днів тижня
type Day = "Понеділок" | "Вівторок" | "Середа" | "Четвер" | "П’ятниця";

// Типи для часових проміжків
type Slot = 
    "8:30-10:00" | 
    "10:15-11:45" | 
    "12:15-13:45" | 
    "14:00-15:30" | 
    "15:45-17:15";

// Типи для занять
type LessonType = "Лекція" | "Семінар" | "Лабораторна" | "Практика";

// Тип для викладачів
type Teacher = {
    id: number;
    fullName: string;
    faculty: string;
};

// Тип для аудиторій
type Room = {
    id: string;
    size: number;
    hasEquipment: boolean;
};

// Тип для курсів
type Subject = {
    id: number;
    title: string;
    category: LessonType;
};

// Тип для занять
type ScheduleItem = {
    subjectId: number;
    teacherId: number;
    roomId: string;
    day: Day;
    slot: Slot;
};

// Бази даних
let teachers: Teacher[] = [];
let rooms: Room[] = [];
let subjects: Subject[] = [];
let timetable: ScheduleItem[] = [];

// Додавання викладача
function addTeacher(newTeacher: Teacher): void {
    teachers.push(newTeacher);
}

// Додавання заняття
function scheduleLesson(item: ScheduleItem): boolean {
    if (!checkConflicts(item)) {
        timetable.push(item);
        return true;
    }
    return false;
}

// Перевірка доступних аудиторій
function getAvailableRooms(slot: Slot, day: Day): string[] {
    const bookedRooms = timetable
        .filter(entry => entry.slot === slot && entry.day === day)
        .map(entry => entry.roomId);

    return rooms
        .filter(room => !bookedRooms.includes(room.id))
        .map(room => room.id);
}

// Розклад викладача
function teacherSchedule(teacherId: number): ScheduleItem[] {
    return timetable.filter(entry => entry.teacherId === teacherId);
}

// Тип для конфліктів у розкладі
type Conflict = {
    reason: "TeacherBusy" | "RoomBusy";
    conflictingItem: ScheduleItem;
};

// Перевірка конфліктів
function checkConflicts(item: ScheduleItem): Conflict | null {
    const teacherConflict = timetable.find(
        entry => entry.teacherId === item.teacherId && entry.slot === item.slot && entry.day === item.day
    );
    if (teacherConflict) {
        return { reason: "TeacherBusy", conflictingItem: teacherConflict };
    }

    const roomConflict = timetable.find(
        entry => entry.roomId === item.roomId && entry.slot === item.slot && entry.day === item.day
    );
    if (roomConflict) {
        return { reason: "RoomBusy", conflictingItem: roomConflict };
    }

    return null;
}

// Використання аудиторій
function roomUsage(roomId: string): number {
    const totalSlots = 5 * 5; // 5 днів, 5 часових слотів
    const usedSlots = timetable.filter(entry => entry.roomId === roomId).length;
    return (usedSlots / totalSlots) * 100;
}

// Найбільш популярний тип занять
function mostPopularLessonType(): LessonType {
    const typeCounts: Record<LessonType, number> = {
        "Лекція": 0,
        "Семінар": 0,
        "Лабораторна": 0,
        "Практика": 0
    };

    timetable.forEach(entry => {
        const subject = subjects.find(s => s.id === entry.subjectId);
        if (subject) {
            typeCounts[subject.category]++;
        }
    });

    return Object.keys(typeCounts).reduce((a, b) => 
        typeCounts[a as LessonType] > typeCounts[b as LessonType] ? a : b
    ) as LessonType;
}

// Перепризначення аудиторії
function updateRoom(lessonId: number, newRoomId: string): boolean {
    const lesson = timetable.find(entry => entry.subjectId === lessonId);
    if (lesson) {
        const conflict = timetable.find(
            entry => entry.roomId === newRoomId && entry.slot === lesson.slot && entry.day === lesson.day
        );
        if (!conflict) {
            lesson.roomId = newRoomId;
            return true;
        }
    }
    return false;
}

// Скасування заняття
function removeLesson(subjectId: number): void {
    timetable = timetable.filter(entry => entry.subjectId !== subjectId);
}

// Скидання списку викладачів
function clearTeachers(): void {
    teachers = [];
}
