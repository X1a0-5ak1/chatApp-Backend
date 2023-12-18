// SNSサーバ
// データベースに接続
const db = require("./database");

// WEBサーバを起動
const express = require("express");
const ep = express();
const portNo = 3001;
ep.listen(portNo, () => {
  console.log("起動しました", `http://localhost:${portNo}`);
});

//そのうち使用するので置いておく
//const date = (new Date().getFullYear + '-' + (new Date().getMonth + 1) + '-' + new Date().getDate).toString;

// APIの定義

//ユーザ追加
ep.get("/api/plususer", (req, res) => {
  const userid = req.query.userid;
  const password = req.query.password;
  if (userid === "" || password === "") {
    return res.json({ status: false, msg: "パラメータが空" });
  }
  // 既存ユーザのチェック
  db.getUser(userid, (user) => {
    if (user) {
      // 既にユーザがいる
      return res.json({ status: false, msg: "既にユーザがいます" });
    }
    // 新規追加
    db.plusUser(userid, password, (token) => {
      if (!token) {
        res.json({ status: false, msg: "DBのエラー" });
      }
      res.json({ status: true, token });
    });
  });
});

//ユーザログイン
ep.get("/api/login", (req, res) => {
  const userid = req.query.userid;
  const password = req.query.password;
  db.login(userid, password, (err, token) => {
    if (err) {
      res.json({ status: false, msg: "認証エラー" });
      return;
    }
    // ログイン成功したらトークンを返す
    res.json({ status: true, token });
  });
});

//チャットの連絡先追加
ep.get("/api/add_friend", (req, res) => {
  const userid = req.query.userid;
  const token = req.query.token;
  const friendid = req.query.friendid;
  db.checkToken(userid, token, (err, user) => {
    if (err) {
      // 認証エラー
      res.json({ status: false, msg: "認証エラー" });
      return;
    }
    // 友達追加
    user.friends[friendid] = true;
    db.updateUser(user, (err) => {
      if (err) {
        res.json({ status: false, msg: "DBエラー" });
        return;
      }
      res.json({ status: true });
    });
  });
});

//chat.dbのmessageに追加
ep.get("/api/send_message", (req, res) => {
  const time = new Date().getHours + "-" + new Date().getMinutes;
  const userid = req.query.userid;
  const text = req.query.text;
  const token = req.query.token;
  db.checkToken(userid, token, (err, user) => {
    if (err) {
      res.json({ status: false, msg: "認証エラー" });
      return;
    }
    //チャットに追加
    const messages = [{ time, userid, text }];
    db.chatDB.insert(messages, (err, it) => {
      if (err) {
        res.json({ status: false, msg: "DBエラー" });
        return;
      }
      res.json({ status: true, chatid: it._id });
    });
  });
});

//連絡先の一覧を取得
ep.get("/api/get_friends", (req, res) => {
  db.userDB.find({}, (err, docs) => {
    if (err) return res.json({ status: false });
    const users = docs.map((e) => e.userid);
    res.json({ status: true, users });
  });
});

// ユーザ情報を取得
ep.get("/api/get_user", (req, res) => {
  const userid = req.query.userid;
  db.getUser(userid, (user) => {
    if (!user) return res.json({ status: false });
    res.json({ status: true, friends: user.friends });
  });
});

//連絡先のユーザIDを使用してメッセージを取得する

// 静的ファイルを自動的に返すようルーティングする
ep.use("/public", express.static("./public"));
ep.use("/login", express.static("./public"));
ep.use("/users", express.static("./public"));
ep.use("/messages", express.static("./public"));
ep.use("/", express.static("./public"));
