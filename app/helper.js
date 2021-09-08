

const _ = require('lodash');
const axios = require("axios");
const cheerio = require("cheerio");



///////////////////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

/**
 **_ Compose function arguments starting from right to left
 _** to an overall function and returns the overall function
 */
const compose = (...fns) => arg => {
  return **_.flattenDeep(fns).reduceRight((current, fn) => {
    if (_**.isFunction(fn)) return fn(current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg);
};

/**
 _ Compose async function arguments starting from right to left
 _ to an overall async function and returns the overall async function
 _/
const composeAsync = (...fns) => arg => {
  return .flattenDeep(fns).reduceRight(async (current, fn) => {
    if (.isFunction(fn)) return fn(await current);
    throw new TypeError("compose() expects only functions as parameters.");
  }, arg);
};

/**
 _ Enforces the scheme of the URL is https
 _ and returns the new URL
 _/
const enforceHttpsUrl = url =>
  _.isString(url) ? url.replace(/^(https?:)?\/\//, "https://") : null;

/*
  Strips number of all non-numeric characters
  and returns the sanitized number
 /
const sanitizeNumber = number =>
  _.isString(number)
    ? number.replace(/[^0-9-.]/g, "")
    : _.isNumber(number) ? number : null;

/*
  Filters null values from array
  and returns an array without nulls
 /
const withoutNulls = arr =>
  _.isArray(arr) ? arr.filter(val => !_.isNull(val)) : _[_];

/_**
 ** Transforms an array of ({ key: value }) pairs to an object
 ** and returns the transformed object
 */
const arrayPairsToObject = arr =>
  arr.reduce((obj, pair) => ({ ...obj, ...pair }), {});

/**_
 _ A composed function that removes null values from array of ({ key: value }) pairs
 _ and returns the transformed object of the array
 */
const fromPairsToObject = compose(arrayPairsToObject, withoutNulls);