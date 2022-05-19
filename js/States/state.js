class State {
    constructor(inbound) {
        this._uid = uuid.v4()
        this.inbound_transformation = inbound
        this.outbound_transformations = []
        this.label = undefined
        this.x = 0
        this.y = 0
        this.width = 100
        this.height = 100
        this.color = "gray"
        this.fields = []
    }
    static description_template = `
        No description
    `

    static modal_data = `
        Invalid class
    `

    static create(modal) {
        modal.style.display = "none";
        return
    }
}