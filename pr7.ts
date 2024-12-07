//TODO: make explicit comments
enum StudentStatus {
    Active, 
    Academic_Leave, 
    Graduated, 
    Expelled
};

enum CourseType {
    Mandatory, 
    Optional, 
    Special
}

enum Semester {
    First,
    Second
}

enum Grades {
    Excellent = 5, 
    Good = 4, 
    Satisfactory = 3, 
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science, 
    Economics, 
    Law, 
    Engineering
}

interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: Grades;
    date: Date;
    semester: Semester;
}

class UniversityManagmentSystem{
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private studentIdCounter: number = 1;
    private courseIdCounter: number = 1;

    enrollStudent(student: Omit<Student, "id">): Student{
        const newStudent: Student = {id: this.studentIdCounter++, ...student};
        this.students.push(newStudent);
        return newStudent;
    }

    registerForCourse(studentId: number, courseId: number): void{
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student || !course) {
            throw new Error("Student or course not found.");
        }

        if (student.faculty !== course.faculty) {
            throw new Error("Student cannot register for courses of another faculty.");
        }

        const courseRegistrations = this.grades.filter(g => g.courseId === courseId);
        if (courseRegistrations.length >= course.maxStudents) {
            throw new Error("Course has reached the maximum number of students.");
        }

        this.grades.push({
            studentId,
            courseId,
            grade: null as unknown as Grades, 
            date: new Date(),
            semester: course.semester
        });
    }

    setGrade(studentId: number, courseId: number, grade: Grades): void {
        const registrationExists = this.grades.some(g => g.studentId === studentId && g.courseId === courseId);
        if (!registrationExists) {
            throw new Error("Student is not registered for this course");
        }

        const course = this.courses.find(c => c.id === courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        const newGrade: Grade = {
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        };

        this.grades.push(newGrade);
    }
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void{
        const student = this.students.find(s => s.id === studentId);
        if(!student){
            throw new Error("Student not found");
        }

        student.status = newStatus;
    }

    getStudentsByFaculty(faculty: Faculty): Student[]{
        return this.students.filter(s => s.faculty === faculty);
    }

    getStudentGrades(studentId: number): Grade[]{
        return this.grades.filter(g => g.studentId === studentId);
    }

    getAvailableCourses(faculty: Faculty, semester: Semester): Course[]{
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    calculateAverageGrade(studentId: number): number{
        const validGrades = this.grades.filter(g => g.grade !== null && g.grade !== undefined);
        if (validGrades.length === 0) {
            throw new Error("No grades available for this student");
        }

        const total = validGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / validGrades.length;
    }

    getTopPerformers(faculty: Faculty): Student[] {
        return this.students.filter(student => {
            const studentGrades = this.grades.filter(g => g.studentId === student.id && g.grade !== null);
            return studentGrades.length > 0 &&
                   studentGrades.every(g => g.grade === Grades.Excellent) &&
                   student.faculty === faculty;
        });
    }
}