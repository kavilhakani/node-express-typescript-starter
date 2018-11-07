import {App} from './src/app/App'

const port = process.env.PORT || 3000
const app = new App().express;

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }
  return console.log(`server is listening on ${port}`)
})