# 4 ways to use Apollo with React 😃

Apollo is the best tool to use graphql with React. Apollo's documentation may seem like a waste. Here I present 4 ways to use apollo.

## Getting started

After clone this repository. you will need 2 terminals

```
cd api
npm i
npm run build
npm start
```
```
cd app
npm i
npm run build
npm start
```

**No database needed,  the todoList is stored inMemory with a simple Singleton**
Note: Of course if you reload the api the todoList isn't stored

## Let's see ways to use Apollo with React 😏

Go in ` app/src/containers `
You will find 4 containers. Using 4 differents ways to use apollo with React. It can be useful if you start an application with Apollo but you have seen many differents examples before.

My recommendation throught these examples 🙂

1. Hooks has been introduced by React recently. This code is Hook focused (❤️ useState and many other type of Hooks). If you are starting a new app in React. I highly recommend to use Hooks. And The Apollo Documentation is Hooks focused now !
2. Compose. Even if compose has been removed from react-apollo, is it still possible to use compose. It is a best way to separate the logic and your views by using  HigherComponents
3. WithApollo. I don't recommend if you now use compose well. Just to show how get the client from the context and how to use it.
4. Components way. I've never understood why Apollo recommended this way before hooks appear... It is definitively the most horrible way to provide your logic into your components.... You can easily have problem of ` Components Hell `by wrapping so much time for each resources you need...



Please feel free to open issues for any discussions, Pull Request ect... If you want add other ways to use Apollo, just open a PR.
