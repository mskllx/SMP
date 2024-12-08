enum EnrollmentStatus {
    Active,
    OnLeave,
    Graduated,
    Removed
}

enum SubjectType {
    Core,
    Elective,
    Advanced
}

enum Term {
    Fall,
    Spring
}

enum Rating {
    Excellent = 5,
    VeryGood = 4,
    Pass = 3,
    Fail = 2
}

enum Department {
    IT,
    Business,
    Law,
    Engineering
}

interface Learner {
    studentId: number;
    name: string;
    department: Department;
    yearOfStudy: number;
    status: EnrollmentStatus;
    dateOfEnrollment: Date;
    groupCode: string;
}

interface Subject {
    courseId: number;
    title: string;
    category: SubjectType;
    creditHours: number;
    term: Term;
    department: Department;
    maxParticipants: number;
}

interface Assessment {
    learnerId: number;
    subjectId: number;
    score: Rating;
    evaluationDate: Date;
    term: Term;
}

class AcademicManagement {
    private learners: Learner[] = [];
    private subjects: Subject[] = [];
    private assessments: Assessment[] = [];
    private learnerIdCounter: number = 1;
    private subjectIdCounter: number = 1;

    addLearner(details: Omit<Learner, "studentId">): Learner {
        const newLearner: Learner = { studentId: this.learnerIdCounter++, ...details };
        this.learners.push(newLearner);
        return newLearner;
    }

    registerSubject(learnerId: number, subjectId: number): void {
        const learner = this.learners.find(l => l.studentId === learnerId);
        const subject = this.subjects.find(s => s.courseId === subjectId);

        if (!learner || !subject) {
            throw new Error("Learner or subject not found.");
        }

        if (learner.department !== subject.department) {
            throw new Error("Learner cannot register for subjects outside their department.");
        }

        const registrations = this.assessments.filter(a => a.subjectId === subjectId);
        if (registrations.length >= subject.maxParticipants) {
            throw new Error("Subject capacity reached.");
        }

        this.assessments.push({
            learnerId,
            subjectId,
            score: null as unknown as Rating,
            evaluationDate: new Date(),
            term: subject.term
        });
    }

    assignGrade(learnerId: number, subjectId: number, grade: Rating): void {
        const registrationExists = this.assessments.some(a => a.learnerId === learnerId && a.subjectId === subjectId);
        if (!registrationExists) {
            throw new Error("Learner is not registered for this subject.");
        }

        const subject = this.subjects.find(s => s.courseId === subjectId);
        if (!subject) {
            throw new Error("Subject not found.");
        }

        const newAssessment: Assessment = {
            learnerId,
            subjectId,
            score: grade,
            evaluationDate: new Date(),
            term: subject.term
        };

        this.assessments.push(newAssessment);
    }

    updateStatus(learnerId: number, newStatus: EnrollmentStatus): void {
        const learner = this.learners.find(l => l.studentId === learnerId);
        if (!learner) {
            throw new Error("Learner not found.");
        }

        learner.status = newStatus;
    }
    getLearnersByDepartment(department: Department): Learner[] {
        return this.learners.filter(l => l.department === department);
    }
    getGrades(learnerId: number): Assessment[] {
        return this.assessments.filter(a => a.learnerId === learnerId);
    }
    getAvailableSubjects(department: Department, term: Term): Subject[] {
        return this.subjects.filter(s => s.department === department && s.term === term);
    }

    // Calculate the average grade for a learner
    computeAverageGrade(learnerId: number): number {
        const validGrades = this.assessments.filter(a => a.learnerId === learnerId && a.score !== null);
        if (validGrades.length === 0) {
            throw new Error("No grades available for this learner.");
        }

        const total = validGrades.reduce((sum, a) => sum + a.score, 0);
        return total / validGrades.length;
    }

    getTopLearners(department: Department): Learner[] {
        return this.learners.filter(learner => {
            const learnerGrades = this.assessments.filter(a => a.learnerId === learner.studentId && a.score !== null);
            return learnerGrades.length > 0 &&
                learnerGrades.every(a => a.score === Rating.Excellent) &&
                learner.department === department;
        });
    }
}
