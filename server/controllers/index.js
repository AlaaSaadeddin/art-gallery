const error = require('./errorHandlers');
const auth = require('./auth');
const postCharge = require('./stripe');

const {
  getPaintings,
  getArtistPaints,
  addPainting,
  buyPaintings,
  deletePainting,
  getPaintingInfo,
} = require('./paintings');

const { addPaintingToCart, deletePantingCart, getCart } = require('./cart');
const {
  getAllArtist,
  activateArtist,
  updateUserInfo,
  getUserProfile,
  updateArtistAvatar,
  getArtist,
  updateArtist,
  getAdminData,
} = require('./user');
const { addReview, getArtistReview } = require('./review');

module.exports = {
  getPaintings,
  getArtistPaints,
  auth,
  error,
  getUserProfile,
  deletePainting,
  getArtist,
  getAllArtist,
  activateArtist,
  getCart,
  addPaintingToCart,
  addPainting,
  updateArtist,
  deletePantingCart,
  updateUserInfo,
  addReview,
  getArtistReview,
  updateArtistAvatar,
  buyPaintings,
  getPaintingInfo,
  postCharge,
  getAdminData,
};
