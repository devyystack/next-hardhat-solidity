import React, { useEffect, useState } from 'react'

// next
import NextLink from 'next/link'
import { useTheme } from '@mui/material/styles'

// routes
import Routes from 'src/routes'
// mui
import { Card, Box, Typography } from '@mui/material'
import { Image } from '../../components'
import { LikesSection, PriceSection } from '../shared'
import OnSale from '../shared/OnSale'
import { converter } from '../../utils/ethConverter'
import '/node_modules/video-react/dist/video-react.css'
import { Player } from 'video-react'
export default function AdminNft({
  src,
  likes,
  name,
  price,
  linkKey,
  nftId,
  imageType,
  value,
  isEnabled
}) {
  const theme = useTheme()

    const [ethPrice, setEthPrice] = useState('')
  const [nftLikes, setNftLikes] = useState([])
  useEffect(() => {
    if (likes?.length > 0) {
      setNftLikes(likes)
    }
  }, [likes])


  useEffect(async () => {
    if (price) {
      const value = price?.toString()
      const etherValue = converter(value, 'wei', 'eth')
      setEthPrice(etherValue)
    } else {
      setEthPrice('')
    }
  }, [price])
  return (
    <Card className="nft-card">
      <Box
        className="cursor"
        height={267}
        mb={2}
        sx={{ borderRadius: 1, overflow: 'hidden' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <NextLink href={`${Routes.nfts}/${linkKey}`} key={linkKey}>
          <a>
            {imageType === 'video' ? (
              <Player
                playsInline
                src={src}
                fluid={false}
                display="flex"
                alignItems="center"
                width={250}
                height={200}
              />
            ) : (
              <Image
                src={src}
                sx={{
                  borderRadius: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              />
            )}
          </a>
        </NextLink>
      </Box>

      {isEnabled===true ? (
        <Box
          className="disable-enable-box"
          display="flex"
          alignItems={'center'}
          sx={{ bgcolor: '#D9FFD4',}}
        >
          <Box sx={{ color: '#2CD319'}}>enable</Box>
        </Box>
      ) : (
        <Box
          className="disable-enable-box"
          display="flex"
          alignItems={'center'}
          sx={{ bgcolor: '#F1C6BB',}}
        >
          <Box
            className="disable-enable-box"
            sx={{ color: '#F3421D' }}
          >
            disable
          </Box>
        </Box>
      )}

      <Box display="flex" justifyContent={'space-between'}>
        <Box mt={1}>
          <Typography
            noWrap
            variant="h5"
            sx={{
              maxWidth: { xs: '150px', sm: '196px', md: '146px', lg: '196px' },
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box mt={1} display="flex" alignItems={'center'}>
          <OnSale
            text="On Sale"
            textStyle={ethPrice ? false : true}
            nft={true}
          />
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent={ethPrice ? 'space-between' : 'flex-end'}
      >
        {ethPrice && <PriceSection text={ethPrice} />}
        <LikesSection
          src="/assets/images/svgs/heart.svg"
          nftLikes={nftLikes.length > 0 ? nftLikes : []}
          nftId={nftId}
        />
      </Box>
    </Card>
  )
}
