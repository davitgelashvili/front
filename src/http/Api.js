import axios from 'axios'
import React from 'react'

export const getApi = async ({url, method, data, params, headers}) => {
    const response = await axios({
        baseURL: 'http://localhost:5001/api',
        url,
        method,
        data,
        params,
        withCredentials: true,
        headers
    })

    return response.data
}
