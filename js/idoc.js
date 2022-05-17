var states = []
var transformations = []

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

function append_elem(parent, elem_data) {
    // console.log("data",elem_data)
    let elem = document.createElement(elem_data["tag"])

    Object.entries(elem_data).forEach(entry => {
        // console.log(entry)
        const [key, value] = entry;
        if (key === "tag") {
            return;
        }
        if (key === "innerText") {
            elem.innerText = value
            return;
        }
        if (key === "children") {
            value.forEach(child_data => {
                append_elem(elem, child_data)
            })
            return;
        }
        elem.setAttribute(key, value)
    });
    parent.appendChild(elem);
}

function set_modal_content(data) {
    let i = 0
    let children = document.getElementsByClassName("modal-content")[0].children
    let array = [ ...children]
    array.forEach(child => {
        if (child.getAttribute("class") === "close") {
            i++;
            return;
        }
        child.remove()
        i++;
    })

    data.forEach(elem_data => {
        append_elem(document.getElementsByClassName("modal-content")[0], elem_data)
    })

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
    console.log(event)
    d3.select("#new_line")
        .attr("x2", event.sourceEvent.layerX)
        .attr("y2", event.sourceEvent.layerY)
}

function connectionended(event, p) {
    let dest_id = document.elementsFromPoint(event.sourceEvent.clientX, event.sourceEvent.clientY)[1].id
    d3.select("#new_line").remove()
    let conn = new Transformation(event.subject, d3.select("#"+dest_id).data()[0])
    transformations.push(conn)
    draw_board()

    d3.selectAll(".operationInRect").style("display", "none")
}
function dragstarted() {
    d3.select(this).attr("stroke", "black");
}

function dragged(event, p) {
    p.x = event.x
    p.y = event.y
    update_board()
    let msgElm = document.getElementById("information_message")
    msgElm.innerHTML  = "X: "+event.x.toString()+" ,Y: "+event.y.toString()
}

function dragended() {
    // console.log(operations)
    d3.select(this).attr("stroke", null);
}

function update_board() {
    d3.selectAll(".operationRect")
        .attr("x", (d) => {
            return d.x
        })
        .attr("y", (d) => {
            return d.y
        })
    d3.selectAll(".operationDragRect")
        .attr("x", (d) => {
            return d.x
        })
        .attr("y", (d) => {
            return d.y
        })
    d3.selectAll(".operationOutRect")
        .attr("cx", (d) => {
            return d.x + d.width + 5
        })
        .attr("cy", (d) => {
            return d.y + d.height / 2.0
        })
    d3.selectAll(".operationInRect")
        .attr("x", (d) => {
            return d.x - 20
        })
        .attr("y", (d) => {
            return d.y + d.height / 2.0 - 10
        })
    d3.selectAll(".operationTitle")
        .attr("x", function(d) { return d.x + 3 })
        .attr("y", function(d) { return d.y + 3 })

    console.log("connections",d3.selectAll(".connection"))
    d3.selectAll(".connection")
        .attr("x1", (d) => {
            console.log("x1", d)
            return d.from_op.x + d.from_op.width
        })
        .attr("y1", (d) => {
            return d.from_op.y + d.from_op.height / 2.0
        })
        .attr("x2", (d) => {
            return d.to_op.x
        })
        .attr("y2", (d) => {
            return  d.to_op.y + d.to_op.height / 2.0
        })
}

function draw_board() {
    console.log("states", states)
    d3.select("svg").selectAll(".connection")
        .data(transformations)
        .enter()
        .append("line")
        .attr("id", (d) => {
            return "c_"+d._uid
        })
        .attr("class", "connection")
        .style("stroke", "black")
        .style("stroke-width", "3px")

    var go = d3.select("svg").selectAll(".operationGroup")
        .data(states)
        .enter()
        .append("g")
        .attr("class", "operationGroup")
        .attr("id", (d) => {
            return "g_"+d._uid
        })
        .style("transform", (d) => {
            return "translate("+d.x.toString()+","+d.y.toString()+")"
        })

    go.append("rect")
        .attr("class", "operationRect")
        .attr("id", (d) => {
            return "main_"+d._uid
        })
        .attr("width", (d) => {
            return d.width
        })
        .attr("height", (d) => {
            return d.height
        })
        .attr("fill", (d) => {
            return d.color
        })
        .on("click", (event, d) => {
            let pane = document.getElementById("right_pane")
            let children = pane.children
            let array = [ ...children]
            array.forEach(child => {
                child.remove()
            })
            d.get_description_data().forEach(elem_data => {
                append_elem(pane, elem_data)
            })
            d3.select(event.target).style("stroke", "black")
        })
        .on("mouseover", (event, d) => {
            d3.select(event.target).style("stroke", "red")
        })

    go.append("rect")
        .attr("class", "operationDragRect")
        .attr("id", (d) => {
            return "drag_"+d._uid
        })
        .attr("width", (d) => {
            return d.width
        })
        .attr("height", (d) => {
            return 20
        })
        .attr("fill", (d) => {
            return "gray"
        }).call(
        d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    )

    go.append("text")
        .attr("class", "operationTitle")
        .attr("id", (d) => {
            return "title_"+d._uid
        })
        .attr("dy", ".35em")
        .text((d) => {
            return d.label
        })
        .style("text-anchor", "start")
        .style("alignment-baseline", "mathematical")

    go.filter(function(d,i){ return !OutputState.prototype.isPrototypeOf(d) })
        .append("circle")
        .attr("class", "operationOutRect")
        .attr("id", (d) => {
            return "out_"+d._uid
        })
        .attr("r", (d) => {
            return 5
        })
        .attr("fill", (d) => {
            return "green"
        })
        .on("dblclick", (event, d) => {
            console.log("dbl", d)
            let op = new State(d)
            op.x = d.x + d.width + 50
            op.y = d.y
            states.push(op)
            conn = new Transformation(d, op)
            transformations.push(conn)

            draw_board()

        })
        .call(
            d3.drag()
                .on("start", connectionstarted)
                .on("drag", connectiondragged)
                .on("end", connectionended)
        )
    go.filter(function(d,i){ return !InputState.prototype.isPrototypeOf(d) })
        .append("rect")
        .attr("class", "operationInRect")
        .attr("id", (d) => {
            return "in_"+d._uid
        })
        .attr("width", (d) => {
            return 20
        })
        .attr("height", (d) => {
            return 20
        })
        .attr("fill", (d) => {
            return "red"
        })
        .style("display", "none")

    update_board()
}
