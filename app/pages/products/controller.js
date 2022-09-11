const React = require('react');
const View = require('./view');
const I18nProvider = require('nordic/i18n/I18nProvider');
const productsService = require('../../../services/productsService')

// normal middleware
exports.fetchProducts = function fetchProducts(req, res, next) {
  const { q, limit, offset } = req.query;
  productsService.getProducts(req.platform.siteId, q, limit, offset)
      .then(data => {
        res.locals.products = data;
        next();
      })
      .catch(err => next(err));
      // .catch(err => res.redirect('/error'));
}

// async middleware
// exports.fetchProductsX = async function fetchProducts(req, res, next) {
//   const { q, limit, offset } = req.query;
//   try {
//     const products = await productsService.getProducts(req.platform.siteId, q, limit, offset)
//     res.locals.products = products;
//     next();
//   } catch(err) {
//     next(err);
//     // return res.redirect('/error');
//   }
// };

/* istanbul ignore next */
exports.render = function render(req, res) {

  const Products = props => (
    <I18nProvider i18n={req.i18n}>
      <View {...props} />
    </I18nProvider>
  );

  res.render(Products, {
    translations: req.translations,
    products: res.locals.products
  }, {
    layoutOptions: {
      staticMarkup: false,
    },
    navigationOptions: {
      type: 'full',
    },
  });
};
