import { Room } from './src/room.js'
import { User } from './src/user.js'
import { Wordle } from './src/wordle.js'

let user
let room
let wordle

let loadingElement
let startButtonElement
let submitButtonElement
let infoTextElement
let inputTextElement

(function() {
    wordle = new Wordle()
    loadingElement = document.querySelector('.loading')
    hide(loadingElement)

    startButtonElement = document.querySelector('.start')
    show(startButtonElement)
    submitButtonElement = document.querySelector('.submit')
    hide(submitButtonElement)

    infoTextElement = document.querySelector('#game-info')
    infoTextElement.innerHTML = '名前を入れてください！'

    startButtonElement.addEventListener('click', () => {
        onStartClick()
    })

    submitButtonElement.addEventListener('click', () => {
        onSubmitClick()
    })
})()

async function onSubmitClick () {
    await room.postNewWord(inputTextElement.value, user.uuid)
    onUpdateRoomInfo(room, false)
}

async function onStartClick () {
    hide(startButtonElement)
    hide(submitButtonElement)
    
    inputTextElement = document.querySelector('#text-input')
    user = new User()
    await user.register(inputTextElement.value)

    room = new Room()
    await room.join(user.uuid)

    onUpdateRoomInfo(room)
}

async function updateRoomInfo () {
    await room.update()
    onUpdateRoomInfo(room)
}

function onUpdateRoomInfo (room, callUpdate = true) {
    if (room.status == "created") {
        infoTextElement.innerHTML = "マッチ待機中"
        hide(startButtonElement)
        hide(submitButtonElement)
        if (callUpdate) {
            window.setTimeout(() => {
                updateRoomInfo()
            }, 2000)
        }
    } else if (room.status == "break") {
        infoTextElement.innerHTML = "終了"
        hide(startButtonElement)
        hide(submitButtonElement)
    } else if (room.status == "matched") {
        updateChunk(room)
        if (callUpdate) {
            window.setTimeout(() => {
                updateRoomInfo()
            }, 2000)
        }
    }
}

function updateChunk (room) {
    if (room.turnPlayerUuid != user.uuid) {
        infoTextElement.innerHTML = "あなたのターンです"
        show(submitButtonElement)
    } else {
        infoTextElement.innerHTML = "相手のターンです"
        hide(submitButtonElement)
    }
    wordle.updateWordle(room.history)
}

function hide (element) {
    element.style.display = 'none'
}

function show (element) {
    element.style.display = 'block'
}