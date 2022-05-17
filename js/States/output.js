class OutputState extends State{
    constructor(inbound, path, output_type, options) {
        super(inbound)
        this.path = path
        this.output_type = output_type
        this.options = options
        this.color = "yellow"
    }
    static description_template = `
        No output description
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
        <button onclick="OutputState.create(modal, states)">Analyze</button>
    `;

    static create(modal, states) {
        let input  = document.getElementById('fileUpload'); // get the input
        let file   = input.files[0];                  // assuming single file, no multiple
        let reader = new FileReader();

        reader.onload = function(e) {
            let text = reader.result;                 // the entire file
            let firstLine = text.split('\n').shift(); // first line

            let state = new OutputState(null)
            states.push(state)
            draw_board()
            modal.style.display = "none";
            console.log(states);                   // use the console for debugging
        }

        reader.readAsText(file, 'UTF-8');             // or whatever encoding you're using
                                                    // UTF-8 is default, so this argument
        modal.style.display = "none";
        return

    }
}