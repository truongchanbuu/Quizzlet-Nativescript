import { Button, NavigatedData, ObservableArray, Page } from "@nativescript/core";
import { QuizzViewModel } from "./quizz-page-view-mode";
import { Quizz } from "~/models/quizz.model";

export function onNavigatedTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object as Page;
    page.bindingContext = new QuizzViewModel('IT');
}

export function onLoaded(args) {}

export function onAnswer(args) {
    const button = args.object as Button;
    const viewModel = button.page.bindingContext as QuizzViewModel;
    const answer = button.text;
    const quizz = viewModel.currentQuizz as Quizz;

    const correctAnswerIndex = quizz.choices.indexOf(quizz.answer);
    
    if (answer === quizz.answer) {
        button.className = "correct-answer";
    } else {
        button.className = "incorrect-answer";
        
        const correctAnswerButton = button.page.getViewById(`answer-${correctAnswerIndex}`) as Button;
        
        if (correctAnswerButton) {
            correctAnswerButton.className = "correct-answer";
        }
    }
    
    viewModel.answeredQuizzes.push({
        selectedAnswer: answer,
        ...quizz,
    });

    viewModel.set('isAnswered', true);
    disableAllButtons(button.page);
}

function disableAllButtons(page: Page) {
    const viewModel = page.bindingContext as QuizzViewModel;

    viewModel.currentQuizz.choices.forEach((_, index) => {
        const button = page.getViewById(`answer-${index}`) as Button;

        if (button) {
            button.isEnabled = false;
        }
    });
}

export function nextQuizz(args) {
    const button = args.object as Button;
    const viewModel = button.page.bindingContext as QuizzViewModel;
    
    if (viewModel.currentQuizzIndex < viewModel.totalQuizzes - 1) {
        viewModel.nextQuizz();

        const nextQuizzIndex = viewModel.answeredQuizzes.findIndex(quizz => quizz.id === viewModel.currentQuizz.id);
        
        if (nextQuizzIndex !== -1) {
            resetQuizz(button.page);
            restoreStatus(button.page);
        } else {
            resetQuizz(button.page);
        }
    } else {
        viewModel.notifyPropertyChange('correctQuizzes', viewModel.correctQuizzes);
        viewModel.notifyPropertyChange('wrongQuizzes', viewModel.wrongQuizzes);
        viewModel.set('isFinished', true);
    }
}

export function prevQuizz(args) {
    const button = args.object as Button;
    const page = button.page;
    const viewModel = button.page.bindingContext as QuizzViewModel;
    viewModel.prevQuizz();

    resetQuizz(page);
    restoreStatus(page);
}

export function goBackFirstQuizz(args) {
    const button = args.object as Button;
    const viewModel = button.page.bindingContext as QuizzViewModel;

    viewModel.set('currentQuizzIndex', 0);
    viewModel.notifyPropertyChange('currentQuizz', viewModel.currentQuizz);
    viewModel.set('answeredQuizzes', []);
    viewModel.set('isAnswered', false);
    viewModel.set('isFinished', false);

    viewModel.currentQuizz.choices.forEach((_, index) => {
        const choosenButton = button.page.getViewById(`answer-${index}`) as Button;

        if (choosenButton) {
            choosenButton.isEnabled = true;
            choosenButton.className = "";
        }
    });
}

function resetQuizz(page: Page) {
    const viewModel = page.bindingContext as QuizzViewModel;

    viewModel.currentQuizz.choices.forEach((_, index) => {
        const button = page.getViewById(`answer-${index}`) as Button;

        if (button) {
            button.isEnabled = true;
            button.className = "";
        }
    });

    viewModel.set('isAnswered', false);
}

function restoreStatus(page: Page) {
    const viewModel = page.bindingContext as QuizzViewModel;
    const currentQuizz = viewModel.currentQuizz;

    const answeredQuizzes = viewModel.answeredQuizzes;

    const currentQuizzStatus = answeredQuizzes.find(quizz => quizz.id === currentQuizz.id);

    const correctAnswerIndex = currentQuizz.choices.indexOf(currentQuizz.answer);
    const selectedAnswerIndex = currentQuizz.choices.indexOf(currentQuizzStatus.selectedAnswer);

    const correctAnswerButton = page.getViewById(`answer-${correctAnswerIndex}`) as Button;
    const selectedAnswerButton = page.getViewById(`answer-${selectedAnswerIndex}`) as Button;

    if (currentQuizz.answer === currentQuizzStatus.selectedAnswer) {
        selectedAnswerButton.className = "correct-answer";
    } else {
        selectedAnswerButton.className = "incorrect-answer";
        
        if (correctAnswerButton) {
            correctAnswerButton.className = "correct-answer";
        }
    }

    disableAllButtons(page);
    viewModel.set('isAnswered', true);
}