import {makeAutoObservable, runInAction} from "mobx";
import $http from "../../utils/http";
import {storage} from "../../utils/tools";

export enum AnswerType {
    choose = 'choose',
    input = 'input'
}

export interface IAnswer {
    correct: boolean;
    text: string;
}

export interface IQuestion {
    id?: number;
    questionText?: string;
    position?: number;
    points?: number;
    answerType?: AnswerType;
    answerInput?: number | string;
    answers?: IAnswer[];
}


export class QuestionFormStore {
    questions: IQuestion[]

    constructor() {
        this.questions = []
        makeAutoObservable(this)
    }

    inputChange = (qKey: number, value: string | number, type: string, aKey?: number) => {
        if (!aKey) {
            this.questions[qKey][type] = value
        } else {
            this.questions[qKey].answers[aKey][type] = value
        }
    }

    addQuestion = () => {
        this.questions.push({points: 50, answers: []})
    }

    addAnswer = (qKey: number, value: string) => {
        this.questions[qKey].answers.push({correct: false, text: value})
    }

    answerCheckedChange = (qKey: number, aKey: number) => {
        runInAction(() => {
            this.questions[qKey].answers[aKey].correct = !this.questions[qKey].answers[aKey].correct
        })
    }

    removeAnswer = (qKey: number, aKey: number) => {
        this.questions[qKey].answers.splice(aKey, 1)
        return (this.questions[qKey].answers.length !== 0)
    }


    fetchItem = (id: string) => {
        $http.get<IQuestion>('/api/questions/' + id)
            .then((res: any) => {
                const data: IQuestion = res
                runInAction(() => {
                    this.questions.push(data)
                })
            })
    }

    fetchCollection = (id: string) => {
        $http.get<IQuestion[]>('/api/questions?test.id=' + id)
            .then((res: any) => {
                const data: IQuestion[] = res
                runInAction(() => {
                    this.questions = data
                })
            })
    }

    getFromStorage = (key: string) => {
        if (storage.get(key)) {
            this.questions = storage.get(key)
        }
    }

    setToStorage = (key: string) => {
        runInAction(() => {
            storage.remove('key')
            storage.set(key, this.questions)
        })
    }
}