class Board {
    constructor(parent_selector) {
        this.parent_elem = d3.select(parent_selector)
    }

    update() {
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

        d3.selectAll(".connection")
            .attr("x1", (d) => {
                return d.from_state.x + d.from_state.width
            })
            .attr("y1", (d) => {
                return d.from_state.y + d.from_state.height / 2.0
            })
            .attr("x2", (d) => {
                return d.to_state.x
            })
            .attr("y2", (d) => {
                return  d.to_state.y + d.to_state.height / 2.0
            })
    }

    draw() {
        this.parent_elem.selectAll(".connection")
            .data(transformations)
            .enter()
            .append("line")
            .attr("id", (d) => {
                return "c_"+d._uid
            })
            .attr("class", "connection")
            .style("stroke", "black")
            .style("stroke-width", "3px")
            .on("click", (event, d) => {
                let pane = document.getElementById("right_pane")
                let construct = Object.getPrototypeOf(d).constructor
                pane.innerHTML =  ejs.render(construct.description_template, {"transfo":d})
            })
            .on("mouseover", (event, d) => {
                d3.select(event.target).style("stroke", "red")
            })
            .on("mouseout", (event, d) => {
                d3.select(event.target).style("stroke", "black")
            })
        var go = this.parent_elem.selectAll(".operationGroup")
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
                let construct = Object.getPrototypeOf(d).constructor
                pane.innerHTML =  ejs.render(construct.description_template, {"state":d})

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
                let op = new State(d)
                op.x = d.x + d.width + 50
                op.y = d.y
                states.push(op)
                let conn = new SelectTransformation(d, op)
                d.fields.forEach((f) => {
                    conn.fields.push([f, f, "&#8594;"])
                })
                transformations.push(conn)

                board.draw()

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

        this.update()
    }
}