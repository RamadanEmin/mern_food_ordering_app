import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRestaurant } from '@/api/RestaurantApi';
import MenuItems from '@/components/MenuItems';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import OrderSummary from '@/components/OrderSummary';
import { MenuItem as MenuItemType } from '../types';

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number
};

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    },
                ];
            }

            return updatedCartItems;
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id);

            return updatedCartItems;
        });
    };

    if (isLoading || !restaurant) {
        return 'Loading...';
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>

            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItems
                            menuItem={menuItem}
                            addToCart={() => addToCart(menuItem)}
                        />
                    ))}
                </div>

                <div>
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;