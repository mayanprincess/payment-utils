const requestIp = require('request-ip')

const expressCallback = controller => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: requestIp.getClientIp(req),
      method: req.method,
      path: req.path,
      res,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }
    return controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse) {
          res.set({ 'Content-Type': 'application/json' })
          return res.status(httpResponse.statusCode).send(httpResponse.data)
        }
      })
      .catch(e => res.status(500).send({ error: e.message }))
  }
}

module.exports = expressCallback
