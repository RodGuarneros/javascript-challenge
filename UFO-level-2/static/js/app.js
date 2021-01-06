// Assign the data from `data.js` to a descriptive variable
let sightings = data;
let finaltable = null;

// selecting all the tbody elements (sights)
let sights = d3.select("tbody")
let filtered = 0;

// Select the button
let button = d3.select("#filter-btn");

// Select the form
let form = d3.select("#form");

// Create event handlers (what happen when user clicks the botton)
button.on("click", runEnter);
form.on("submit",runEnter);
//-------------------------------------
// fill by default the table with all data, this could be inpractical if we have a lot of objects, but in this case is ok
sightings.forEach(a => {
    let rowinit = sights.append("tr")
    for(i in a){
        rowinit.append("td").text(a[i]);
    }
});
//-------------------------------------
// Complete the event handler function for the filter form
function runEnter() {

// Prevent the page from refreshing
    d3.event.preventDefault();
// flag th table is filtered
    filtered = 1;
  
// new filtering based on every inputValue but evaluating full conditions  
    // let filteredData = sightings.filter(sight => (sight.datetime === d3.select("#datetime").property("value")) && 
    //     (sight.city === d3.select("#city").property("value").toLowerCase()) &&
    //     (sight.state === d3.select("#state").property("value").toLowerCase()) &&
    //     (sight.country === d3.select("#country").property("value").toLowerCase()) &&
    //     (sight.shape === d3.select("#shape").property("value").toLowerCase()) &&
    //     (sight.duration === d3.select("#duration").property("value").toLowerCase()) &&
    //     (sight.comments === d3.select("#comments").property("value").toLowerCase()));

// stablish the reference of fields and get the values entered by the user (inputs)
    let dateUser =  d3.select("#datetime").property("value");
    let cityUser =  d3.select("#city").property("value").toLowerCase();
    let stateUser = d3.select("#state").property("value").toLowerCase();
    let countryUser = d3.select("#country").property("value").toLowerCase();
    let shapeUser = d3.select("#shape").property("value").toLowerCase();

// stablishing a selective filter to take in to account only entered values by the user
if(dateUser || cityUser || stateUser || countryUser || shapeUser){
    
    filtered = 1;

    let userInputs = [["datetime", dateUser], ["city", cityUser], ["state", stateUser], ["country", countryUser], ["shape", shapeUser]];
    let inputsExist = userInputs.filter(input => input[1] !== "");
    let final = inputsExist.map(m => "row." + m[0] + " == " + "'" + m[1] + "'").join(" && ");

    finaltable = sightings.filter(row => eval(final));
// wipe out the tbody to be able to write out new table
    sights.html("")

// Loop so as to fill the table with every element in filteredData
    finaltable.forEach(d =>{
        let cell = sights.append("tr")
        for(x in d){
            cell.append("td").text(d[x]);
        }
    }); 
}; 

}

// defining reference to the button reset
let reset = d3.select("#reset-btn")
// Create event handlers 
reset.on("click", resetFilter);

// reset table to original display
function resetFilter(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // reset the form
    document.getElementById("form").reset();
    // flag that table is not filtered
    filtered = 0;
    // wipe out the tbody to be able to write out new table
    sights.html("");
    // fill in observations only where date matches user input
    sightings.forEach(a => {
        let rowinit = sights.append("tr")
        for(i in a){
            rowinit.append("td").text(a[i]);
        }
    });
}

