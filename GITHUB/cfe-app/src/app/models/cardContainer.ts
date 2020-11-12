import { card } from './card';

export class cardContainer{
    public cards: card[];
}

export function emptyCardContainer(){
    var newCC:cardContainer = {cards:[]};
    return newCC;
}