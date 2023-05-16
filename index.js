console.log("sdfsfd");

$(document).ready(function () {
  show_teamInfo();
});

function show_teamInfo() {
  fetch("/teamInfo")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
