class Documentation {
    constructor() {

    }

    static template = `
        <html>
        <header>
            <style>
                table {
                    border:1px;
                }
            </style>
        </header>
        <body>
        <% var inputs = states.filter(state => state instanceof InputState); %>
        <% var outputs = states.filter(state => state instanceof OutputState); %>
        <h1>Inputs</h1>
        <% for(var i=0; i<inputs.length; i++) {%>
              <h2><%- inputs[i].label %></h2>
              <h3>Description</h3>
              <p>Some user description</p>
              <h3>Attributes</h3>
              <p>This input is a csv using ";" as delimiter.</p>
              <h3>Fields</h3>
              <p> A total of <%= inputs[i].fields.length %> are defined</p>
              <table>
              <tr>
              <th>Field name</th>
              <th>Field type</th>
              </tr>
              <% for(var j=0; j<inputs[i].fields.length; j++) {%> 
              <tr>
              <td><%=inputs[i].fields[j]%></td>
              <td></td>
              </tr>   
              <%}%>           
              </table>
        <% } %>
        <h2>Outputs</h2>
        </body>
        </html>
    `

    render() {
        download("doc.html",ejs.render(Documentation.template, {'states':states, 'transformations':transformations}));
    }

}