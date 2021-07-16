# firebase

## firebase functions

### 環境変数

<https://firebase.google.com/docs/functions/config-env?hl=ja>

取得

```
firebase functions:config:get
```

セット

```
firebase functions:config:set 〇〇=〇〇
```

ローカルでも使えるように
https://qiita.com/kenny_J_7/items/f75cc26f6265a019673d

### デプロイ

#### predeploy

- firebase.json の functions.predeploy に記載

1. typescript をコンパイル
2. blockchain/build ディレクトリをコピー
