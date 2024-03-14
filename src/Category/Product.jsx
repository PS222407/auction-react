import React from 'react';
import {Link} from "react-router-dom";

function Product({product}) {
    return (
        <Link to={`/products/${product.id}`} className={'hover:underline'}>
            <div className={"flex flex-col items-center"}>
                <div className={"w-min p-3"}>
                    <div>
                        <img className={"max-w-32 w-32 sm:max-w-40 sm:w-40"} src={product.variants[0].thumbnail}
                             alt={product.name}/>
                    </div>
                    <div className={"flex flex-col items-center"}>
                        <div>{product.name}</div>
                        <div>{product.stock}</div>
                        <div>{new Intl.NumberFormat('nl-NL', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(product.price / 100)}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Product;