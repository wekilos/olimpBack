const admin = require("firebase-admin");

const serverConfig = {
  "type": "service_account",
  "project_id": "chynarmarket-cab5d",
  "private_key_id": "593cfb827b7c3940a83069cc9aff4a053af6ed22",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVHDmmT/owwsMM\n9uG+Oj0PVMrew0nnqIsGLynzE0wqthiDou8MCMO+bHyU58a6CsryZGcTeN0y4Pnk\n/T/m0RMXtze6reLWdOEZf2WGmLGvEjwCM81j5clrC3V3L4g+gCqvUC8Eo+uv9jqq\nT12R+orBJ02i9mvgqUCgqyOWXR0UGSy+LFqCZxc4VvoxvFtQgmjx9ZFPYSjyFZda\naz/p6c4ObAMgFtP+sGkruqDp6dAC3d00pIDzWFSlsiOcdPfFOZi++Uos8mWZuQVt\nQ87osNCYQFw1BwieMCiNKPl64cGtcwPCVR/gSRrIeeCWAwmHnwQHEP5WEoXj4oGL\nM7IFb2dlAgMBAAECggEABMV7AkmWynIHN/UXHNE6U2uMl0GRbV8NWHgZ3QK47oPh\nN0v174kKs5VuPKSWgyKBZL1Gvt2H5lRkg/H/n5qyw2crbOyTwEV2/MEoyW4FxxZb\nbZkx/LiaXTaGd21YWZM5DBp5fbBwiHdfh4ymBayxtUgR/uy8LELd2uW6CEB8Htpe\n9fCYvLB/jSnzf7AsFcSzJ+RtdYKi3q8JFa2ACYNvLXb2bTce5AhNiP+iUWmtd0cW\nZ17fnc+sye+JvT7bhJp2893W3M9N9rTXNJLJPwiZxC8ayZQvA06uGtX3gjlVSxTw\nGjB+hp/731fn2DZfcHIyA2KXP1Oz5k/DYWJPoootyQKBgQD5nMBrCpciEpdaNc8q\n7JH500H75YtXb4kxw781NUvVCSobhVt4akSjjxBLjQr8OeFKtYh89aXtAVHIbWMj\nVTTjk5ie6uiTuwZK8VYHX7FEIHyTPGySOjRi2PUmHC9lDF/q8h1bbPtCH+LHPpq8\nHPSSOC6TomK8MLvWCpyQK5Ni7wKBgQDakFfP1vi9nB+U/1tf+MveF+lusVmIPIu9\nR1zEgnaKBQAXflCQ4az7PJ8N4bK1YKz0d3FU8K1qRNQGmwSreVOHDXbB00gHBaNk\nDRYN70MaHR+ARiEp1KA40dlkYEtlDCgPFEWZkbBGVzYfBSNGS47qQ1KL3WSNrlMn\nhaVCvB3K6wKBgAwDQTdlkRRwtJwAzvGP5Q6S3jATQft5QK8GbqNO51FfWYlth5Np\n+detQOmB5i9xUahYyDLLV6rqT1dH/Gds6Fizd7reL0c8zva4Wp2MO2m97oDffZIj\n/vVq35Fv9c/1IoCaGlOWERmDk1RnbOb0tch7r7InNH0+Eywf4p0Fm9g9AoGBANFS\nmKcXbZa65Yxfm/WoZCfKoug+tk7CHdsjc3dIs5qv+0yEz0hSusbLYlF7LRqFAmAH\n3OTKtGsojB/fa3OGeTbI8Enlvf/rqHZ0CgFCevORnM/PWoejeeexIxD9IHggUmVO\ntvHDFB3p/I1s8EGsr60w2OfXGyyOHlmlp4bof2gNAoGARtbgJ/wDzUimHcZpq1Zq\njZ/uHUOmKNKmRqI6fsmwfo2IloPANPj93z2oJ7e6/uDNmf/y1jvAm8k1lB0/BcbV\nl347+8AxEFSN1gY9LKVEBohqi7YLEEoE8OZvv5n9/FgQWVq55YhFR0LO8rY5Inm5\nwN4Na8eeWTO1bRu6aM3528A=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-s0vbc@chynarmarket-cab5d.iam.gserviceaccount.com",
  "client_id": "103784501215200712938",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s0vbc%40chynarmarket-cab5d.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serverConfig)
  })

exports.admin = admin;
