import { instance } from "./instance";

export const newsApi = {
    getList() {
        return instance.get<number[]>('newstories.json?print=pretty');
    },
    getInfo(id:number) {
        return instance.get<Info>(`item/${id}.json?print=pretty`)
    },
}

export type Info = {
    "by" : string;
    "descendants" : number;
    "id" : number;
    "kids" : number[] | null;
    "score" : number;
    "time" : number;
    "title" : string;
    "type" : string;
    "url" : string;
  }