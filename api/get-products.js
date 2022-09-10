const router = require('nordic/ragnar').router();
const productsService = require('../services/productsService');

router.get('/', (req, res) => {
    const { q, limit, offset } = req.query;
    productsService.getProducts(req.platform.siteId, q, limit, offset)
        .then(response => res.json(response))
        .catch(() => ([]));
});

module.exports = router;
