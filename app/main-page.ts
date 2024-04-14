import { Button, EventData, Page } from '@nativescript/core'
import { HelloWorldModel } from './main-view-model'

export function navigatingTo(args: EventData) {
	const page = <Page>args.object

	page.bindingContext = new HelloWorldModel();
}

export function onLoaded(args: EventData) { }

export function learnByFlashCard(args) {
	const page = args.object.page as Page;

	page.frame.navigate({
		moduleName: 'flashcard/flashcard-page',
		context: { topic: 'Math' },
	});
}

export function learnByQuizz(args) {
	const page = args.object.page as Page;

	page.frame.navigate({
		moduleName: 'quizz/quizz-page',
		context: { topic: 'Math' },
	});
}

export function learnByTypingQuestion(args) {
	const page = args.object.page as Page;

	page.frame.navigate({
		moduleName: 'typing/typing-page',
		context: { topic: 'Math' },
	});
}
