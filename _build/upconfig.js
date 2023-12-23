console.log('upload config on site!');

import fs from 'fs/promises';
import axios from 'axios';
import config from "./config.js";
import snippets from "./configs/snippets.js";
import settings from "./configs/settings.js";
import gtsapirules from "./configs/gtsapirules.js"
import FormData from 'form-data';
// console.log(config)
const form = new FormData()
        
form.append('config', JSON.stringify(config))

if(config.schema){
    try{
        const file = await fs.readFile('./_build/configs/schema.xml')
        form.append('schema', file, 'schema.xml')
    }catch(e){
        console.log('Ошибка файла', './_build/configs/schema.xml', e)
    }
}

for(let k in snippets){
    try{
        const file = await fs.readFile('./_build/snippets/' + snippets[k].file)
        form.append(snippets[k].file, file, snippets[k].file)
    }catch(e){
        console.log('Ошибка файла', snippets[k].file, e)
    }
}
form.append('snippets', JSON.stringify(snippets))
form.append('settings', JSON.stringify(settings))
form.append('gtsapirules', JSON.stringify(gtsapirules))

let error = null;
try {
    const res = await axios.post('http://modx.pl/api/package',form).catch(err => {
    if (err.response.status === 404) {
        throw new Error(`${err.config.url} not found`);
    }
    throw err;
    });
    console.log(res.data)
}catch (err) {
    error = err;
}
if(error)
    console.log(error.message)
