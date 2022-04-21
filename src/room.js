import { get, post } from './api/api.js'

export class Room {
    status = null
    id = null
    turnPlayerUuid = null

    history = null

    players = null

    isEnd () {
        if (!this.history || this.history.length <= 0) return
        const matched = this.history[this.history.length - 1].wordle.filter(word => {
            return word.status == "match"
        })
        console.log(this.history, matched)
        return this.history[this.history.length - 1].wordle.length == matched.length
    }

    async join (payerUuid) {
        await post('/room', { id: payerUuid }).then(v => {
            this.status = v.room.status
            this.id = v.room.id
            this.players = v.players
            this.turnPlayerUuid = v.turnPlayerUuid
            this.history = v.history
        }).catch((e) => {
            console.log(e)
        })
    }

    async update () {
        await get(`/room/${this.id}/info`).then(v => {
            this.status = v.room.status
            this.players = v.players
            this.turnPlayerUuid = v.turnPlayerUuid
            this.history = v.history
        }).catch((e) => {
            console.log(e)
        })
    }

    async postNewWord (word, uuid) {
        await post(`/room/${this.id}/answer`, { playerUuid: uuid, answer: word }).then(v => {
            return v
        })
    }
}