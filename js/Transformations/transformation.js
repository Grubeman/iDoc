class Transformation {
    constructor(from_state, to_state) {
        this._uid = uuid.v4()
        this.from_state = from_state
        this.to_state = to_state
        let construct = Object.getPrototypeOf(this).constructor
        this.description_template = construct.description_template
    }

    static description_template = `
        No description
    `
}

class SelectTransformation extends Transformation {
    static status = ["&#8594;", "&#10060;"]


    constructor(from_state, to_state) {
        super(from_state, to_state)
        this.fields = []
    }

    static switch_field(uid, index) {
        let transfo = transformations.find(e => e._uid = uid)
        let currentStatusIndex = SelectTransformation.status.indexOf(transfo.fields[index][2])
        // console.log(index, transfo.fields[index][2], currentStatusIndex, (currentStatusIndex + 1) % SelectTransformation.status.length)
        transfo.fields[index][2] =  SelectTransformation.status[(currentStatusIndex + 1) % SelectTransformation.status.length]
        let pane = document.getElementById("right_pane")
        pane.innerHTML =  ejs.render(transfo.description_template, {"transfo":transfo})
    }

    static description_template = `
        <h1 class="description_title"><%=transfo.label%></h1>
        <div class="description_fields">
            <% for(var i=0; i<transfo.fields.length; i++) {%>
                <p><%= transfo.fields[i][0] %> <span style="color:red" onclick="SelectTransformation.switch_field('<%=transfo._uid%>', <%=i%>);"><%- transfo.fields[i][2] %></span> <%= transfo.fields[i][1] %></p>
            <% } %>
        </div>
    `
}