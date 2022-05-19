class InputState extends State{
    constructor(inbound, path, input_type, options) {
        super(inbound)
        this.label = "test"
        this.path = path
        this.input_type = input_type
        this.options = options
        this.color = "light_green"
    }
    static description_template = `
        <h1 class="description_title"><%=state.label%></h1>
        <div class="description_fields">
            <% for(var i=0; i<state.fields.length; i++) {%>
                <p><%= state.fields[i] %></p>
            <% } %>
        </div>
    `

    static modal_data = `
        <span id="modal_close" class="close">&times;</span>
        <div style="display:flex;flex-direction: column">
            <input style="margin:auto;padding:10px" type=file id=fileUpload name=fileUpload/>
            <div style="margin:auto;padding:10px">
                <span>format</span>
                <select>
                    <option value="csv">csv</option>
                </select>
            </div>
            <div style="margin:auto;padding:10px">
                <span>delimiter</span>
                <select>
                    <option value="semicolon">;</option>
                </select>
            </div>
            <button style="margin:auto;padding:10px" onclick="InputState.create(modal, states)">Analyze</button>
        </div>
    `;
    static create(modal, states) {
        let input  = document.getElementById('fileUpload'); // get the input
        let file   = input.files[0];                  // assuming single file, no multiple
        let reader = new FileReader();

        reader.onload = function(e) {
            let text = reader.result;                 // the entire file
            let firstLine = text.split('\n').shift(); // first line
            let state = new InputState(null, input.files[0], "csv")
            state.fields = firstLine.trim().split(";")
            state.x = 30
            state.y = 30
            states.push(state)
            board.draw()
            modal.style.display = "none";             // use the console for debugging
        }

        reader.readAsText(file, 'UTF-8');             // or whatever encoding you're using
                                                    // UTF-8 is default, so this argument
        modal.style.display = "none";
        return

    }
}