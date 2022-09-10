const router = require('nordic/ragnar').router();
const { fetchProducts, render } = require('./controller');

router.get('/', fetchProducts, render);

module.exports = router;
