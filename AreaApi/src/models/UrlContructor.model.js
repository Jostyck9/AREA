/**
 * Create the redirect url with the status and the token if present or it will be the message
 * 
 * @param {string} url base url
 * @param {string} status status of the response
 * @param {string} token of the user to identify
 * @param {string} message of the request if present 
 */
exports.createRedirect = function(url, status, token, message) {
    let urlEnd = url + '?status=' + status
    if (token)
        urlEnd = urlEnd + '&token=' + token
    if (message)
        urlEnd = urlEnd + '&message=' + message
    return urlEnd
}