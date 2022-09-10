const React = require('react');
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const DemoComponent = require('../../components/DemoComponent');

function View(props) {
  const { i18n, translations } = props;
  const preloadedState = {
    i18n,
    translations,
  };
  return (
    <div className="demo">
      <Head>
        <title>
          {i18n.gettext('Products Page')}
        </title>
      </Head>

      <Style href="products.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
          console.log('Products page is loaded!');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="products.js" />

      <DemoComponent i18n={i18n} />

    </div>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
};

View.defaultProps = {
  translations: {},
};

module.exports = injectI18n(View);
