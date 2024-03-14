import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';

const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoaging } = useGetMyUser();
    const { updateUser, isLoading: isUpdateLoaging } = useUpdateMyUser();

    if (isGetLoaging) {
        return <span>Loading...</span>;
    }

    if (!currentUser) {
        return <span>Unable to load user profile</span>;
    }

    return (
        <UserProfileForm
            currentUser={currentUser}
            onSave={updateUser}
            isLoading={isUpdateLoaging}
        />
    );
};

export default UserProfilePage;