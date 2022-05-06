class OutputOperation extends Operation{
    constructor(parent, path, output_type, options) {
        super(parent)
        this.path = path
        this.output_type = output_type
        this.options = options
        this.color = "yellow"
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
                "onclick" : "OutputOperation.create(modal, operations)",
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

            let operation = new OutputOperation(null)
            operations.push(operation)
            draw_board()
            modal.style.display = "none";
            console.log(operations);                   // use the console for debugging
        }

        reader.readAsText(file, 'UTF-8');             // or whatever encoding you're using
                                                    // UTF-8 is default, so this argument
        modal.style.display = "none";
        return

    }
}