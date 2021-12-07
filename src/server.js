require('../src/config/config')
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.json({
        stado: 'ok',
        msm: 'todo salio bien'
    })
})

app.use('/user', require('../src/router/persona'))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw new Error(err);
        console.log('connect to data base FLORES BONITAS')
    }
);

//valida si una ruta no existe
app.use((req, res, next) => {
    // res.status(404).sendFile(__dirname + '/public/404.html');
    res.status(404).json({ msm: 'Sorry ruta no  encontrada: asegirate que sea la ruta correcta, asegurate de colocar los parametros si son necesarios ' });
});


app.listen(app.get('port'), (err) => {
    if (err) throw new Error(err);
    console.log(`server up ${app.get('port')}`);
});