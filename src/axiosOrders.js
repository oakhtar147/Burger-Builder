import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://react-burger-builder-9e7aa-default-rtdb.firebaseio.com/'
});


export default instance;