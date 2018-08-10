var mysql = require('mysql');

var util = require('util')
/*
#when insert
connection.query('INSERT INTO posts SET ?', {title: 'test'}, function (error, results, fields) {
  if (error) throw error;
  console.log(results.insertId);
});

#when delete
connection.query('DELETE FROM posts WHERE title = "wrong"', function (error, results, fields) {
  if (error) throw error;
  console.log('deleted ' + results.affectedRows + ' rows');
})

#when update
connection.query('UPDATE posts SET ...', function (error, results, fields) {
  if (error) throw error;
  console.log('changed ' + results.changedRows + ' rows');
})

*/
var pool = null;
var defaultOptions = {}
var importantOptions = {}

function MySqlUtils(options) {    
    //all member fields are stored in that.
    var that={
        options:options
    };

    /*all private functions are declared inside constructor*/
    function privateCreatePoolIfNotExists() {
        var createPoolOptions = Object.assign({}, defaultOptions, that.options, importantOptions);
        if (pool == null) {
            pool = mysql.createPool(createPoolOptions);
        }
    }

    function privateSetupQueryFormat(connection) {
        connection.config.queryFormat = function(query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function(txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
    }

    async function privateGetConnection() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, val) {
                if (err) {
                    reject(err);
                } else {
                    resolve(val);
                }
            });
        });
    }

    /* all public functions are declared as member of this object.*/
    this.query = async function(sql, args) {
        privateCreatePoolIfNotExists();
        var connection = await privateGetConnection();
        return new Promise(function(resolve, reject) {
            privateSetupQueryFormat(connection);
            connection.query(sql, args, function(err, results, fields) {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        results: results,
                        fields: fields
                    });
                }
            })
        });
    };

    this.release = function() {
        if (pool != null) {
            pool.end();
            pool = null;
        }
    }
}

//exports
module.exports = MySqlUtils;