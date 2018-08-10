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

function MysqlUtils(config) {

    if (pool == null) {
        pool = mysql.createPool(config.mysql);
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

    var privateGetConnection = util.promisify(pool.getConnection);

    this.query =  async function(sql, args) {
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

    
}

//exports
module.exports = MysqlUtils;