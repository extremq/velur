new webpack.DefinePlugin({
  "process.env": {
    FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY.substring(1, process.env.FIREBASE_KEY.length - 1)),
    AUTHDOMAIN: JSON.stringify(process.env.AUTHDOMAIN.substring(1, process.env.AUTHDOMAIN.length - 1)),
    PROJECTID: JSON.stringify(process.env.PROJECTID.substring(1, process.env.PROJECTID.length - 1)),
    STORAGEBUCKET: JSON.stringify(process.env.STORAGEBUCKET.substring(1, process.env.STORAGEBUCKET.length - 1)),
    MESSAGINGSENDERID: JSON.stringify(process.env.MESSAGINGSENDERID.substring(1, process.env.MESSAGINGSENDERID.length - 1)),
    APPID: JSON.stringify(process.env.APPID.substring(1, process.env.APPID.length - 1))
  },
});
