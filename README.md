# 邀請給身份機器人

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
