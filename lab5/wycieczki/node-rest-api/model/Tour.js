const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  key: string,
  id: number,
  name: string,
  destination: string,
  dateBegin: string,
  dateEnd: string,
  imageURL: string,
  places: number,
  money: number,
  description: string,
  display: boolean,
  rate: number
*/

let Tour = new Schema({
    key: {
        type: String
    },
    id: {
        type: Number
    },
    name: {
        type: String
    },
    destination: {
        type: String
    },
    dateBegin: {
        type: String
    },
    dateEnd: {
        type: String
    },
    imageURL: {
        type: String
    },
    places: {
        type: Number
    },
    money: {
        type: Number
    },
    description: {
        type: String
    },
    display: {
        type: Boolean
    },
    rate: {
        type: Number
    },
})

module.exports = mongoose.model('Tour', Tour);