import {
  USER_DATA,
  BIDS_TIME,
  BIDS_FILTER,
  PRICE_FILTER,
  PROFILE_NFTS,
  EXPLORE_COLLECTION,
  SKIP_Filter,
  SALE_FILTER,
  APPLY_FILTER,
  COLLECTION_DATA,
  NFT_DATA,
  TRENDING_FILTER,
  NFT_OWNER,
  COLLECTION_PROFILE,
  WALLET_ID,
  USER_DESC,
  USER_PROFILE,
  IS_MINTED_1155,
  CLEAR_ALL,
  ROYALTIES_PERMISSION,
  CATEGORIES,
  REVENUE_DETAIL,
  RECURRING_REVENUE,
  SWITCH_TAB,
  CONSUMER_DATA,
  CONSUMER_LIST,
} from '../context-api/actions'

export const initialState = {
  userData: '',
  newCollection: '',
  appyFilter: [],
  saleFilter: [],
  priceFilter: { min: 0, max: 0 },
  skipFilter: 0,
  exploreCollection: [],
  profileNfts: [],
  bidsFilter: 'all',
  bidsTime: '',
  nftData: null,
  trendingFilter: false,
  nftOwner: '',
  collectionProfileData: null,
  walletId: '',
  userDesc: '',
  isMinted1155: false,
  userProfile: [],
  clearAll: false,
  royaltiesPermission: false,
  categories: [],
  revenueDetail: [],
  recurringRevenue: [],
  switch: false,
  consumerData: [],
  consumerList: [],
}
export const appReducer = (state, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action.value }

    case COLLECTION_DATA:
      return { ...state, newCollection: action.value }

    case APPLY_FILTER:
      return { ...state, appyFilter: action.value }

    case PRICE_FILTER:
      return { ...state, priceFilter: action.value }

    case SALE_FILTER:
      return { ...state, saleFilter: action.value }

    case SKIP_Filter:
      return { ...state, skipFilter: action.value }

    case EXPLORE_COLLECTION:
      return { ...state, exploreCollection: action.value }

    case PROFILE_NFTS:
      return { ...state, profileNfts: action.value }

    case BIDS_FILTER:
      return { ...state, bidsFilter: action.value }
    case BIDS_TIME:
      return { ...state, bidsTime: action.value }
    case NFT_DATA:
      return { ...state, nftData: action.value }
    case TRENDING_FILTER:
      return { ...state, trendingFilter: action.value }
    case NFT_OWNER:
      return { ...state, nftOwner: action.value }
    case COLLECTION_PROFILE:
      return { ...state, collectionProfileData: action.value }
    case WALLET_ID:
      return { ...state, walletId: action.value }
    case USER_DESC:
      return { ...state, userDesc: action.value }
    case IS_MINTED_1155:
      return { ...state, isMinted1155: action.value }
    case USER_PROFILE:
      return { ...state, userProfile: action.value }
    case CLEAR_ALL:
      return { ...state, clearAll: action.value }
    case ROYALTIES_PERMISSION:
      return { ...state, royaltiesPermission: action.value }
    case CATEGORIES:
      return { ...state, categories: action.value }

    case CONSUMER_DATA:
      return { ...state, consumerData: action.value }

    case REVENUE_DETAIL:
      return { ...state, revenueDetail: action.value }
    case RECURRING_REVENUE:
      return { ...state, recurringRevenue: action.value }
    default:
      return {
        ...state,
      }
  }
}
