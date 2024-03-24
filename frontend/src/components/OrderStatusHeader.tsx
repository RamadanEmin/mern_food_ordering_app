import { Order } from '@/types';
import { ORDER_STATUS } from '@/config/order-status-config';

type Props = {
    order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
        );
    };

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span> Order Status: {getOrderStatusInfo().label}</span>
            </h1>
        </>
    );
};

export default OrderStatusHeader;