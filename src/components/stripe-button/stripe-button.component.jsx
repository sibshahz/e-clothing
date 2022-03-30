import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price})=>{
    const priceForStripe=price*100;
    const publishableKey='pk_test_51Kj2JVKLXyPXuO2nLB1bVLlO5gvjt7t8oZjHiOMzZXaGyfJ2Iz8MQDFTsziBqI23cPc0thHeAPp0x4tMTMgGRqfP00c4lRkAyP';

    const onToken=token=>{
        console.log(token);
        alert("Payment Successful");
    }
    return(
        <StripeCheckout 
            label="Pay Now"
            name="E-Clothing Pvt Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}

        />
    );
};

export default StripeCheckoutButton;