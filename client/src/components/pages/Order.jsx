import React from 'react';
import { 
    OrderForm
} from '../Forms';

const Order = () => {
    return (
        <div className="block" id="order">
            <h1 className="text-left block-header">Place order</h1>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 desc">
                    <div className="row">
                        <div className="col-10 offset-1 segment">
                            <OrderForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Order;