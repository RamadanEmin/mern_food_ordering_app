import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';

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

        const lineItems = createLineItems();

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.raw.message });
    }
};

export default {
    createCheckoutSession
};