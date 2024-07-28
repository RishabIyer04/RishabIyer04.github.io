async function loadData() {
    const data = await d3.csv('data/Filtered_NBA_Player_Stats.csv');
    data.forEach(d => {
        d.Age = +d.Age;
        d.PTS = +d.PTS;
        d["2P"] = +d["2P"];
    });
    return data;
}

function drawPlot1(svgId, data, position) {
    const sortedData = data.filter(d => d.Pos === position);

    const svg = d3.select(svgId);
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    svg.selectAll('*').remove();


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create axes
    const x = d3.scaleLinear()
        .domain([d3.min(sortedData, d => d.Age), 40])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 40])
        .range([height, 0]);

    // Add dots
    g.selectAll('circle')
        .data(sortedData)
        .enter().append('circle')
        .attr('cx', d => x(d.Age))
        .attr('cy', d => y(d.PTS))
        .attr('r', 7)
        .style("fill", "#69b3a2")
        .style("stroke", "black");

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height + 50})`)
        .call(d3.axisBottom(x).ticks(23)) // 23 evenly spaced ticks
        .append('text')
        .attr('fill', '#000')
        .attr('x', width / 2)
        .attr('y', margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .text('Age');

    // Add y-axis
    svg.append('g')
        .attr("transform", `translate(${margin.left}, 50)`)
        .call(d3.axisLeft(y).ticks(8)) // 8 evenly spaced ticks
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 20)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('PTS');

    addAnnotations(g, x, y, sortedData);
    addTooltips(g, sortedData);

}

window.loadData = loadData;
window.drawPlot1 = drawPlot1;


function addAnnotations(g, x, y, data) {
    // Find players with the highest PTS at ages 24 and 35
    const topYoungPlayer = data.filter(d => d.Age >= 19 && d.Age <= 30).reduce((a, b) => a.PTS > b.PTS ? a : b);
    const topOldPlayer = data.filter(d => d.Age >= 31 && d.Age <= 40).reduce((a, b) => a.PTS > b.PTS ? a : b);

    // Add annotations
    const annotations = [
        {
            note: {
                title: `${topYoungPlayer.Player}`,
                label: `Position: ${topYoungPlayer.Pos} \n
                        Age: ${topYoungPlayer.Age} \n 
                        PTS: ${topYoungPlayer.PTS} \n 
                        2P: ${topYoungPlayer["2P"]} \n 
                        3P: ${topYoungPlayer["3P"]}`
            },
            data: topYoungPlayer,
            dx: 50,  // move 50 pixels to the right
            dy: -50  // move 50 pixels up
        },
        {
            note: {
                title: `${topOldPlayer.Player}`,
                label: `Position: ${topOldPlayer.Pos} \n 
                        Age: ${topOldPlayer.Age} \n 
                        PTS: ${topOldPlayer.PTS} \n 
                        2P: ${topOldPlayer["2P"]} \n 
                        3P: ${topYoungPlayer["3P"]}`
            },
            data: topOldPlayer,
            dx: 50,  // move 50 pixels to the right
            dy: -50  // move 50 pixels up
        }
    ];

    const makeAnnotations = d3.annotation()
        .type(d3.annotationLabel)
        .accessors({
            x: d => x(d.Age),
            y: d => y(d.PTS)
        })
        .annotations(annotations);

    g.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);
}


function addTooltips(g, data) {
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

   g.selectAll("circle")
        .on("mouseover", function(event, d) {
            d3.select(this)
                .attr('r', 7)
                .style("fill", "#d22c2c")
                .style("stroke", "red");

            tooltip.transition()
                .duration(100)
                .style("opacity", .9);

            tooltip.html(`Name: ${d.Player} <br/> Position: ${d.Pos} <br/> Age: ${d.Age} <br/> PTS: ${d.PTS} <br/> 2P: ${d["2P"]} <br/> 3P: ${d["3P"]}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr('r', 7)
                .style("fill", "#69b3a2")
                .style("stroke", "black");

            tooltip.transition()
                .duration(100)
                .style("opacity", 0);
        });
}