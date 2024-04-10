import { Quizz } from "~/models/quizz.model";

export class QuizzService {
    private quizzes: Quizz[] = [
        {
            id: 0,
            topic: 'IT',
            question: "Ai là người sáng lập Facebook?",
            answer: "Mark Zuckerberg",
            choices: ["Mark Zuckerberg", "Steve Jobs", "Bill Gates", "Elon Musk"]
        },
        {
            id: 1,
            topic: 'Nation',
            question: "Thủ đô của Pháp là gì?",
            answer: "Paris",
            choices: ["London", "Berlin", "Paris", "Rome"]
        },
        {
            id: 2,
            topic: 'IT',
            question: "NativeScript có thể được sử dụng bằng mấy ngôn ngữ?",
            answer: "5",
            choices: ["2", "4", "5", "3"]
        },
        {
            id: 3,
            topic: 'Society',
            question: "A writing style of Scripture. The poetic writings of the Bible use metaphorical and artistic language to communicate basic truths about God and human nature. Although they typically do not rhyme, they follow a certain rhythm and meter and employ characteristic literary devices such as parallelism and repetition. A writing style of Scripture. The poetic writings of the Bible use metaphorical and artistic language to communicate basic truths about God and human nature. Although they typically do not rhyme, they follow a certain rhythm and meter and employ characteristic literary devices such as parallelism and repetition.",
            answer: "poetry",
            choices: ["poetry", "The increase in the number of people included in each covenant, and God's family, throughout Salvation History.", "Wrong Answer", "culminating in Christ's sacrifice on the Cross and Resurrection from the dead which won for us salvation from sin and death."]
        },
    ];
    
    private static _instance = new QuizzService();

    static getInstance() {
        return this._instance;
    }

    public getQuizzes(): Quizz[] {
        return this.quizzes;
    }

    public getQuizzesByTopic(topic: String): Quizz[] {
        return this.quizzes.filter(quizz => quizz.topic = topic);
    }
}