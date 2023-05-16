const posting = () => {
  // let url = $("#url").val();
  let comment = $("#commentInput").val();

  let formData = new FormData();
  formData.append("comment_give", comment);

  fetch("/introPosting", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      // 새로고침
      window.location.reload();
    });
};

// const movieworld_delete = () => {
//   let formData = new FormData();
//   formData.append("index", index);
//   fetch("/comment_delete", { method: "POST", body: formData })
//     .then((res) => res.json())
//     .then((data) => {
//       alert(data["msg"]);
//       //새로고침
//       window.location.reload();
//     });
// };

// $(document).ready(function(){ })와 같음.
$(function () {
  listing();
});

// READ
const listing = () => {
  fetch("/showComment")
    .then((res) => res.json())
    .then((data) => {
      let rows = data["result"];
      $("#inputList").empty();
      rows.forEach((a) => {
        let like = a['like']
        let num = a['num']
        let temp_html = `<li>
                        ${a["comment"]}<i class="fa-regular fa-square-minus"></i>
                        <div class="like">   
                        <p class="like-num">${like}</p>                             
                        <p type="button" onclick="clickLike(${num},${like})" class="like-logo">🖤</p>
                       </div>
                      </li>`;
        $("#inputList").append(temp_html);
      });
    });
};

function clickLike(num, like) {
  let receiveNum = num
  let receiveLike = like

  let formData = new FormData();
  formData.append("num_give", receiveNum);
  formData.append("like_give", receiveLike);

  fetch("/fan/like", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      // 새로고침
      window.location.reload();
    });
}
