require('dotenv').config();
const {API_KEY} = process.env;

//const axios = require('axios');
const URL = 'https://api.spoonacular.com/recipes/';
const fullData = async () => {
    try{
        const getApi = await axios.get(`${URL}complexSearch?apiKey=${API_KEY}`);
        const fullData = getApi.data.results.map((d) => {
            return { 
                id: d.id,
                title: d.title,
                image: d.image,
                imageType: d.imageType
            }
        });
        console.log(fullData);
        return fullData;     
    }catch(e){
        console.log(e);
    }    
}



module.export = fullData;