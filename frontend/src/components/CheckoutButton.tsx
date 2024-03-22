import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { useGetMyUser } from '@/api/MyUserApi';
import { Dialog, DialogTrigger } from './ui/dialog';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';

type Props = {
    onCheckout: (userFormData: UserFormData) => void;
    disabled: boolean;
};

const CheckoutButton = ({ onCheckout, disabled }: Props) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();

    const { pathname } = useLocation();

    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            },
        });
    };

    if (!isAuthenticated) {
        return (
            <Button onClick={onLogin} className="bg-orange-500 flex-1">
                Log in to check out
            </Button>
        );
    }

    if (isAuthLoading || !currentUser) {
        return <LoadingButton />;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1">
                    Go to checkout
                </Button>
            </DialogTrigger>
        </Dialog>
    );
};

export default CheckoutButton;