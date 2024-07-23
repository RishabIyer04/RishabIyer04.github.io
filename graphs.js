d3.csv('data/Car_Summary.csv').then(data => {
    // Convert necessary fields to numeric
    data.forEach(d => {
        d['# of Models'] = +d['# of Models'];
        d['Avg Engine HP'] = +d['Avg Engine HP'];
        d['Avg MPG'] = +d['Avg MPG'];
        d['Avg MSRP'] = +d['Avg MSRP'];
    });

    // Create visualizations for each slide
    sceneMSRPBarChart(data, '#visualization-1');
    sceneHorsepowerPrice(data, '#visualization-2');
    sceneFuelEfficiencyHorsepower(data, '#visualization-3');
});


function sceneMSRPBarChart(data, container) {
    // Create an SVG container
    const svg = d3.select(container).append('svg')
        .attr('width', '100%')
        .attr('height', 600);

    const margin = {top: 20, right: 30, bottom: 40, left: 150};
    const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
    const height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Add bars
    g.selectAll('.bar')
        .data(sortedData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => y(d.Brand))
        .attr('width', d => x(d['Avg MSRP']))
        .attr('height', y.bandwidth())
        .attr('fill', 'steelblue');


    // Add bar labels
    g.selectAll('.label')
        .data(sortedData)
        .enter().append('text')
        .attr('class', 'label')
        .attr('x', d => x(d['Avg MSRP']) - 3)
        .attr('y', d => y(d.Brand) + y.bandwidth() / 2 + 5)
        .attr('text-anchor', 'end')
        .text(d => `$${d3.format(",")(d['Avg MSRP'])}`);



    // Sort data by Avg MSRP in descending order
    const sortedData = data.sort((a, b) => b['Avg MSRP'] - a['Avg MSRP']);

    // Create scales
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleBand().range([0, height]).padding(0.1);

    // Set domains
    x.domain([0, d3.max(sortedData, d => d['Avg MSRP'])]);
    y.domain(sortedData.map(d => d.Brand));

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(10).tickFormat(d => `$${d3.format(",")(d)}`))
        .append('text')
        .attr('x', width)
        .attr('y', -10)
        .attr('text-anchor', 'end')
        .attr('fill', 'black')
        .text('Avg MSRP');

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(y));

}