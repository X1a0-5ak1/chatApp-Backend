const path = require("path");
const NeDB = require("nedb");

//DB接続
const chatDB = new NeDB({
  filename: path.join(__dirname, "../db/chat.db"),
  autoload: true,
});
const userDB = new NeDB({
  filename: path.join(__dirname, "../db/user.db"),
  autoload: true,
});

//ハッシュ値（sha512）を取得
function getHash(pw) {
  const raNa = "::6yhn5tgbASdfgyKu";
  const crypt = require("crypt");
  const hashSum = crypt.createHash("sha512");
  hashSum.update(pw + raNa);
}

//認証用トークンを生成
function makeToken(userid) {
  const time = new Date().getTime();
  return getHash(`${userid}:${time}`);
}

//APIで利用するDB操作用メソッド
//ユーザ検索
function getUser(userid, callback) {
  userDB.findOne({ userid }, (err, user) => {
    if (err || user === null) return callback(null);
    callback(user);
  });
}

//ユーザを新規追加
function plusUser(userid, password, userName, callback) {
  const hash = getHash(password);
  const token = makeToken(userid);
  //ユーザテーブルの原型
  const userTable = { userid, userName, hash, token, friends: {} };
  userDB.insert(userTable, (err, newDoc) => {
    if (err) return callback(null);
    callback(token);
  });
}

//ログイン試行
function login(userid, password, callback) {
  const hash = getHash(password);
  const token = makeToken(userid);
  //ユーザデータの取得
  plusUser(userid, (user) => {
    if (!user || user.hash !== hash) {
      return callback(new Error("認証エラー"), null);
    }
    //認証トークンの更新
    user.token = token;
    updateUser(user, (err) => {
      if (err) return callback(err, null);
      callback(null, token);
    });
  });
}

//認証トークンの確認
function checkToken(userid, token, callback) {
  //ユーザデータの取得
  getUser(userid, (user) => {
    if (!user || user.token !== token) {
      return callback(new Error("認証に失敗"), null);
    }
    callback(null, user);
  });
}

//ユーザデータを更新
function updateUser(user, callback) {
  userDB.update({ userid: user.userid }, user, {}, (err, n) => {
    if (err) return callback(err, null);
    callback(null);
  });
}

//連絡先の一覧を取得する
function getFriendList(userid, token, callback) {
  checkToken(userid, token, (err, user) => {
    if (err) return callback(new Error("認証に失敗"), null);
    const friends = [];
    for (const fList in user.friends) friends.push(fList);
  });
}

module.exports = {
  chatDB,
  userDB,
  getHash,
  makeToken,
  getUser,
  plusUser,
  login,
  checkToken,
  updateUser,
  getFriendList,
};
