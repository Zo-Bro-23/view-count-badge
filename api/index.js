const express = require('express')
const app = express()
const axios = require('axios')

const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb')
const url = process.env.MONGO_URL
const dbName = 'personal'

let client
let db

app.get('/:username/:project', async (req, res) => {
    // axios.get(`https://api.countapi.xyz/hit/${username}/${project}`)
    //     .then(response1 => {
    //         axios.get(`https://custom-icon-badges.demolab.com/badge/${response1.data.value}-custom.svg`, { params: req.query })
    //             .then(response2 => {
    //                 res.header('Content-Type', 'image/svg+xml').send(response2.data)
    //             })
    //     })
    //     .catch(error => {
    // axios.get(`https://custom-icon-badges.demolab.com/badge/TEMPORARILY%20DOWN-custom.svg`, { params: req.query })
    //     .then(response2 => {
    //         res.header('Content-Type', 'image/svg+xml').send(response2.data)
    //     })
    // })

    if (!client) {
        client = new MongoClient(url)
        await client.connect()
    }

    if (!db) {
        db = client.db(dbName)
    }

    const username = req.params.username
    const project = req.params.project

    const collection = db.collection('view-count')
    await collection.updateOne({ _id: `${username}` }, { $inc: { [project]: 1 } }, { upsert: true })
    const count = await collection.findOne({ _id: `${username}` })
    const badge = await axios.get(`https://custom-icon-badges.demolab.com/badge/${count[project]}-custom.svg`, { params: req.query })

    res.header('Content-Type', 'image/svg+xml').send(badge.data)
})

module.exports = app