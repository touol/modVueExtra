console.log('upload config on site!');

import fs from 'fs/promises';
import axios from 'axios';
import FormData from 'form-data';
import 'dotenv/config'
import prompt from 'prompt';

// console.log(config)
const form = new FormData()
//console.log('process.env',process.env)        
form.append('config', JSON.stringify(config))

let error = null;
try {
    const url = `${process.env.VITE_APP_PROTOCOL}://${process.env.VITE_APP_HOST}/api/package`
    //console.log('url',url)
    const res = await axios.post(url,form).catch(err => {
    if (err.response.status === 404) {
        throw new Error(`${err.config.url} not found`);
    }
    throw err;
    });
    if(res.data.success){
        console.log(res.data.message)
    }else{
        console.log(res.data)
    }
    
}catch (err) {
    error = err;
}
if(error)
    console.log('error',error.message)
