import { firebase } from "@nativescript/firebase-core";
import { Database } from "@nativescript/firebase-database";
import { Quizz } from "~/models/quizz.model";

export class QuizzService {
    private database: Database;
    private quizzes: Quizz[] = [];
    constructor() {
        this.database = firebase().database();
        this.database
            .ref()
            .child('quizzes')
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    this.quizzes = snapshot.val();
                } else {
                    console.log('No data available');
                }
            })
            .catch(e => console.log(e));
    }
    private static _instance = new QuizzService();

    static getInstance() {
        return this._instance;
    }

    public getQuizzes(): Quizz[] {
        return this.quizzes || [];
    }

    public getQuizzesByTopic(topic: String): Quizz[] {
        if (!Array.isArray(this.quizzes)) {
            return [];
        }

        return this.quizzes?.filter(q => q.topic === topic);
    }
}