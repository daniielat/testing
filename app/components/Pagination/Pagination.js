const React = require('react');
const PropTypes = require('prop-types');
const Button = require('@andes/button');

const Pagination = ({ i18n, offset, setOffset }) => {
    return (
        <section>
            <Button 
                onClick={() => setOffset(offset + 10)}
                hierarchy="quiet"
            >
                {i18n.gettext('Siguiente')}
            </Button>
        </section>
    )
}

Pagination.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired,
    }).isRequired,
};

Pagination.defaultProps = {
    offset: 0
};

module.exports = Pagination;