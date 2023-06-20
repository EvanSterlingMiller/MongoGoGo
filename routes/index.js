const router = require('express').Router()
const apiRoutes = ('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
    res.status(404).send(
        '<h2> 404 ERROR </h2> '
        )
})