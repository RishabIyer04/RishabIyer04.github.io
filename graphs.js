async function loadData() {
    const data = await d3.csv('data/Filtered_NBA_Player_Stats.csv');
    data.forEach(d => {
        d.Age = +d.Age;
        d.PTS = +d.PTS;
        d["2P"] = +d["2P"];
    });
    return data;
}

function drawPlot1(data) {
    const sortedData = data.filter(d => d.Pos === 'PG');

    const svg = d3.select('#graph1');
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    // const translateX = (+svg.attr("width") - width) / 2;
    // const translateY = (+svg.attr("height") - height) / 2;

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
        // .attr('transform', `translate(${translateX + margin.left},${translateY + margin.top})`);

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
        .style("fill", "#69b3a2");

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

}

window.loadData = loadData;
window.drawPlot1 = drawPlot1;


function addAnnotations(g, x, y, data) {
    // Find players with the highest PTS at ages 24 and 35
    const topPlayer24 = data.filter(d => d.Age === 24).reduce((a, b) => a.PTS > b.PTS ? a : b);
    const topPlayer35 = data.filter(d => d.Age === 35).reduce((a, b) => a.PTS > b.PTS ? a : b);

    // Add annotations
    const annotations = [
        {
            note: {
                title: `${topPlayer24.Player}`,
                label: `Position: ${topPlayer24.Pos} \n Age: ${topPlayer24.Age} \n PTS: ${topPlayer24.PTS} \n 2PT: ${topPlayer24["2P"]}`
            },
            data: topPlayer24,
            dx: 50,  // move 50 pixels to the right
            dy: -50  // move 50 pixels up
        },
        {
            note: {
                title: `${topPlayer35.Player}`,
                label: `Position: ${topPlayer35.Pos} \n Age: ${topPlayer35.Age} \n PTS: ${topPlayer35.PTS} \n 2PT: ${topPlayer35["2P"]}`
            },
            data: topPlayer35,
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