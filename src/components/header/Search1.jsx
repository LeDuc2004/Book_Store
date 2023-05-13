import { getData } from "../../services";

const apiKey = 'abc123';
const searchTitle = 'Green Lantern: The End';
const searchCategory = 'Fantasy';

const url = `https://openlibrary.org/search.json?q=your name&limit=10&offset=10`;

getData(url).then((data)=>{
  console.log(data.docs);
})
