var states = []
var transformations = []
var board = new Board("svg")


function show_modal(mode) {


    if (mode === 'input') {
        let elem = document.getElementsByClassName("modal-content")[0]
        elem.innerHTML = ejs.render(InputState.modal_data)
    }

    if (mode === 'output') {
        let elem = document.getElementsByClassName("modal-content")[0]
        elem.innerHTML = ejs.render(OutputState.modal_data)
    }
    let elem = document.getElementById("modal_close");
    elem.onclick = function() {
        modal.style.display = "none";
    }
    modal.style.display = "block";

}

function connectionstarted(event, p)  {
    d3.selectAll(".operationInRect").style("display", "block")
    d3.select("svg").append("line")
        .attr("id", "new_line")
        .attr("x1", p.x + p.width + 20)
        .attr("y1", p.y + p.height / 2.0)
        .attr("x2", p.x + p.width + 20)
        .attr("y2", p.y + p.height / 2.0)
        .style("stroke", "black")
        .style("stroke-width", "3px")
}
function connectiondragged(event, p) {
    d3.select("#new_line")
        .attr("x2", event.sourceEvent.layerX)
        .attr("y2", event.sourceEvent.layerY)
}

function connectionended(event, p) {
    let dest_id = document.elementsFromPoint(event.sourceEvent.clientX, event.sourceEvent.clientY)[1].id
    d3.select("#new_line").remove()
    let conn = new Transformation(event.subject, d3.select("#"+dest_id).data()[0])
    transformations.push(conn)
    board.draw()

    d3.selectAll(".operationInRect").style("display", "none")
}
function dragstarted() {
    d3.select(this).attr("stroke", "black");
}

function dragged(event, p) {
    p.x = event.x
    p.y = event.y
    board.update()
    let msgElm = document.getElementById("information_message")
    msgElm.innerHTML  = "X: "+event.x.toString()+" ,Y: "+event.y.toString()
}

function dragended() {
    // console.log(operations)
    d3.select(this).attr("stroke", null);
}


