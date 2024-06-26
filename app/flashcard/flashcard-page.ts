import { Button, CoreTypes, Dialogs, NavigatedData, NavigationButton, Page, PanGestureEventData } from "@nativescript/core";
import { FlashCardViewModel } from "./flashcard-view-model";
import { CardState } from "~/models/flashcard-state.model";

let isPanningHandle = false;
const history: CardState[] = [];

export function onNavigatedTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return
    }

    let topic = args.context.topic || 'IT';

    const page = <Page>args.object;
    page.bindingContext = new FlashCardViewModel(topic);
}

export function onLoaded(args) {}

export function goBack(args) {
    const button = args.object as NavigationButton;
    const page = button.page;

    page.frame.goBack();
}

export function onLongPress(args) {
    const button = args.object as Button;

    Dialogs.alert({
        message: button.text,
        cancelable: true,
    });
}

let startX: number;
let startY: number;
const threshold = 100;

export function onPan(args: PanGestureEventData) {
    const button = args.object as Button;
    const page = button.page;
    const viewModel = page.bindingContext as FlashCardViewModel;
    const direction = args.deltaX > 0 ? "right" : "left";

    if (args.state === 1) {
        startX = 0;
        startY = 0;
        isPanningHandle = true;
    } else if (args.state === 2) {
        button.translateX += args.deltaX - startX;
        button.translateY += args.deltaY - startY;

        startX = args.deltaX;
        startY = args.deltaY;
        
        if (Math.abs(args.deltaX) > threshold) {
            if (direction === "left") {
                viewModel.set("isCountingStudying", true);
                viewModel.set("isCountingKnown", false);
            } else {
                viewModel.set("isCountingKnown", true);
                viewModel.set("isCountingStudying", false);
            }
        } else {
            viewModel.set("isCountingKnown", false);
            viewModel.set("isCountingStudying", false);
        }
    } else if (args.state === 3) {
        viewModel.set("isCountingKnown", false);
        viewModel.set("isCountingStudying", false);

        if (Math.abs(args.deltaX) > threshold) {
            if (direction === "left") {
                saveToHistory({
                    card: viewModel.currentCard,
                    studying: viewModel.countStudying,
                    known: viewModel.countKnown,
                });
                viewModel.set("countStudying", viewModel.get("countStudying") + 1);
            } else {
                saveToHistory({
                    card: viewModel.currentCard,
                    studying: viewModel.countStudying,
                    known: viewModel.countKnown,
                });
                viewModel.set("countKnown", viewModel.get("countKnown") + 1);
            }

            button.animate({
                translate: { x: direction === "left" ? -500 : 500, y: 0 },
                curve: CoreTypes.AnimationCurve.linear,
                duration: 200,
            }).then(() => {
                viewModel.nextCard();
                button.translateX = 0;
                button.translateY = 0;
                isPanningHandle = false;
            });
        } else {
            viewModel.set("isCountingStudying", false);
            viewModel.set("isCountingKnown", false);
            
            button.animate({
                translate: { x: 0, y: 0 },
                duration: 200,
            }).then(() => isPanningHandle = false);
        }
    }
}

export function flipCard(args) {
    if (!isPanningHandle) {
        const button = args.object as Button;
        const page = button.page;
        const viewModel = page.bindingContext;
        
        viewModel.toggleAnswer();
    }
}

export function resetFlashCards(args) {
    const page = args.object.page;
    const viewModel = page.bindingContext;

    viewModel.set('isFinished', false);
    viewModel.set("currentCardIndex", 0);
    viewModel.set("countStudying", 0);
    viewModel.set("countKnown", 0);
    viewModel.set("isCountingStudying", false);
    viewModel.set("isCountingKnown", false);
    viewModel.set('isAutoPlaying', false);

    viewModel.loadFlashCardByTopic('IT');
}

export function autoPlay(args) {
    const button = args.object as Button;
    const viewModel = button.page.bindingContext;
    const card = button.page.getViewById('flash-card') as Button;
    let timer;
    const delay = 5000;
    

    if (!viewModel.isAutoPlaying) {
        viewModel.changeAutoPlayStatus();

        let currentCardPosition = viewModel.get('currentCardIndex');
        let totalCard = viewModel.get('totalCurrentFlashCard');

        function autoPlayNextCard() {
            if (!viewModel.isAutoPlaying) {
                clearTimeout(timer);
                return;
            }

            if (!viewModel.isShowed) {
                viewModel.toggleAnswer();
            } else {
                viewModel.set('isCountingKnown', true);

                saveToHistory({
                    card: viewModel.currentCard,
                    known: viewModel.get('countKnown'),
                    studying: viewModel.get('countStudying'),
                });

                viewModel.set("countKnown", viewModel.get("countKnown") + 1);
                
                card.animate({
                    translate: { x: 1000, y: 0 },
                }).then(() => {
                    viewModel.nextCard();
                    viewModel.set('isCountingKnown', false);
                    card.translateX = 0;
                    card.translateY = 0;
                });

            }

            currentCardPosition = viewModel.get('currentCardIndex');
            if (currentCardPosition < totalCard) {
                timer = setTimeout(autoPlayNextCard, delay);
            } else {
                viewModel.set('isAutoPlaying', false);
            }
        }

       timer = setTimeout(autoPlayNextCard, delay);
    } else {
        viewModel.set('isAutoPlaying', false);
        clearTimeout(timer);
    }
}

export function undoCard(args) {
    const button = args.object as Button;
    const viewModel = button.page.bindingContext;

    if (history.length > 0) {
        const prevState = history.pop();

        if (prevState.known != viewModel.get('countKnown')) {
            viewModel.set('countKnown', prevState.known);
        }
        
        if (prevState.studying != viewModel.get('countStudying')) {
            viewModel.set('countStudying', prevState.studying);
        }

        viewModel.prevCard();
    }
}

function saveToHistory(state: CardState) {
    history.push(state);
}
