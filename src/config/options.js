
import { chatModels } from "../persistence/mongo/models/chat.js"
import { userModels } from "../persistence/mongo/models/userModels.js"

const options = {

    mongo: {
        chat: chatModels,
        users: userModels
    },
    fileSystem: {
        chat: "chat.txt"
    }
}

export { options }