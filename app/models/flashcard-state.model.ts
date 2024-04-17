import { FlashCard } from "./flashcard.model";

export interface CardState {
    card: FlashCard;
    known: number | 0;
    studying: number | 0;
}