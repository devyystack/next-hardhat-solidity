import React from 'react';
import { AvatarGroup, Avatar } from '@mui/material';

export default function CustomAvatarGroup() {
  const data = [
    { src: '/assets/images/svgs/stagelogo.svg', alt: 'avatar' },
    { src: '/assets/images/svgs/stagelogo.svg', alt: 'avatar' },
    // { src: '/assets/images/svgs/stagelogo.svg', alt: 'avatar' },
  ];
  return (
    <AvatarGroup max={data.length} spacing="small">
      {data.map((item, index) => (
        <Avatar alt={item.alt} src={item.src} key={index} />
      ))}
    </AvatarGroup>
  );
}