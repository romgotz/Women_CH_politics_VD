
// Define graph dimensions and margins 
const margin = {top: 60, right: 60, bottom: 80, left: 120},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom, 
    padding = 60;

// Create a svg area that will contain the graph (named plot_area in .html)
const svg = d3.select("#plot_area")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('overflow', 'visible') // to make sure that the tooltip box appears
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
// Add a link to the data 
svg
    .append("a")
    .attr("xlink:href", (d) => {
        return "https://www.bfs.admin.ch/bfs/fr/home/statistiques/politique/elections/femmes.html#-561474660";
    })
    .attr("class", "subtitle")
    .append("text")
      .attr("x", width - margin.right/2 - 4)
      .attr("y", height + 60)
      .text("Données: OFS 2021");

// Add a copyright with author 
svg
    .append('a')
    .attr('class', 'copyright')
    .attr('target', '_blank')
    .append('text')
      .attr('x', width - margin.right)
      .attr('y', height + 75)
      .text('Auteur: Romain Götz, 2021')

// Once it is in place, we do an animation to grasp the user's attention to the sidebar that gives an explanation of what this visualisation is about. Starts after 2 seconds, to make sure that the user is looking. 
  let animation_count = 0;  
  setTimeout(function(){
    $(".explication").addClass('highlight');
    animation_count += 1;
    }, 2000);

// Download the data and begin the visualisaton
d3.csv('parlements_cantonaux.csv').then( function(data) {

    // Get all 26 cantons from the file  
    const allGroup = new Set(data.map(d => d.canton))
  
    // Create the options of the drop down menu, one button for each canton 
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter() // enter() cause new data
    	.append('option')
      .text(d => d) // text used for the button
      .attr("value", d => d) // corresponding value when button is selected
      .style('left', '100px')
      .style('top', '50px')
      .attr('class', 'select-button')

    // Define a color scale with a color assigned for each canton 
    const myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // Create the x-axis 
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.annee))
      .range([ 0, width]);

    // Add the x-axis  
    svg.append("g")
      .classed('axeX', true) // Add a class to remove it easily after
      .attr("transform", `translate(0, ${height})`)
      .transition()
      .duration(1000) // add a transition when it appears 
      .call(d3.axisBottom(x).tickFormat(d3.format("d"))) // tickformat to have 2000 and not 2,000 displayed

    // Add the legend for x-axis
    svg.append("text")
        .attr("y", height + 25)
        .attr("x", width / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Année");

    // Create the y-axis 
    const y = d3.scaleLinear()
      .domain([0, 100]) // do not change as we have %
      .range([ height, 0]);

    // Add the y-axis  
    svg.append("g")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));

    // Add legend to the y-axis 
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.right)
        .attr("x", 0 - height/2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("% de femmes");

    // Function updating the graph when the button is changed  
    function update(selectedGroup) {

      // remove line, area and title
      d3.selectAll("path.area").remove();
      d3.selectAll(".line").remove();
      d3.selectAll(".title").remove();
      d3.selectAll(".tooltip").remove();

      // Selecting new data based on the button selected 
      const dataFilter = data.filter(function(d){return d.canton==selectedGroup})

      // removing the old axis
      d3.select('.axeX')
        .transition()
        .remove();

      // Creating the new x-axis 
      const x = d3.scaleLinear()
      .domain([d3.min(dataFilter, d => d.annee), d3.max(dataFilter, d => d.annee)])
      .range([ 0, width]);

      // adding the new axis with updated data 
      svg.append("g")
        .classed('axeX', true) // again add the class to remove it easily after 
        .attr("transform", `translate(0, ${height})`)
        .transition()
        .duration(1500)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      // Add a changing title to the graph
      // defining some variables to make the title responsive to selected button 
      let name = dataFilter[0].canton,
      begin = d3.min(dataFilter, d => d.annee),
      end = d3.max(dataFilter, d => d.annee);
      
      // Adding a title to the graph
      // Different names for Conseil des Etats et Conseil National
      if (name == "CH - Conseil National") {
        svg.append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Conseil national (niveau fédéral) : Evolution de " + begin + " à " + end)
        
      } 
      else if (name == "CH - Conseil des Etats") {
        svg.append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Conseil des Etats (niveau fédéral) : Evolution de " + begin + " à " + end)
      } 
      else { 
        svg.append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Parlement cantonal de " + name + ": Evolution de " + begin + " à " + end);
      };

      // Adding some information in the sidebar on the right (function defined at the end)
      afficher_info_canton(dataFilter);

      // Creating the line with the selected group
      let line = svg
        .append('g')
        .append("path")
        .datum(dataFilter)
        .attr('class', 'line')
        .attr("d", d3.line()
            .x(d => x(d.annee))
            .y(d => y(d.femmes/d.total*100))
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })
          .style("stroke-width", 3)
          .style("fill", "none")
          .call(transition) // calling the transition function to build the line 
  
      // defining the area appearing when the line is finished 
      let areaPath = svg
          .append("path")
          .datum(dataFilter)
          .attr("class", "area")
          .attr("d", d3.area()
          .x(d => x(d.annee))
          .y0(height)
          .y1(d => y(d.femmes/d.total*100)))
          .transition()
          .duration(15000) // transition to have the area appearing only after the line is completed --> to make sure that one thing is occuring at the same time, otherwise could lose user's attention 
          .attr("transform", "translate(0,0)")
          .attr('fill', d => myColor(selectedGroup))
          .attr('fill-opacity', 0.4);


      // Adding an interactivity to show data when user is hovering their mouse on the graph with two different objects : focus adds lines to the axes and circles for each data, and tooltip add info in a box (separated to make it easier)

      // define decimals for the % value 
      const f = d3.format(".2f");

      // define the focus 
      let focus = svg
        .append('g')
        .attr('class', 'focus')
        .style('display', 'none');

      // line joining x-axis
      focus
        .append('line')
          .attr('class', 'x')
          .style('stroke', 'blue')
          .style('stroke-dasharray', '3,3')
          .style('opacity',0.5)
          .attr('y1', 0)
          .attr('y2', height);
      
      // line joining the y-axis
      focus
        .append('line')
          .attr('class', 'y')
          .style('stroke', 'blue')
          .style('stroke-dasharray', '3,3')
          .style('opacity', 0.5)
          .attr('x1', width) 
          .attr('x2', width)

      // circles for every data 
      focus
        .append('circle')
          .attr('class', 'y')
          .attr('fill', 'none')
          .style('stroke', 'purple')
          .attr('r', 4);

      // creating the tooltip with the text 
      let tooltip = d3
        .select('body')
          .append('div')
          .attr('class' , 'tooltip')
          .style('display', 'none');

      let tooltipYear = tooltip
        .append("div")
          .append("span")
            .attr("class", "tooltip-year");

      let tooltipWomen = tooltip
        .append("div")
          .append("span")
            .attr("class", "tooltip-women")

      // creating a rectangle to capture the mouse position
      svg
        .append('rect')
          .attr('class', 'overlay')
          .attr('width', width)
          .attr('height', height)
          .style('fill', 'none')
          .style('pointer-events', 'all')
          .on('mouseover', () => focus.style('display', null))
          .on('mouseout', () => focus.style('display', 'none'))
          .on('touchmove mousemove', mousemove);

      // defining the mousemove function
      function mousemove(event){
        // defining some variables to access data to show after
        const bisect = d3.bisector((d) => d.annee).left 
        let x0 =x.invert(d3.pointer(event, this)[0]),
        i = bisect(dataFilter, x0, 1),
        d0 = dataFilter[i -1], 
        d1 = dataFilter[i],
        d = x0 - d0.annee > d1.annee - x0 ? d1 : d0 
       
        // we define the x and y position of the circle
        focus
          .select('circle.y')
          .attr("transform", "translate(" + x(d.annee) + "," + y(d.femmes/d.total*100) + ")");

        // define the position of x and y lines 
        focus
          .select(".x")
            .attr("transform", "translate(" + x(d.annee) + "," + y(d.femmes/d.total*100) + ")")
            .attr("y2", height - y(d.femmes/d.total*100));
        focus
          .select(".y")
            .attr("transform", "translate(" + width * -1 + "," + y(d.femmes/d.total*100) + ")")
            .attr("x2", width + width);
        
        // Adding text in a rectangle with tooltip 
        tooltip
          .attr("style", "left:" + (x(d.annee) + 64) + "px;top:" + y(d.femmes/d.total*100) + "px;");
        tooltip
          .select(".tooltip-year")
          .text("Année : " + d.annee);
        tooltip
          .select(".tooltip-women")
          .text("Femmes: " + f(d.femmes/d.total*100) + "%");
      };
    };

    // When the choice in the drop down menu is changed, update the selection and the graph 
    d3.select("#selectButton").on("change", function(event,d) {
        // recover the option that has been chosen
        const selectedOption = d3.select(this).property("value")
        // run the update function with this selected option
        update(selectedOption)
    })

});

// define the function transition 
function transition(path){
  path.transition()
    .duration(5000)
    .attrTween('stroke-dasharray', tweenDash)
};
// define function tweenDash used in the transition 
function tweenDash() {
  const l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function(t) { return i(t) };
}; 


 // Defining function to add info in the sidebar
 function afficher_info_canton(d){
  // defining some variables to access information
  let canton = d[0].canton, 
  seats = d[9].total, // to have actual # of seats
  droit_vote = d[0].vote_femme;

  // Write everything in html and then add it to the infobox in a table (easier than adding text in a svg object)
  let html = '<table class="infotable">';
  // Different name of canton for CE/CN and other cantons
  if (canton == "CH - Conseil des Etats" || canton == "CH - Conseil National") {
    html += '<tr>';
    html +=   '<td class="label"> Canton:</td>';
    html +=   '<td> Niveau fédéral</td>';
    html += '</tr><tr>'; 
  } 
  else {
    html += '<tr>';
    html +=   '<td class="label">Canton:</td>';
    html +=   '<td>' + canton + '</td>';
    html += '</tr><tr>'
  }; 
  html +=   '<td class="label">Sièges au parlement:</td>';
  html +=   '<td>' + seats + '</td>';
  html += '</tr><tr>';
  html +=   '<td class="label">Droit de vote des femmes:</td>';
  html +=   '<td>' + droit_vote + '</td>';
  html += '</tr></table>';
  // Anecdote about App.Rh.Int. and women's right to vote
  if(canton == "Appenzell-Rh.-Int."){
    html += '<p>'
    html += "En 1990, une nouvelle votation cantonale dans le canton arrive à un nouveau refus du droit de vote accordé aux femmes. Suite au recours de Theresia Rohner, c'est le tribunal fédéral qui juge que l'absence de droit de vote pour les femmes dans le canton est anti-constitutionnel et oblige le canton à accorder le droit de vote aux femmes" + '</p>';
  }
  // Add the html in the sidebar with delay to avoid losing user's attention when the line is building 
  $(".infobox").removeClass('highlight'); // remove the class to do the animation again
  setTimeout(function(){
    $( "i" ).html(html);
    $(".infobox").addClass('highlight'); // do the little animation again to grasp user's attention 
    }, 6500);

};