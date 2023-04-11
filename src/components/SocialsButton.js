import PropTypes from 'prop-types';

import { Image } from '../components';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, IconButton, Button, Link, Icon } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

SocialsButton.propTypes = {
  initialColor: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.string),
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function SocialsButton({
  initialColor = false,
  simple = true,
  links = {},
  sx,
  ...other
}) {
  const SOCIALS = [
    {
      name: 'Instagram',
      icon: '/assets/images/svgs/insta.svg',
      path: links.instagram || '#instagram-link',
    },
    {
      name: 'Twitter',
      icon: '/assets/images/svgs/twitter.svg',
      path: links.twitter || '#twitter-link',
    },
    {
      name: 'Telegram',
      icon: '/assets/images/svgs/telegram.svg',
      path: links.telegram || '#telegram-link',
    },
    {
      name: 'Discord',
      icon: '/assets/images/svgs/discord.svg',
      path: links.discord || '#discord-link',
    },
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social) => {
        const { name, icon, path, socialColor } = social;
        return simple ? (
          <Link key={name} href={path}>
            <IconButton
              color="inherit"
              sx={{
                ...(initialColor && {
                  color: socialColor,
                  '&:hover': {
                    bgcolor: alpha(socialColor, 0.08),
                  },
                }),
                ...sx,
              }}
              {...other}
            >
              <Image
                src={icon}
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
              {/* {iconType === 'mui' ? (
                <Icon>{icon}</Icon>
              ) : (
                // <span sx={{ width: 20, height: 20 }}>{icon}</span>
                <Iconify icon={icon} sx={{ width: 20, height: 20 }} />
              )} */}
            </IconButton>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
