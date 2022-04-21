import { post } from './api/api.js'

export class User {
    name = null
    uuid = null

    register (name) {
        return new Promise((resolve, reject) => {
            post('/users/register', { name }).then(v => {
                this.name = v.name
                this.uuid = v.uuid
                resolve()
            }).catch((e) => reject(e))
        })
    }
}