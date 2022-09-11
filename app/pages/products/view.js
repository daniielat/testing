const React = require('react');
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const ProductList = require('../../components/ProductList');

function View(props) {
  const { i18n, translations, products } = props;
  const preloadedState = {
    i18n,
    translations,
    products
  };

  const [productList, setProductList] = React.useState(products);

  return (
    <div className="products">
      <Head>
        <title>
          {i18n.gettext('Products Page')}
        </title>
      </Head>

      <Style href="products.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
          console.log('%cProducts page is loaded!', 'color: green');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="products.js" />

      {
        products?.length
        ? <ProductList products={productList} i18n={i18n} setProductList={setProductList}/>
        : null
        // : <h2>{i18n.gettext('No se encontraron productos.')}</h2>
      }

    </div>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
  products: PropTypes.array
};

View.defaultProps = {
  translations: {},
};

module.exports = injectI18n(View);
