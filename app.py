from flask import Flask, request, render_template, jsonify
app = Flask(__name__)

from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('주소를 입력해주세요', tlsCAFile=ca)
db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')




@app.route("/introPosting", methods=["POST"])
def comment_post():
    comment_receive = request.form['comment_give']
    num = len(list(db.fan.find({},{'_id':False})))


    doc = {'comment': comment_receive,
           'like' : 0,
           'num' : num +1 
    }
    db.teamComment.insert_one(doc)
    
    return jsonify({'msg': 'POST 연결 완료!'})







# #DELETE
# @app.route("/comment_delete", methods=["POST"])
# def comment_delete():
#     #db에 m_id가 int로 저장되어 있으니 str로 넘어오는 m_id를 int로 변경해준다.
#     index_receive = request.form['_id']
#     #m_id가 받아온 m_id인걸 찾아서 삭제한다.
#     db.teamComment.delete_one({'index':index_receive})
#     return jsonify({'msg':"삭제 완료!"})

# 댓글 가져오기
@app.route("/showComment", methods=["GET"])
def comment_get():
       teamComment_data = list(db.teamComment.find({},{'_id':False}))
       return jsonify({'result': teamComment_data })



# 좋아요
@app.route("/fan/like", methods=["POST"]) 
def fan_like():
    num_receive = request.form['num_give']
    like_receive = request.form['like_give']

    db.teamComment.update_one({'num': int(num_receive) },{'$set': {'like' : int(like_receive) + 1 }})
    return jsonify({'msg':'좋아요'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5008, debug=True)