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
        let comment = a['comment']
        let like = a['like']
        let num = a['num']
        let id = a['_id']
        console.log(id)
        let temp_html = `<li>
                        ${comment}<i id=${id} onclick='commentdelete(event)' class="fa-regular fa-square-minus"></i>
                        <div class="like">   
                        <p class="like-num">${like}</p>                             
                        <p type="button" id=${id} onClick={(e)=>{clickLike(${like}, e)}} class="like-logo">🖤</p>
                       </div>
                      </li>`;
        $("#inputList").append(temp_html);
      });
    });
};

// 댓글작성
const posting = () => {
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

// 댓글삭제
const commentdelete = (event) => {
  let id = event.target.getAttribute('id');
  let formData = new FormData();
  formData.append("id", id);
  fetch("/comment_delete", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      //새로고침
      window.location.reload();
    });
};



// 좋아요
const clickLike = (like, e) => {
  let id = e.target.getAttribute('id');

  console.log(id)

  like++
  let formData = new FormData();
  // formData.append("num_give", receiveNum);
  // formData.append("like_give", like);
  formData.append("id_give", id);
  formData.append("like_give", like);

  fetch("/fan/like", { method: "POST", body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data["msg"]);
      // 새로고침
      window.location.reload();
    });
}
