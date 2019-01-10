document.addEventListener('DOMContentLoaded', function() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    req.send();
    req.onload = function() {
        var data = JSON.parse(req.responseText)
        var dataset = data.data;
        console.log(dataset[200])
        var x = d3.scaleBand().domain(dataset.map(function(d) {
                return d[0]
            }))
            .range([0, 500])
            .paddingInner([1])
        var y = d3.scaleLinear().domain([0, d3.max(dataset, function(d) {
                return d[1];
            })])
            .range([0, 500])


        var canvas = d3.select("body")
            .append("svg")
            .attr("x", 300)
            .attr("width", 500)
            .attr("height", 500)

        canvas.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d) { return x(d[0]) })
            .attr("width", 5)
            .attr("height", function(d) {
                return y(d[1])
            })
            .attr("y", function(d) {
                return 500 - y(d[1])
            })
            .attr("fill", "steelblue")

        canvas.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + 500 + ")")
            .call(d3.axisBottom(x))
        canvas.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

    }
})