export default class CheckParams {

    static validade(value: string) {
        const regexParams = /^[0-9a-z]{8}\b-[0-9a-z]{4}\b-[0-9a-z]{4}\b-[0-9a-z]{4}\b-[0-9a-z]{12}$/i
        const regexEmail = /^\w+([.]\w+)*@\w+\.\w{2,8}(\.\w{2})?$/

        if (regexParams.test(value) === true) {
            return { id: value }
        }
        else if (regexEmail.test(value) === true) {
            return { email: value }
        } else {
            return { username: value }
        }
    }
}
