document.addEventListener('DOMContentLoaded', function() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    req.send();
    req.onload = function() {
        var data = JSON.parse(req.responseText)
        var dataset = data.data;
        console.log(dataset[200])
        var yearsDate = dataset.map(function(d) {
            return new Date(d[0])
        })
        var x = d3.scaleTime().domain([d3.min(yearsDate), d3.max(yearsDate)])
            .range([0, 500])



        var linearScale = d3.scaleLinear().domain([0, d3.max(dataset, function(d) {
                return d[1];
            })])
            .range([500, 0])
        var y = d3.scaleLinear().domain([0, d3.max(dataset, function(d) {
                return d[1];
            })])
            .range([0, 500])


        var div = d3.select("body")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")

        var canvas = d3.select("body")
            .append("svg")
            .attr("x", 300)
            .attr("width", 600)
            .attr("height", 600)

        canvas.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d, i) { return x(yearsDate[i]) })
            .attr("width", 500 / dataset.length)
            .attr("height", function(d) {
                return y(d[1])
            })
            .attr("y", function(d) {
                return 500 - y(d[1])
            })
            .attr("fill", "steelblue")
            .attr("class", "bar")
            .attr("opacity", 0.9)
            .attr('transform', 'translate(60, 0)')
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", 0.9)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(100)
                    .style("opacity", 0);
            })
        canvas.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(60,500)")
            .call(d3.axisBottom(x))

        canvas.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(60,0)")
            .call(d3.axisLeft(linearScale));

    }
})