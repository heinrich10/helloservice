# helloservice

# How to run

1. execute `npm install` to install dependencies
2. execute `node index` to run the server, it will listen on port 6020

# How to run in docker

1. build the project using `docker build -t helloservice:latest .`
2. once build is successful, execute `docker run -it -p 6020:6020 -d helloservice:latest`

# Running the test

- to run integration, test execute `npm test:integration`
- to run unit test, execute `npm test:unit`
- to run both, execute `npm test`

# API

**GET /hello**

Header:
Authorization: Bearer <token>

response body
```
{
    "hello": "user1"
}
```

# Notes

- To make it simple, I did not add configuration files. If I need to add it, I would probably use `dotenv`.
- I used rsa256 auth type for jwt, where there is a private key to sign the issued token and a public key to verify its signature.
- I know it is not a good practice to upload the key files to the repo but this is the easiest way as of the moment.
- There are a lot of ways to manage this key file, a way I used before is aws ssm, another way could be using hashi corp vault.
- Separating unit and integration my seem trivial in this repo, but in production it makes more sense because there will be more files (even on microservices, it won't be this small).
