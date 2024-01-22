import MuiAvatar from '@mui/material/Avatar';

const CustomAvatar = ((props) => {

  const { sx, children } = props;

  const avatarStyles = [
    { background: '#fae3e5', color: '#ff4b51' },
    { background: '#f2ebff', color: '#9155fd' },
    { background: '#f9eee0', color: '#ffb400' },
    { background: '#e4f1df', color: '#56c900' },
    { background: '#e0eef9', color: '#15B0FE' },
  ];

  const getRandomAvatarStyle = () => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
  };

  const { background, color } = getRandomAvatarStyle();

  return (
    <MuiAvatar sx={sx} style={{ backgroundColor: background, color: color }}>
    {children}
  </MuiAvatar>
  );
});

export default CustomAvatar
