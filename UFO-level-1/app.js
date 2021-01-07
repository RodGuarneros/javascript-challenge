
// Assign the data from `data.js` to a descriptive variable
let sightings = data;
let tableMatch = null;

// The reference for tbody just after headers
let tbody = d3.select("tbody");
let filteredData = 0;

// Select the button
let button = d3.select("#filter-btn");

// Select the form
let form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);
//-------------------------------------
// fill by default the table with all data, this could be inpractical if we have a lot of objects, but in this case is ok
sightings.forEach(a => {
    let rowinit = tbody.append("tr")
    for(i in a){
        rowinit.append("td").text(a[i]);
    }
});
//-------------------------------------
// Complete the event handler function for the filter form
function runEnter() {

// Prevent the page from refreshing
d3.event.preventDefault();
  
// Select the input element and get the raw HTML node
let inputElement = d3.select("#datetime");

// Get the value property of the input element
let inputValue = inputElement.property("value");

console.log(inputValue);
console.log(sightings);

// so as to avoid acumulation and get a table empty for new consultation
// selecting all the tbody elements (sights)
let sights = d3.select("tbody")
  
// clean the last output
sights.html("")
  
// new filtering based on inputValue  
let filteredData = sightings.filter(sight => sight.datetime === inputValue);

// Loop so as to fill the table with every element in filteredData
filteredData.forEach(d =>{
let row = tbody.append("tr")
    for(x in d){
        row.append("td").text(d[x]);
    }
}); 
}; 

