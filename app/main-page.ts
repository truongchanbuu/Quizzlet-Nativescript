import { EventData, ItemEventData, Page } from '@nativescript/core'
import { HomePageViewModel } from './main-view-model'

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;

	page.bindingContext = new HomePageViewModel();
}

export function onLoaded(args: EventData) { }
