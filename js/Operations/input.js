class InputOperation extends Operation{
    constructor(parent, path, input_type, options) {
        super(parent)
        this.path = path
        this.input_type = input_type
        this.options = options
        this.color = "light_green"
    }

    get_description_data() {
        let fieldsData = []
        this.fields.forEach(field => {
            console.log("field", field)
            fieldsData.push(
                {
                    "tag" : "span",
                    "innerText" : field
                }
            )
        })
        return fieldsData
    }
    static get_modal_data() {
        return [
            {
                "tag" : "input",
                "type" : "file",
                "id" : "fileUpload",
                "name" :"fileUpload"
            },
            {
                "tag" : "span",
                "innerText" : "format"
            },
            {
                "tag" : "select",
                "children" : [
                    {
                        "tag" : "option",
                        "value" : "csv",
                        "innerText" : "csv"
                    }
                ]
            },
            {
                "tag" : "span",
                "innerText" : "delimiter"
            },
            {
                "tag" : "select",
                "children" : [
                    {
                        "tag" : "option",
                        "value" : "semicolon",
                        "innerText" : ";"
                    }
                ]
            },
            {
                "tag" : "button",
                "onclick" : "InputOperation.create(modal, operations)",
                "innerText" : "Analyze"
            }
        ]
    }
    static create(modal, operations) {
        let input  = document.getElementById('fileUpload'); // get the input
        let file   = input.files[0];                  // assuming single file, no multiple
        let reader = new FileReader();

        reader.onload = function(e) {
            let text = reader.result;                 // the entire file
            let firstLine = text.split('\n').shift(); // first line
            let operation = new InputOperation(null, input.files[0], "csv")
            operation.fields = firstLine.trim().split(";")
            operations.push(operation)
            draw_board()
            modal.style.display = "none";             // use the console for debugging
        }

        reader.readAsText(file, 'UTF-8');             // or whatever encoding you're using
                                                    // UTF-8 is default, so this argument
        modal.style.display = "none";
        return

    }
}