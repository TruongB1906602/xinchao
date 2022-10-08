const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, CheckRoleAdmin } = require('./verifyToken');

const router = require('express').Router();

//CREATE

router.post('/', verifyToken, async (req, res) => {
   const newCart = new Cart(req.body);
   try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
   } catch (err) {
      res.status(500).json(err);
   }
});
//UPDATE
router.put('/:id', verifyToken, async (req, res) => {
   try {
      const updatedCart = await Cart.findByIdAndUpdate(
         req.params.id,
         {
            $set: req.body,
         },
         { new: true },
      );
      res.status(200).json(updatedCart);
   } catch (err) {
      res.status(500).json(err);
   }
});
//DELETE
router.delete('/:id', async (req, res) => {
   try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json('Cart has been deleted...');
   } catch (err) {
      res.status(500).json(err);
   }
});

//GET USER CART
router.get('/find/:_id', async (req, res) => {
   try {
      const cart = await Cart.find({ userId: req.params._id }); //_id=>data.userId
      res.status(200).json(cart);
   } catch (err) {
      res.status(500).json(err);
   }
});

///
router.get('/finds/:id', async (req, res) => {
   try {
      const cart = await Cart.find({ _id: req.params.id });
      res.status(200).json(cart);
   } catch (err) {
      res.status(500).json(err);
   }
});
// Đang phát triển
// //GET ALL
router.get('/', CheckRoleAdmin, async (req, res) => {
   try {
      const carts = await Cart.find();
      res.status(200).json(carts);
   } catch (err) {
      res.status(500).json(err);
   }
});
module.exports = router;
