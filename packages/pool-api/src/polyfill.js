// Copyright 2017 Rigo Investment Sarl.
// This file is part of RigoBlock.

if (typeof Promise === 'undefined') {
  require('es6-promise').polyfill();
}

if (typeof fetch === 'undefined') {
  require('isomorphic-fetch');
}
