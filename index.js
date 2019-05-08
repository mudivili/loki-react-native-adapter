import { FileSystem } from 'expo';

function LokiReactNativeAdapter() {

}

LokiReactNativeAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
  var self = this;

  var dbpath = FileSystem.documentDirectory + '/' + dbname;

  FileSystem.getInfoAsync(dbpath)

  self.fs.stat(dbpath).then(stats => {
    if (stats.isDirectory === false) {
      return FileSystem.readAsStringAsync(dbpath, {
        encoding: FileSystem.EncodingTypes.UTF8
      }).then(data => {
        callback(data)
      }).catch(err => {
        callback(new Error(err));
      })
    }
    callback(dbpath + ' is not file');
  }).catch(err => {
    callback(err)
  })
};

/**
 * saveDatabase() - save data to file, will throw an error if the file can't be saved
 * might want to expand this to avoid dataloss on partial save
 * @param {string} dbname - the filename of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof LokiFsAdapter
 */


LokiReactNativeAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {

  var dbpath = FileSystem.DocumentDirectoryPath + '/' + dbname;
  FileSystem.writeAsStringAsync(dbpath, dbstring).then(() => {
    callback();
  }, callback)
    .catch(err => {
      callback(err);
    });
};

/**
 * deleteDatabase() - delete the database file, will throw an error if the
 * file can't be deleted
 * @param {string} dbname - the filename of the database to delete
 * @param {function} callback - the callback to handle the result
 * @memberof LokiFsAdapter
 */

LokiReactNativeAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
  var dbpath = FileSystem.DocumentDirectoryPath + '/' + dbname;
  FileSystem.deleteAsync(dbpath).then(() => {
    callback();
  }).catch(err => {
    callback(err);
  })
};

module.exports = LokiReactNativeAdapter