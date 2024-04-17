import { Topic } from "~/models/topic.model";

export class TopicService {
    private _topics: Topic[] = [];
    
    constructor() {
        this.populateTopics();
    }

    private static _instance = new TopicService();

    static getInstance() {
        return this._instance;
    }

    populateTopics() {
        this._topics = [
            {
                id: 0,
                name: 'Math'
            },
            {
                id: 1,
                name: 'IT'
            },
            {
                id: 2,
                name: 'Psychology'
            },
            {
                id: 3,
                name: 'Geography'
            },
            {
                id: 4,
                name: 'Literature'
            },
        ];
    }

    getTopics() {
        if (!Array.isArray(this._topics)) {
            return [];
        }

        return this._topics;
    }
}