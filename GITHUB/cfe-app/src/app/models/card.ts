export class card{
    type: String;
    value: String;

}
export function makeCard(cardNum:number):card{
    if(cardNum==-1){
        var blankCard:card = {type:"",value:"-1"};
        return blankCard;
    }
    var newCard:card = {type:cardNum<13?"Hearts":cardNum<26?"Spades":cardNum<39?"Diamonds":"Clubs",value:""+((cardNum%13)+1)}
    return newCard;
}

export function makeCardFromVals(cardType:string,cardValue:string):card{
    var newCard:card = {type:cardType,value:cardValue};
    return newCard;
}