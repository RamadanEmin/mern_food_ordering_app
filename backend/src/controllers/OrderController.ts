import Stripe from 'stripe';
import { Request, Response } from 'express';
import Restaurant, { MenuItemType } from '../models/restaurant';

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
};

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);

        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        const lineItems = createLineItems(
            checkoutSessionRequest,
            restaurant.menuItems
        );
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.raw.message });
    }
};

const createLineItems = (
    checkoutSessionRequest: CheckoutSessionRequest,
    menuItems: MenuItemType[]
) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());

        if (!menuItem) {
            throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
        }

        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "eur",
                unit_amount: menuItem.price,
                product_data: {
                    name: menuItem.name,
                }
            },
            quantity: parseInt(cartItem.quantity)
        };

        return line_item;
    });

    return lineItems;
};

export default {
    createCheckoutSession
};