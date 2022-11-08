import {CardType} from '../../../api/cardAPI';

export const getCard = (cards: CardType[]) => {
    let buildedPack: CardType[] = []    //Array that collects running cards

    for (let i = 0; i < cards.length; i++) {
        const cardGrade = Math.round(cards[i].grade)

        const pushCards: (n: number) => null = (n: number) => {    //How many times to push a card into an array
            if (n < 1) {
                return null
            } else {
                buildedPack.push(cards[i])
                return pushCards(n - 1)
            }
        }

        switch (cardGrade) {    // If our card has 0 stars. Then it should occur 6 times in the array. If there is 1 star, then push it 5 times. 2 stars push 4 times and so on. Thus, we increase the probability of cards that have a smaller number of stars falling out
            case (0): {
                pushCards(Math.pow(6, 2))
                break;
            }
            case (1): {
                pushCards(Math.pow(5, 2))
                break;
            }
            case (2): {
                pushCards(Math.pow(4, 2))
                break;
            }
            case (3): {
                pushCards(Math.pow(3, 2))
                break;
            }
            case (4): {
                pushCards(Math.pow(2, 2))
                break;
            }
            case (5): {
                pushCards(1)
                break;
            }
        }
    }

    buildedPack.sort(() => Math.random() - 0.5)  //shuffling our array
    const index = Math.floor(Math.random() * buildedPack.length) //choosing a random index of our collected array
    return buildedPack[index]
}