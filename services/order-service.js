var orderx = require('orderin-api');
var config = require('../config');
var Orders = require('../models/order').Orders;

var api = new orderx.APIS(config.orderxKey, orderx.TEST);

export.getResturant = function (next) {
    var hotel = config.address;
    var args = {
        datetime: 'ASAP',
        addr: hotel.addr,
        city: hotel.city,
        zip: hotel.zip
    };
    api.deliver_list(args, function (err, resturants) {
        if (err) {
            console.log(err);
            return next(err);
        }
        resturants = resturants.filter(function (rest) {
            return rest.is_delivering;
        })

        next(null, resturants);
    });
}

export.getRestaurantDetails = function (restId, next) {
    api.resturant_details({
        rid: restId
    }, function (err, details) {
        if (err) {
            console.log(err);
        }
        next(err, details);
    })
}

exports.createOrder = function (user, food, next) {
    var order = new Order {
        user: user,
        food: food
    }

    order.save(function (err, saveOrder) {
        if (!err) {
            return next(null, saveOrder._id);
        }
        next(err);
    });
}