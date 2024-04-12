import { Observable } from "@nativescript/core";
import { Typing } from "~/models/typing.model";
import { TypingService } from "~/services/typing.service";

export class TypingViewModel extends Observable {
    private _typingService = TypingService.getInstance();
    private _questions: Typing[] = [];
    public currentIndex: number = 0;
    private answeredQuestion = [];

    constructor(topic: String) {
        super();
        this._questions = this._typingService.getQuestionByTopic(topic);
    }

    nextQuestion() {
        this.currentIndex++;
        this.notifyPropertyChange('currentQuestion', this.currentQuestion);
    }

    get totalQuestions() {
        return this._questions.length;
    }

    get currentQuestion() {
        return this._questions[this.currentIndex];
    }

    get userAnsweredQuestion() {
        return this.answeredQuestion;
    }

    get correctUserAnswers() {
        return this.answeredQuestion.filter(q => q.answer.find(ans => ans === q.userAnswer));
    }

    get wrongUserAnswers() {
        return this.answeredQuestion.filter(q => !q.answer.find(ans => ans === q.userAnswer));
    }

    get correctPercent() {
        return Math.round((this.correctUserAnswers.length / this.totalQuestions) * 100);
    }

    get progress() {
        return this.correctPercent / 100;
    }
}