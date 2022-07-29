# 邀請給身份機器人

### 功能

- 查詢的 invite 用戶對象擁有特定身分（權限限定）
- 撈出 Discord 伺服器中的 invites 並寫入 SOL (權限限定)
- 使用指令查詢指定用戶的 invite 數量（權限限定）
- 使用指令查詢自己的 invite 數量（只能查詢自己）
- 自動給予身份組（ex: 3 個 invite 就給某種身份之類的）(目前手動打指令添加)

### 指令說明

#### addinvitestoserver

- 新增 invites 資料至資料庫
- 特殊身份者權限限定使用
- 結果只有特殊身份者自己可見
- 儲存資料：
  - **userId** 使用者的 ID 編號 (ex: 92137581XXX9X43XX4)
  - **username** 使用者的名稱
  - **invites** 邀請的人數（Server Settings 裡的使用者 invites 人數）
  - **createdAt** 資料寫入資料庫的時間
  - **updatedAt** 資料寫入資料庫更新的時間

#### addroletomemberwithinvites

- 判斷指定使用者身份組，邀請數達 3 個就給予新身份
- 特殊身份者權限限定使用
- 結果只有特殊身份者自己可見
- target 輸入使用者

#### invites

- 查詢自己的邀請數
- 所有使用者皆可使用
- 結果只有自己可見

#### searchinvites

- 查詢指定使用者的邀請人數
- 特殊身份者權限限定使用
- 結果只有特殊身份者自己可見
- target 輸入使用者

#### searchroleinvites

- 查詢指定使用者的邀請人數與判斷特殊身份
- 特殊身份者權限限定使用
- 結果只有特殊身份者自己可見
- target 輸入使用者

## 設定檔

**config.json**

```json
{
  "token": "your-bot-token",
  "clientId": "client-id",
  "guildId": "guild-id",
  "clientSecret": "client-secret"
}
```

**database.js**

```js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('data-table', 'admin', 'password', {
  host: 'host',
  dialect: 'mysql',
  port: '5000',
  logging: false,
});

const InvitesInfo = sequelize.define('invites_info', {
  userId: {
    type: Sequelize.STRING,
    unique: true,
  },
  username: Sequelize.STRING,
  invites: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = { InvitesInfo };
```

### 安裝與啟動

確定本地 node 版本 >=16.9.0

```
yarn
yarn deploy
yarn start
```
