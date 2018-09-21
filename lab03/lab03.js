const express = require('express')
const app = express()
const port = 3000

app.use('/public', express.static('public'))
app.use('/', express.static('/'))

app.get('/', (req, res) => res.sendFile('/home/ben/cs/cs336/lab03/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
