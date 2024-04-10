import { Observable, ObservableArray } from "@nativescript/core";
import { Quizz } from "~/models/quizz.model";
import { QuizzService } from "~/services/quizz.service";

export class QuizzViewModel extends Observable {
    private quizzes: Quizz[] = [];
    public currentQuizzIndex: number = 0;
    private quizzService: QuizzService = QuizzService.getInstance();
    public answeredQuizzes = [];
    public isAnswered = false;
    public isFinished = false;

    constructor(topic: String) {
        super();
        this.loadQuizzes(topic);
    }

    loadQuizzes(topic: String) {
        this.quizzes = this.quizzService.getQuizzesByTopic(topic);
    }

    nextQuizz() {
        this.set('isAnswered', false);
        this.currentQuizzIndex++;
        this.notifyPropertyChange('currentQuizz', this.currentQuizz);
    }

    prevQuizz() {
        this.set('isAnswered', false);
        this.currentQuizzIndex--;
        this.notifyPropertyChange('currentQuizz', this.currentQuizz);
    }

    get totalQuizzes(): number {
        return this.quizzes.length;
    }

    get currentQuizz(): Quizz {
        return this.quizzes[this.currentQuizzIndex];
    }

    get progress() {
        return this.correctPercent / 100;
    }

    get correctQuizzes() {
        return this.answeredQuizzes.filter(quizz => quizz.selectedAnswer === quizz.answer);
    }

    get wrongQuizzes() {
        return this.answeredQuizzes.filter(quizz => quizz.selectedAnswer !== quizz.answer);
    }

    get correctPercent() {
        return Math.round((this.correctQuizzes.length / this.totalQuizzes) * 100);
    }
}