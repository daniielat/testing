const React = require('react');
const I18nProvider = require('nordic/i18n/I18nProvider');
const productsService = require('../../../services/productsService')
const View = require('./view');

exports.fetchProducts = function fetchProducts(req, res, next) {
  const { q, limit } = req.query;
  productsService.getProducts(req.platform.siteId, q, limit)
    .then(data => {
      res.locals.products = data;
      next();
    })
    .catch(err => res.redirect('/error'));
    // .catch(err => next(err));
};

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
