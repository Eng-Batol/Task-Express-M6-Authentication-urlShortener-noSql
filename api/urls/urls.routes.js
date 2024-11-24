const express = require('express');

const router = express.Router();
const passport = require('passport');

const { shorten, redirect, deleteUrl } = require('./urls.controllers');

router.post('/shorten', passport.authenticate('jwt', { session: false }), shorten);
router.delete('/:code', passport.authenticate('jwt', { session: false }),deleteUrl);
router.get('/:code', redirect);

module.exports = router;
