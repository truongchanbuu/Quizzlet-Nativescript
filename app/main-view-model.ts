import { Dialogs, Frame, ItemEventData, Observable, Page } from '@nativescript/core'
import { TopicService } from './services/topic.service';
import { Topic } from './models/topic.model';

export class HomePageViewModel extends Observable {
  private topicService: TopicService;
  private topics: Topic[];
  public selectedTopic: String;

  constructor() {
    super();
    this.topicService = new TopicService();
    this.topics = this.topicService.getTopics();
  }

  getTopics(): Topic[] {
    return this.topics;
  }

  learnByFlashCard(topic: String) {
    Frame.topmost().navigate({
      moduleName: 'flashcard/flashcard-page',
      context: { topic: topic },
    });
  }

  learnByQuizz(topic: String) {
    Frame.topmost().navigate({
      moduleName: 'quizz/quizz-page',
      context: { topic: topic },
    });
  }

  learnByTypingQuestion(topic: String) {
    Frame.topmost().navigate({
      moduleName: 'typing/typing-page',
      context: { topic: topic },
    });
  }

  onItemTap(args: ItemEventData) {
    const itemIndex = args.index;
    const currentTopic = this.topics[itemIndex].name;

    Dialogs.action({
      title: 'Please choose your learning type:',
      cancelButtonText: 'Cancel',
      actions: ['Learn By Flash Card', 'Learn By Quizz', 'Learn By Typing Question'],
    })
    .then(result => {
      if (result === 'Learn By Flash Card') {
        this.learnByFlashCard(currentTopic);
      } else if (result === 'Learn By Quizz') {
        this.learnByQuizz(currentTopic);
      } else {
        this.learnByTypingQuestion(currentTopic);
      }
    });
  }
}
