import * as React from 'react'
import moment from 'moment'
import Routes from 'src/routes'
import { Image } from '../../components'
import NextLink from 'next/link'

import PriceSection from '../../components/shared/PriceSection'
import { converter } from '../../utils/adminEthConvertor'
import ReadMore from '../../utils/ReadMore'
import { NewCreatedNft } from '../../apis'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Link,
  Grid,
  Card,
  title,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { AvatarDetailed } from '../shared'
import {
  CardHeadingGradient,
  TrandingNft,
  CardHeading,
} from '../../components/shared'
import { getUserCookie } from '../../utils/getCookies'

export default function NewNfts() {
  const [newNfts, setNewNfts] = React.useState([])
  const theme = useTheme()
  const token = getUserCookie()

  const nftdata = async () => {
    const result = await NewCreatedNft()
    if (result?.data?.data) {
      setNewNfts(result?.data?.data)
    }
    return result
  }

  React.useEffect(async () => {
    const data = await nftdata()
  }, [token])


  return (
    <Box>
      <Box
        mb={4}
        sx={{
          width: 'auto',
          height: 'auto',
          display: 'flex',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardHeading text="New NFTs" />

        <NextLink href={Routes.nfts}>
          <a style={{ color: theme.palette.brandpurple.primary }}>
            <Typography variant="h5">View All</Typography>
          </a>
        </NextLink>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '100%',
            height: 'auto',
          },
        }}
      >
        {newNfts?.length > 0 ? (
          newNfts?.map((value, index) => {
            let owners = value?.nft_owners?.[0]
            let date = value?.createdAt
            return (
              <Box key={index} sx={{ marginBottom: '21px' }}>
                <Card
                  className="new-nfts-card"
                  sx={{
                    borderColor: 'grey.400',
                    width: '100%',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                  }}
                >
                  <Grid container>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Grid item xs={12} sm={6}>
                        <Box display={'flex'} alignItems="center">
                          <Avatar
                            variant="rounded"
                            src={
                              process.env.NEXT_PUBLIC_PINATA_BASE_URL +
                              value?.profile_image
                            }
                            alt="avatar"
                            sx={{
                              width: '75px',
                              height: '75px',
                              borderRadius: 1,
                            }}
                          />

                          <Box>
                            <Box display="flex">
                              <Typography
                                noWrap
                                variant="h6"
                                width="170px"
                                ml="10px"
                                sx={{ opacity: '1' }}
                              >
                                {value?.nft_name}
                              </Typography>
                            </Box>

                            <Box display="flex" maxWidth="142px">
                              <Typography
                                noWrap
                                variant="subtitle4"
                                ml="10px"
                                sx={{ opacity: '0.7' }}
                              >
                                {moment(date).local().format(`DD MMM YY, `)}
                                {moment(date).local().format(`HH:mm a`)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box
                          height="100%"
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            height: 'auto',
                            width: 'auto',
                          }}
                        >
                          <Image
                            alt="trening"
                            src="/assets/images/svgs/ether.svg"
                            sx={{
                              width: '13px',
                              height: '21px',
                              marginRight: '2px',
                            }}
                          />

                          <PriceSection
                            text={
                              owners?.nft_price !== null
                                ? converter(owners?.nft_price, 'wei', 'eth')
                                : 0
                            }
                          />
                        </Box>
                      </Grid>
                    </Box>
                  </Grid>
                </Card>
              </Box>
            )
          })
        ) : (
          <Box display="flex" justifyContent="center" width="100%">
            <Image
              alt="cover"
              src="/assets/images/svgs/noData.svg"
              sx={{
                mt: 4,
                width: '270px',
                height: 'auto',
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
