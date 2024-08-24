import { UserAvatarProps } from '@/typescript/layoutTypes';
import { getColorForCharacter } from '@/utils/characterColor';
import { Avatar } from '@mui/material';
import { FC } from 'react';


const UserAvatar: FC<UserAvatarProps> = ({ username }) => {
    const avatarProps = {
        sx: { bgcolor: getColorForCharacter(username.charAt(0)) },
        children: username.charAt(0).toUpperCase(),
    };

    return <Avatar {...avatarProps} />;
};

export default UserAvatar;

