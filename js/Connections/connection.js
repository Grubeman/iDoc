class Connection {
    constructor(from_op, to_op) {
        this._uid = uuid.v4()
        this.from_op = from_op
        this.to_op = to_op
    }
}