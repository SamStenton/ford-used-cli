const axios = require('axios')


const api = (method, uri, body = null) => {
    return axios({
        method: method,
        timeout: 5000,
        url: `https://www.servicescache.ford.com/${uri}`,
        data: body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(({ data }) => [null, data.data])
    .catch((res) => {
        return [res.message, null]
    })
}

module.exports = api
