const express = require("express")

const logMiddelwares = (req, res, next) =>{
    console.log(`ricevuta chiamata ${req.method} all'endpoint ${req.originalUrl}`)
    next();
}

module.exports = logMiddelwares