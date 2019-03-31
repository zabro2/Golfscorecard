var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(xhttp.responseText);
        console.log(data);
        for (let i = 0; i < data.courses.length; i++) {
            $("#courseSelect").append(`<option value='${data.courses[i].id}'>${data.courses[i].name}</option>`);
        }
    }
};
xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
xhttp.send();
function updateSelectDifficulty() {
    let courseVal = document.getElementById("courseSelect").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhttp.responseText);
            console.log(data);
            $("#difficulty").html('');
            for (let i = 0; i < data.data.holes[0].teeBoxes.length; i++) {
                $("#difficulty").append(`<option value='${data.data.holes[0].teeBoxes[i].teeTypeId}'>${data.data.holes[0].teeBoxes[i].teeType}</option>`)
            }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseVal}`, true);
    xhttp.send();
}