class Transformation {
    constructor(from_state, to_state) {
        this._uid = uuid.v4()
        this.from_state = from_state
        this.to_state = to_state
    }

    static description_template = `
        No description
    `
}

class SelectTransformation extends Transformation {
    constructor(from_state, to_state) {
        super(from_state, to_state)
        this.fields = [["A", "A"], ["B", "B"]]
    }

    static description_template = `
        <h1 class="description_title"><%=transfo.label%></h1>
        <div class="description_fields">
            <% for(var i=0; i<transfo.fields.length; i++) {%>
                <p><%= transfo.fields[i][0] %> --> <%= transfo.fields[i][1] %></p>
            <% } %>
        </div>
    `
}