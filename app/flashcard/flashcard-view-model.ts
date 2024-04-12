import { Observable } from "@nativescript/core";
import { FlashCard } from "~/models/flashcard.model";
import { FlashCardService } from "~/services/flashcard.service";

export class FlashCardViewModel extends Observable {
    private flashcards: FlashCard[] = [];
    private isAnswerShowed: boolean = false;
    public isFinished: boolean = false;
    public currentCardIndex: number = 0;
    private flashCardService: FlashCardService = FlashCardService.getInstance();
    public countStudying: number = 0;
    public countKnown: number = 0;
    public isAutoPlaying: boolean = false;

    constructor(topic: String) {
        super();
        this.loadFlashCardByTopic(topic);
    }

    loadFlashCardByTopic(topic: String) {
        this.flashcards = this.flashCardService.getFlashCardByTopic(topic);
    }

    loadFlashcards() {
        this.flashcards = this.flashCardService.getFlashcards();
    }

    toggleAnswer() {
        this.set('isAnswerShowed', !this.isAnswerShowed);
    }

    nextCard() {
        this.set('isAnswerShowed', false);
        this.currentCardIndex++;

        if (this.currentCardIndex >= this.totalCurrentFlashCard) {
            this.isFinished = true;
        }

        this.notifyPropertyChange("currentCard", this.currentCard);
    }

    prevCard() {
        this.set('isAnswerShowed', false);
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
        } else {
            this.currentCardIndex = this.flashcards.length - 1;
        }
    
        this.notifyPropertyChange("currentCard", this.currentCard);
    }

    changeAutoPlayStatus() {
        this.isAutoPlaying = !this.isAutoPlaying;
        this.notifyPropertyChange('isAutoPlaying', this.isAutoPlaying);
    }


    get currentCard(): FlashCard {
        return this.flashcards[this.currentCardIndex];
    }

    get isShowed(): boolean {
        return this.isAnswerShowed;
    }

    get totalCurrentFlashCard(): number {
        return this.flashcards.length;
    }

    get knowPercent() {
        return Math.round((this.countKnown / this.totalCurrentFlashCard) * 100);
    }

    get progress() {
        return this.knowPercent / 100;
    }

    get studyingPercent() {
        return Math.round((this.countStudying / this.totalCurrentFlashCard) * 100);
    }   
}