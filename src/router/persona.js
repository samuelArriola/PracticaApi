const express = require('express');
const app = express();
const { login } = require('../control/control.login');
const { getPersona, postPersona, updatePersona, deletePersona } = require('../control/control.persona');
const { isIssent, noPut, veriToke, veriToke2 } = require('../middlewarea/middlewares');

app.get('/', veriToke2, getPersona);
app.post('/', postPersona);
app.put('/:id', [isIssent, noPut], updatePersona);
app.delete('/:id', deletePersona);
app.post('/login', login);
module.exports = app;