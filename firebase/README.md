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

### デプロイ

#### predeploy

- firebase.json の functions.predeploy に記載

1. typescript をコンパイル
2. blockchain/build ディレクトリをコピー
