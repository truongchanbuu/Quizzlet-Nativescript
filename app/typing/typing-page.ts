import { Button, Dialogs, NavigatedData, Page, TextField } from "@nativescript/core";
import { TypingViewModel } from "./typing-page-view-model";

export function onNavigatedTo(args: NavigatedData) {
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object as Page;
    page.bindingContext = new TypingViewModel('Math');
}

export function onLoaded(args) {}

export function checkAnswer(args) {
    const button = args.object as Button;
    const page = button.page;
    const viewModel = page.bindingContext as TypingViewModel;
    
    button.isEnabled = false;

    if (viewModel.currentIndex < viewModel.totalQuestions) {
        const currentQuestion = viewModel.currentQuestion;

        const answerTextField = page.getViewById('answer-box') as TextField;
        const answer = answerTextField.text.trim().toUpperCase();

        const result = currentQuestion.answer.find(ans => ans.toUpperCase() === answer);

        viewModel.userAnsweredQuestion.push({
            userAnswer: answer,
            ...currentQuestion,
        });

        let dialogMessage = 'Incorrect';
        if (result) {
            dialogMessage = 'Correct';
        }

        showResultDialog(dialogMessage)
            .then(() => {
                answerTextField.text = "";
                viewModel.nextQuestion();
                button.isEnabled = true;
            })
            .catch(e => console.log(e));
        
        viewModel.notifyPropertyChange('correctUserAnswers', viewModel.correctUserAnswers);
        viewModel.notifyPropertyChange('wrongUserAnswers', viewModel.wrongUserAnswers);
    }
}

function showResultDialog(message: string) {
    return Dialogs.alert({
        message: message,
        okButtonText: 'Next',
        cancelable: false,
    });
}