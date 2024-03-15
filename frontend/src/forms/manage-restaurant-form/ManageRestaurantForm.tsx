import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    restaurantName: z.string({
        required_error: 'restaurant name is required',
    }),
    city: z.string({
        required_error: 'city is required',
    }),
    country: z.string({
        required_error: 'country is required',
    }),
    deliveryPrice: z.coerce.number({
        required_error: 'delivery price is required',
        invalid_type_error: 'must be a valid number',
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: 'estimated delivery time is required',
        invalid_type_error: 'must be a valid number',
    }),
    cuisines: z.array(z.string()).nonempty({
        message: 'please select at least one item',
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, 'name is required'),
            price: z.coerce.number().min(1, 'price is required'),
        })
    ),
    imageFile: z.instanceof(File, { message: 'image is required' }).optional(),
});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantFormDat: FormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: '', price: 0 }]
        }
    });

    return (
        <Form {...form}>
            <form className="space-y-8 bg-gray-50 p-10 rounded-lg">

            </form>
        </Form>
    );
};

export default ManageRestaurantForm;