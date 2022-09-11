const React = require('react');
const { useState, useEffect, useRef } = React;
const PropTypes = require('prop-types');
const Image = require('nordic/image');
const Pagination = require('../../components/Pagination');
const Card = require('@andes/card');
const { CardHeader, CardContent } = require('@andes/card');
const restclient = require('nordic/restclient')({
    timeout: 5000,
    baseURL: '/api'
});

const ProductList = ({ products, i18n, setProductList }) => {
    const [offset, setOffset] = useState(0);
    const isMounted = useRef(false);

    useEffect(() => {
        if(isMounted.current) {
            restclient.get('/get-products', {
                params: {
                    q: 'celular',
                    limit: 10,
                    offset: offset
                }
            })
                .then(products => setProductList(products.data))
                .catch(err => console.log(err));
        } else {
            isMounted.current = true;
        }
    }, [offset]);

    return (
        <section>
            <h2>{i18n.gettext('Listado de productos')}</h2>

            <Pagination i18n={i18n} offset={offset} setOffset={setOffset}/>
            
            {
                products?.length
                ? <ol>
                    {
                        products.map(p => (
                            <Card key={p.id}>
                                <CardHeader>
                                    <h2>{p.title}</h2>
                                </CardHeader>
                                <CardContent>
                                    <Image 
                                        src={p.thumbnail}
                                        alt={p.title}
                                        lazyload="off"
                                    />
                                </CardContent>
                            </Card> 
                        ))
                    }
                </ol>
                : <h2>{i18n.gettext('No se encontraron productos')}</h2>
            }
        </section>
        
    )
}

ProductList.propTypes = {
    i18n: PropTypes.shape({
        gettext: PropTypes.func.isRequired,
    }).isRequired,
    products: PropTypes.array
}

ProductList.defaultProps = {
    products: []
}

module.exports = ProductList;
