export class card{
    type: String;
    value: String;

}
export function makeCard(cardNum:number):card{
    cardNum-=1;
    var newCard:card = {type:cardNum<13?"Hearts":cardNum<26?"Spades":cardNum<39?"Diamonds":"Clubs",value:""+(cardNum%13+1)}
    return newCard;
}