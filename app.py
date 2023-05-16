from flask import Flask, render_template, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://sparta:test@cluster0.ucno5cd.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')




# @app.route("/inputComment", methods=["POST"])
# def guestbook_post():
#     comment_receive = request.form['comment_give']

#      m_id = len(list(db.movies.find({})))

#     doc = {
#            'comment': comment_receive
#     }
#     db.teamComment.insert_one(doc)
    
#     return jsonify({'msg': 'POST 연결 완료!'})


# 팀 정보 가져오기
@app.route("/teamInfo", methods=["GET"])


def guestbook_get():
    teamInfo = list(db.fan.find({},{'_id':False}))
    return jsonify({'result': teamInfo })



# 댓글 가져오기
# @app.route("/showComment", methods=["GET"])
# def guestbook_get():
#     teamInfo = list(db.teamInfo.find({},{'_id':False}))
#     return jsonify({'result': teamInfo })



# #DELETE
# @app.route("/comment_delete", methods=["POST"])
# def movie_delete():
#     #db에 m_id가 int로 저장되어 있으니 str로 넘어오는 m_id를 int로 변경해준다.
#     m_id_receive = int(request.form['m_id_give'])
#     #m_id가 받아온 m_id인걸 찾아서 삭제한다.
#     db.movies.delete_one({'m_id':m_id_receive})
#     return jsonify({'msg':"삭제 완료!"})

# #READ
# @app.route("/movieworld", methods=["GET"])
# def movie_get():   
#     all_movies = list(db.movies.find({},{'_id':False}))
#     return jsonify({'result': all_movies})





if __name__ == '__main__':
   app.run('0.0.0.0', port=5010, debug=True)