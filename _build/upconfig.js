console.log('upload config on site!');

import fs from 'fs/promises';
import axios from 'axios';
import config from "./config.js";
import snippets from "./configs/snippets.js";
import settings from "./configs/settings.js";
import FormData from 'form-data';
console.log(config)
const form = new FormData()
    
    form.append('config', JSON.stringify(config))
if(await fs.access('./_build/configs/schema.xml')){
    try{
        const schema = await fs.readFile('./_build/configs/schema.xml')
    }catch(e){
        // console.log(e)
    }
}


let error;
try {
    const res = await axios.post('http://modx.pl/api/package',form).catch(err => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`);
    }
    throw err;
  });
  console.log(res.data.args)
}catch (err) {
  error = err;
}
console.log(error.message)
