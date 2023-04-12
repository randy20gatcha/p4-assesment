// Connector to the back-end
import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: `http://localhost/8081/` // Back-end URL
    })
}