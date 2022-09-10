/**
 * Module dependencies
 */
const router = require('nordic/ragnar').router();
const getProducts = require('./get-products');

/**
 * Get Products router
 */
router.use('/get-products', getProducts);

/**
 * Expose API router
 */
module.exports = router;
