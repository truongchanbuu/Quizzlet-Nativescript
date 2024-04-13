import { firebase, FirebaseApp } from "@nativescript/firebase-core";
import { Database } from "@nativescript/firebase-database";
import { FlashCard } from "~/models/flashcard.model";

export class FlashCardService {
    private database: Database;
    private defaultApp: FirebaseApp;

    async initData() {
        this.defaultApp = await firebase().initializeApp();
    }

    private flashcards: FlashCard[] = [];

    private static _instance = new FlashCardService()

    constructor() {
        this.initData();
        this.database = firebase().database();
        this.database
            .ref()
            .child('flashcards')
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    this.flashcards = snapshot.val();
                } else {
                    console.log('No data available');
                }
            })
            .catch(e => console.log(e));
    }

    static getInstance() {
        return this._instance;
    }

    public getFlashcards(): FlashCard[] {
        return this.flashcards;
    }

    public getFlashCardById(id: number): FlashCard | null {
        return this.flashcards.find((card, index) => card.id == id);
    }

    public getFlashCardByTopic(topic: String) : FlashCard[] {
        return this.flashcards.filter(card => card.topic == topic);
    }
}