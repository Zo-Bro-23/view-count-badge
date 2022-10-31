const express = require('express')
const app = express()
const axios = require('axios')

app.get('/:username/:project', (req, res) => {
    axios.get(`https://api.countapi.xyz/hit/${req.params.username}/${req.params.project}`)
        .then(response1 => {
            axios.get(`https://custom-icon-badges.demolab.com/badge/${response1.data.value}-custom.svg`, { params: req.query })
                .then(response2 => {
                    res.header('Content-Type', 'image/svg+xml').send(response2.data)
                })
        })
})

module.exports = app