
export class Wordle {
    wordleArea
    
    constructor () {
        this.wordleArea = document.querySelector('#wordle-area')
        if (!this.wordleArea) {
            console.error('#wordle-area not found')
            return
        }
    }

    updateWordle (history) {
        this.removeWordleElement()
        history.forEach(historyObj => {
            this.addWordleElement(historyObj.wordle)
        })
    }

    addWordleElement (wordle) {
        wordle.forEach(word => {
            const lineElement = document.createElement('div')
            lineElement.id = 'wordle-line-word'
            lineElement.innerHTML = word.char
            lineElement.classList.add(word.status)
            this.wordleArea.appendChild(lineElement)            
        });
    }

    removeWordleElement () {
        while( this.wordleArea.firstChild ){
            this.wordleArea.removeChild( this.wordleArea.firstChild );
        }
    }
}