import { firebase, FirebaseApp } from "@nativescript/firebase-core";
import { Database } from "@nativescript/firebase-database";
import { FlashCard } from "~/models/flashcard.model";

export class FlashCardService {
    private database: Database;
    private flashcards: FlashCard[] = [];
    constructor() {
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
    private static _instance = new FlashCardService()
    
    static getInstance() {
        return this._instance;
    }

    public getFlashcards(): FlashCard[] {
        return this.flashcards || [];
    }

    public getFlashCardById(id: number): FlashCard | null {
        return this.flashcards.find((card, index) => card.id == id);
    }

    public getFlashCardByTopic(topic: String): FlashCard[] {
        if (!Array.isArray(this.flashcards)) {
            return [];
        }

        return this.flashcards.filter(card => card.topic == topic);
    }
}