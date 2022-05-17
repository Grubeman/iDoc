class InputState extends State{
    constructor(inbound, path, input_type, options) {
        super(inbound)
        this.path = path
        this.input_type = input_type
        this.options = options
        this.color = "light_green"
    }
    static description_template = `
        No input description
    `

    static modal_data = `
        <span id="modal_close" class="close">&times;</span>
        <input type=file id=fileUpload name=fileUpload/>
        <span>format</span>
        <select>
            <option value="csv">csv</option>
        </select>
        <span>delimiter</span>
        <select>
            <option value="semicolon">;</option>
        </select>
        <button onclick="InputState.create(modal, states)">Analyze</button>
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
            states.push(state)
            draw_board()
            modal.style.display = "none";             // use the console for debugging
        }

        reader.readAsText(file, 'UTF-8');             // or whatever encoding you're using
                                                    // UTF-8 is default, so this argument
        modal.style.display = "none";
        return

    }
}