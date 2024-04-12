import { Typing } from "~/models/typing.model";

export class TypingService {
    private _question: Typing[] = [
        {
            id: 0,
            topic: 'Geography',
            question: 'Where is the capital of Viet Nam?',
            answer: ['Ha Noi'],
        },
        {
            id: 1,
            topic: 'English',
            question: 'Extinct có nghĩa là gì?',
            answer: ['tuyệt chủng'],
        },
        {
            id: 2,
            topic: 'IT',
            question: '1 byte có mấy bit?',
            answer: ['8', 'tám']
        },
        {
            id: 3,
            topic: 'Math',
            question: '1 + 1 = ?',
            answer: ['2', 'hai'],
        },
        {
            id: 4,
            topic: 'Math',
            question: '2 x 2 = ?',
            answer: ['4', 'bốn'],
        },
        {
            id: 5,
            topic: 'IT',
            question: 'Nativescript được ra mắt vào khoảng thời gian (ngày, tháng, năm) nào?',
            answer: ['2014'],
        },
    ];

    private static _instance = new TypingService();

    static getInstance() {
        return this._instance;
    }

    public getQuestionByTopic(topic: String) {
        return this._question.filter(question => question.topic === topic);
    }

    public getAllQuestions() {
        return this._question;
    }
}