class Operation {
    constructor(parent) {
        this._uid = uuid.v4()
        this.parent = parent
        this.childs = []
        this.label = undefined
        this.x = 0
        this.y = 0
        this.width = 100
        this.height = 100
        this.color = "gray"
        this.fields = []
    }
    get_description_data() {
        console.error("I should not be here")
        return
    }

    static get_modal_data() {
        console.error("I should not be here")
        return
    }

    static create(modal) {
        modal.style.display = "none";
        return
    }
}