;(function(context) {

  'use strict';

  var store = localStorage;

  function Stores( key ) {
    this.key = key;
    if( !store[key] ) {
      store[key] = JSON.stringify([]);
    }
  }

  Stores.fn = Stores.prototype;

  Stores.fn.find = function( id, cb ) {

    var items = JSON.parse(store[this.key]);
    var item = items
      .filter(function(item) {
        return id === item.id;
      });
    cb.call(this, item[0] || {} );
  };

  Stores.fn.findAll = function( cb ) {
    cb.call(this, JSON.parse( store[this.key] ));
  };

  Stores.fn.save = function( item, cb, options ) {

    var items = JSON.parse(store[this.key]);

    // Implementar Update Multiple
    // if ( options && options.multi ) {
    // }

    // Update
    if (item.id) {
      items = items
        .map(function( x ) {
          if( x.id === item.id ) {
            for (var prop in item ) {
              x[prop] = item[prop];
            }
          }
          return x;
        });
    // Insert
    } else {
      item.id = new Date().getTime();
      items.push(item);
    }

    store[this.key] = JSON.stringify(items);

    cb.call(this, item);
    // this.findAll(cb);

  };

  Stores.fn.destroy = function( id, cb ) {

    var items = JSON.parse(store[this.key]);
    items = items
        .filter(function( x ) {
          return x.id !== id;
        });

    store[this.key] = JSON.stringify(items);

    cb.call(this, true);

  };


  Stores.fn.drop = function( cb ) {
    store[this.key] = JSON.stringify([]);
    this.findAll(cb);
  };

  context.Stores = Stores;

})( this );