import { firebase } from "@nativescript/firebase-core";
import { Database } from "@nativescript/firebase-database";
import { Typing } from "~/models/typing.model";

export class TypingService {
    private database: Database;
    private _question: Typing[] = [];
    constructor() {
        this.database = firebase().database();
        this.database
            .ref()
            .child('questions')
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    this._question = snapshot.val();
                } else {
                    console.log('No data availabel');
                }
            })
            .catch(e => console.log(e));
    }

    private static _instance = new TypingService();

    static getInstance() {
        return this._instance;
    }

    public getQuestionByTopic(topic: String) {
        return this._question.filter(question => question.topic === topic);
    }

    public getAllQuestions() {
        if (!Array.isArray(this._question)) {
            return [];
        }

        return this._question;
    }
}