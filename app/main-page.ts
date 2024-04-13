import { EventData, Page } from '@nativescript/core'
import { HelloWorldModel } from './main-view-model'
import { TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar'

export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  page.bindingContext = new HelloWorldModel()
}

export function tabSelected(args: TabSelectedEventData) {
  
}
