import { FlashCard } from "~/models/flashcard.model";

export class FlashCardService {
    private flashcards: FlashCard[] = [
        { id: 0, question: "Question 1", answer: "Answer 1", topic: "Banking" },
        { id: 1, question: "Question 2", answer: "Answer 2", topic: "IT" },
        { id: 1, question: "Question 12", answer: "Answer 12", topic: "IT" },
        { id: 1, question: "Question 32", answer: "Answer 32", topic: "IT" },
        { id: 2, question: "Question 3", answer: "Answer 3", topic: "Banking" },
        { id: 3, question: "Question 4", answer: "Answer 4", topic: "Finance" },
        { id: 4, question: "Question 5", answer: "Answer 5", topic: "Finance" },
        { id: 5, question: "Question 6", answer: "Answer 6", topic: "Sport" },
        { id: 6, question: "Question 7", answer: "Answer 7", topic: "Sport" },
    ];

    private static _instance = new FlashCardService()

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