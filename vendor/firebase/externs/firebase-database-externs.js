/**
 * @fileoverview Firebase Database API.
 * Version: 3.0.3
 *
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @externs
 */

/**
 * Access the Database service for the default App (or a given app).
 *
 * Usage (either):
 *
 *   firebase.database()
 *   firebase.database(app)
 *
 * @namespace
 * @param {!firebase.app.App=} app
 * @return {!firebase.database.Database}
 */
firebase.database = function(app) {};

/**
 * Access the Database service from an App instance.
 *
 * Usage:
 *
 *   app.database()
 *
 * @return {!firebase.database.Database}
 */
firebase.app.App.prototype.database = function() {};


/**
 * The Firebase Database service interface.
 *
 * Do not call this constructor directly - use firebase.database() instead.
 * @interface
 */
firebase.database.Database = function() {};

/**
 * Log debugging information to the console.
 *
 * @param {(boolean|*)=} logger
 * @param {boolean=} persistent Remembers the logging state between page
 *     refreshes if true.
 */
firebase.database.enableLogging = function(logger, persistent) {};

/**
 * A placeholder value for auto-populating the current timestamp (time
 * since the Unix epoch, in milliseconds) as determined by the Firebase
 * servers.
 *
 * @const {{
 *   TIMESTAMP: !Object
 * }}
 */
firebase.database.ServerValue;

/**
 * @const {string}
 */
firebase.database.SDK_VERSION;


/**
 * The App associated with the Database service instance.
 *
 * @type {!firebase.app.App}
 */
firebase.database.Database.prototype.app;

/**
 * Returns a reference to the root or the specified path.
 *
 * @param {string=} path
 * @return {!firebase.database.Reference} Firebase reference.
 */
firebase.database.Database.prototype.ref = function(path) {};

/**
 * Returns a reference to the root or the path specified in url. An exception is
 * thrown if the url is not in the same domain as the current database.
 *
 * @param {string} url
 * @return {!firebase.database.Reference} Firebase reference.
 */
firebase.database.Database.prototype.refFromURL = function(url) {};

/**
 * Disconnect from the server (all database operations will be completed
 * offline).
 *
 * The client automatically maintains a persistent connection to the database
 * server, which will remain active indefinitely and reconnect when
 * disconnected. However, the `goOffline()` and `goOnline()` methods may be used
 * to control the client connection in cases where a persistent connection is
 * undesirable.
 *
 * While offline, the client will no longer receive data updates from the
 * database. However, all database operations performed locally will continue to
 * immediately fire events, allowing your application to continue behaving
 * normally. Additionally, each operation performed locally will automatically
 * be queued and retried upon reconnection to the database server.
 *
 * To reconnect to the database and begin receiving remote events, see
 * `goOnline()`.
 *
 * @example
 * firebase.database().goOffline();
 */
firebase.database.Database.prototype.goOffline = function() {};

/**
 * (Re)connect to the server and synchronize the offline database state
 * with the server state.
 *
 * This method should be used after disabling the active connection with
 * `goOffline()`. Once reconnected, the client will transmit the proper data and
 * fire the appropriate events so that your client "catches up" automatically.
 *
 * @example
 * firebase.database().goOnline();
 */
firebase.database.Database.prototype.goOnline = function() {};

/**
 * A reference to a database location.
 *
 * @interface
 * @extends {firebase.database.Query}
 */
firebase.database.Reference = function() {};

/**
 * The last part of the current path.
 *
 * For example, "fred" is the key for
 * https://sample-app.firebaseio.com/users/fred.
 *
 * The key of the root Reference is `null`.
 *
 * @example
 * var fredRef = firebase.database().ref("users/fred");
 * var key = fredRef.key;                 // key === "fred"
 * key = fredRef.child("name/last").key;  // key === "last"
 *
 * @type {string|null}
 */
firebase.database.Reference.prototype.key;


/**
 * Gets a Reference for the location at the specified relative path.
 *
 * The relative path can either be a simple child name (for example, "fred") or
 * a deeper slash-separated path (for example, "fred/name/first").
 *
 * @example
 * var usersRef = firebase.database().ref('users');
 * var fredRef = usersRef.child('fred');
 * var fredFirstNameRef = fredRef.child('name/first');
 * var path = fredFirstNameRef.toString();
 * // path is now 'https://sample-app.firebaseio.com/users/fred/name/first'
 *
 * @param {string} path A relative path from this location to the desired child
 *   location.
 * @return {!firebase.database.Reference} The specified child location.
 */
firebase.database.Reference.prototype.child = function(path) {};


/**
 * @example
 * var usersRef = firebase.database().ref('users');
 * var path = usersRef.parent.toString();
 * // path is now 'https://sample-app.firebaseio.com'
 *
 * @type {?firebase.database.Reference} The parent location of a Reference.
 */
firebase.database.Reference.prototype.parent;


/**
 * @example
 * var fredRef = firebase.database().ref('samplechat/users/fred');
 * var path = fredRef.root.toString();
 * // path is now 'https://sample-app.firebaseio.com'
 *
 * @type {!firebase.database.Reference} The root location of a Reference.
 */
firebase.database.Reference.prototype.root;


/**
 * Write data to this database location.
 *
 * This will overwrite any data at this location and all child locations.
 *
 * The effect of the write will be visible immediately and the corresponding
 * events ('value', 'child_added', etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the onComplete callback will
 * be called asynchronously after synchronization has finished.
 *
 * Passing null for the new value is equivalent to calling remove(); all data at
 * this location or any child location will be deleted.
 *
 * set() will remove any priority stored at this location, so if priority is
 * meant to be preserved, you should use setWithPriority() instead.
 *
 * Note that modifying data with set() will cancel any pending transactions at
 * that location, so extreme care should be taken if mixing set() and
 * transaction() to modify the same data.
 *
 * A single set() will generate a single "value" event at the location where the
 * set() was performed.
 *
 * @example
 * var fredNameRef = firebase.database().ref('users/fred/name');
 * fredNameRef.child('first').set('Fred');
 * fredNameRef.child('last').set('Flintstone');
 * // We've written 'Fred' to the database location storing fred's first name,
 * // and 'Flintstone' to the location storing his last name
 *
 * @example
 * fredNameRef.set({ first: 'Fred', last: 'Flintstone' });
 * // Exact same effect as the previous example, except we've written
 * // fred's first and last name simultaneously.
 *
 * @example
 * fredNameRef.set({ first: 'Fred', last: 'Flintstone' })
 *   .then(function() {
 *     console.log('Synchronization succeeded');
 *   })
 *   .catch(function(error) {
 *     console.log('Synchronization failed');
 *   });
 * // Same as the previous example, except we will also log a message
 * // when the data has finished synchronizing.
 *
 * @param {*} value The value to be written (string, number, boolean, object,
 *   array, or null).
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.Promise<void>} Resolves when write to server is complete.
 */
firebase.database.Reference.prototype.set = function(value, onComplete) {};


/**
 * Writes multiple values to the database at once.
 *
 * The `values` argument contains multiple property/value pairs that will be
 * written to the database together. Each child property can either be a simple
 * property (for example, "name"), or a relative path (for example,
 * "name/first") from the current location to the data to update.
 *
 * As opposed to the `set()` method, `update()` can be use to selectively update
 * only the referenced properties at the current location (instead of replacing
 * all the child properties at the current location).
 *
 * The effect of the write will be visible immediately and the corresponding
 * events ('value', 'child_added', etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the onComplete callback will
 * be called asynchronously after synchronization has finished.
 *
 * A single update() will generate a single "value" event at the location where
 * the update() was performed, regardless of how many children were modified.
 *
 * Note that modifying data with update() will cancel any pending transactions
 * at that location, so extreme care should be taken if mixing update() and
 * transaction() to modify the same data.
 *
 * Passing null to update() will remove the data at this location.
 *
 * See
 * {@link
 *  https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html
 *  Introducing multi-location updates and more}
 *
 * @example
 * var fredNameRef = firebase.database().ref('users/fred/name');
 * // Modify the 'first' and 'last' properties, but leave other data at
 * // fredNameRef unchanged.
 * fredNameRef.update({ first: 'Fred', last: 'Flintstone' });
 *
 * @param {!Object} values Object containing multiple values.
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.Promise<void>} Resolves when update on server is complete.
 */
firebase.database.Reference.prototype.update =
    function(values, onComplete) {};


/**
 * Writes data the database location. Like `set()` but also specifies the
 * priority for that data.
 *
 * @deprecated Applications need not use priority, but can order collections by
 *   ordinary properties (see {@link firebase.database.Query#orderByChild}).
 *
 * @param {*} newVal
 * @param {string|number|null} newPriority
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.Reference.prototype.setWithPriority =
    function(newVal, newPriority, onComplete) {};


/**
 * Remove the data at this database location.
 *
 * Any data at chiuld locations will also be deleted.
 *
 * The effect of the remove will be visible immediately and the corresponding
 * event 'value' will be triggered. Synchronization of the remove to the
 * Firebase servers will also be started, and the returned Promise will resolve
 * when complete. If provided, the onComplete callback will be called
 * asynchronously after synchronization has finished.
 *
 * @example
 * var fredRef = firebase.database().ref('users/fred');
 * fredRef.remove()
 *   .then(function() {
 *     console.log("Remove succeeded.")
 *   })
 *   .catch(function(error) {
 *     console.log("Remove failed: " + error.message)
 *   });
 *
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.Promise<void>} Resolves when remove on server is complete.
 */
firebase.database.Reference.prototype.remove = function(onComplete) {};


/**
 * Atomically modifies the data at this location.
 *
 * Atomically modify the data at this location. Unlike a normal `set()`, which
 * just overwrites the data regardless of its previous value, `transaction()` is
 * used to modify the existing value to a new value, ensuring there are no
 * conflicts with other clients writing to the same location at the same time.
 *
 * To accomplish this, you pass `transaction()` an update function which is used
 * to transform the current value into a new value. If another client writes to
 * the location before your new value is successfully written, your update
 * function will be called again with the new current value, and the write will
 * be retried. This will happen repeatedly until your write succeeds without
 * conflict or you abort the transaction by not returning a value from your
 * update function.
 *
 * Note: Modifying data with set() will cancel any pending transactions at
 * that location, so extreme care should be taken if mixing set() and
 * transaction() to update the same data.
 *
 * Note: When using transactions with Security and Firebase Rules in place, be
 * aware that a client needs `.read` access in addition to `.write` access in
 * order to perform a transaction. This is because the client-side nature of
 * transactions requires the client to read the data in order to transactionally
 * update it.
 *
 * @example
 * // Increment Fred's rank by 1.
 * var fredRankRef = firebase.database().ref('users/fred/rank');
 * fredRankRef.transaction(function(currentRank) {
 *   // If users/fred/rank has never been set, currentRank will be null.
 *   return currentRank + 1;
 * });
 *
 * @example
 * // Try to create a user for wilma, but only if the user id 'wilma' isn't
 * // already taken
 * var wilmaRef = firebase.database().ref('users/wilma');
 * wilmaRef.transaction(function(currentData) {
 *   if (currentData === null) {
 *     return { name: { first: 'Wilma', last: 'Flintstone' } };
 *   } else {
 *     console.log('User wilma already exists.');
 *     return; // Abort the transaction.
 *   }
 * }, function(error, committed, snapshot) {
 *   if (error) {
 *     console.log('Transaction failed abnormally!', error);
 *   } else if (!committed) {
 *     console.log('We aborted the transaction (because wilma already exists).');
 *   } else {
 *     console.log('User wilma added!');
 *   }
 *   console.log("Wilma's data: ", snapshot.val());
 * });
 *
 *
 * @param {function(*): *} transactionUpdate A developer-supplied function which
 *   will be passed the current data stored at this location (as a JavaScript
 *   object). The function should return the new value it would like written (as
 *   a JavaScript object). If `undefined` is returned (i.e. you return with no
 *   arguments) the transaction will be aborted and the data at this location
 *   will not be modified.
 * @param {(function(?Error, boolean,
 *                   ?firebase.database.DataSnapshot))=} onComplete A callback
 *   function that will be called when the transaction completes. The callback
 *   is passed three arguments: a possibly-null `Error`, a `boolean` indicating
 *   whether the transaction was committed, and a `DataSnapshot` indicating the
 *   final result. If the transaction failed abnormally, the first argument will
 *   be an `Error` object indicating the failure cause. If the transaction
 *   finished normally, but no data was committed because no data was returned
 *   from `transactionUpdate`, then second argument will be false. If the
 *   transaction completed and committed data to Firebase, the second argument
 *   will be true. Regardless, the third argument will be a `DataSnapshot`
 *   containing the resulting data in this location.
 * @param {boolean=} applyLocally By default, events are raised each time the
 *   transaction update function runs. So if it is run multiple times, you may
 *   see intermediate states. You can set this to false to suppress these
 *   intermediate states and instead wait until the transaction has completed
 *   before events are raised.
 * @return {!firebase.Promise<{
 *   committed: boolean,
 *   snapshot: ?firebase.database.DataSnapshot
 * }>} Returns a Promise that can optionally be used instead of the onComplete
 *   callback to handle success and failure.
 */
firebase.database.Reference.prototype.transaction =
    function(transactionUpdate, onComplete, applyLocally) {};


/**
 * Sets a priority for the data at this database location.
 *
 * @deprecated Applications need not use priority, but can order collections by
 *   ordinary properties (see {@link firebase.database.Query#orderByChild}).
 *
 * @param {string|number|null} priority
 * @param {function(?Error)} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.Reference.prototype.setPriority =
    function(priority, onComplete) {};


/**
 * @interface
 * @extends {firebase.database.Reference}
 * @extends {firebase.Thenable<void>}
 */
firebase.database.ThenableReference = function() {};


/**
 * Generates a new child location using a unique key and returns its reference.
 *
 * This is the most common pattern for adding data to a collection of items.
 *
 * If you provide a value to `push()`, the value will be written to the
 * generated location. If you don't pass a value, nothing will be written to the
 * database and the child will remain empty (but you can use the reference
 * elsewhere).
 *
 * The unique key generated by `push()` are ordered by the current time, so the
 * resulting list of items will be chronologically sorted. The keys are also
 * designed to be unguessable (they contain 72 random bits of entropy).
 *
 *
 * See
 * {@link
 *  https://firebase.google.com/docs/database/web/save-data#append_to_a_list_of_data
 *  Append to a list of data}
 * </br>See
 * {@link
 *  https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html
 *  The 2^120 Ways to Ensure Unique Identifiers}
 *
 * @example
 * var messageListRef = firebase.database().ref('message_list');
 * var newMessageRef = messageListRef.push();
 * newMessageRef.set({ 'user_id': 'fred', 'text': 'Yabba Dabba Doo!' });
 * // We've appended a new message to the message_list location.
 * var path = newMessageRef.toString();
 * // path will be something like
 * // 'https://sample-app.firebaseio.com/message_list/-IKo28nwJLH0Nc5XeFmj'
 *
 * @param {*=} value Optional value to be written at the generated location.
 * @param {function(?Error)=} onComplete Callback called when write to server is
 *   complete.
 * @return {!firebase.database.ThenableReference} Combined Promise and
 *   reference; resolves when write is complete, but can be used immediately as
 *   the reference to the child location.
 */
firebase.database.Reference.prototype.push = function(value, onComplete) {};


/**
 * @return {!firebase.database.OnDisconnect}
 */
firebase.database.Reference.prototype.onDisconnect = function() {};


/**
 * @interface
 */
firebase.database.Query = function() {}


/**
 * @type {!firebase.database.Reference}
 */
firebase.database.Query.prototype.ref;


/**
 * @param {!string} eventType
 * @param {!function(firebase.database.DataSnapshot, string=)} callback
 * @param {(function(Error)|Object)=} cancelCallbackOrContext
 * @param {Object=} context
 * @return {!function(firebase.database.DataSnapshot, string=)}
 */
firebase.database.Query.prototype.on =
    function(eventType, callback, cancelCallbackOrContext, context) {};


/**
 * @param {string=} eventType
 * @param {function(!firebase.database.DataSnapshot, ?string=)=} callback
 * @param {Object=} context
 */
firebase.database.Query.prototype.off =
    function(eventType, callback, context) {};


/**
 * @param {!string} eventType
 * @param {!function(!firebase.database.DataSnapshot, string=)} userCallback
 * @return {!firebase.Promise<*>}
 */
firebase.database.Query.prototype.once = function(eventType, userCallback) {};


/**
 * @param {!number} limit
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.limitToFirst = function(limit) {};


/**
 * @param {!number} limit
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.limitToLast = function(limit) {};


/**
 * @param {!string} path
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByChild = function(path) {};


/**
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByKey = function() {};


/**
 * Generates a new `Query` object order by priority.
 *
 * @deprecated Applications need not use priority, but can order collections by
 *   ordinary properties (see {@link firebase.database.Query#orderByChild}).
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByPriority = function() {};


/**
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.orderByValue = function() {};


/**
 * @param {number|string|boolean|null} value
 * @param {string=} key
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.startAt = function(value, key) {};


/**
 * @param {number|string|boolean|null} value
 * @param {string=} key
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.endAt = function(value, key) {};


/**
 * @param {number|string|boolean|null} value
 * @param {string=} key
 * @return {!firebase.database.Query}
 */
firebase.database.Query.prototype.equalTo = function(value, key) {};


/**
 * Get the absolute URL for this location.
 *
 * The toString() method returns a URL that is ready to be put into a browser,
 * curl command, or a firebase.database.refFromURL() call. Since all of those
 * expect the URL to be url-encoded, toString() returns an encoded URL.
 *
 * Append '.json' to the URL when typed into a browser to download JSON
 * formatted data. If the location is secured (not publicly readable) you will
 * get a permission-denied error.
 *
 * @example
 * // Calling toString() on a root Firebase reference returns the URL where its
 * // data is stored within the database:
 * var rootRef = firebase.database().ref();
 * var rootUrl = rootRef.toString();
 * // rootUrl === "https://sample-app.firebaseio.com/".
 *
 * // Calling toString() at a deeper Firebase reference returns the URL of that
 * // deep path within the database:
 * var fredRef = rootRef.child('users/fred');
 * var fredURL = fredRef.toString();
 * // fredURL === "https://sample-app.firebaseio.com/users/fred".
 *
 * @return {string} The absolute URL for this location.
 * @override
 */
firebase.database.Query.prototype.toString = function() {};


/**
 * Data returned via Reference.on() methods is encapsulated in DataSnapshot.
 * @interface
 */
firebase.database.DataSnapshot = function() {};


/**
 * Convert the DataSnapshot to a Javascript value (number, boolean, string,
 * Object, Array or null).
 *
 * @return {*}
 */
firebase.database.DataSnapshot.prototype.val = function() {};


/**
 * @return {*}
 */
firebase.database.DataSnapshot.prototype.exportVal = function() {};


/**
 * @return {boolean}
 */
firebase.database.DataSnapshot.prototype.exists = function() {};


/**
 * @param {string} path
 * @return {!firebase.database.DataSnapshot}
 */
firebase.database.DataSnapshot.prototype.child = function(path) {};


/**
 * @param {string} path
 * @return {boolean}
 */
firebase.database.DataSnapshot.prototype.hasChild = function(path) {};


/**
 * Gets the priority value of the data in this `DataSnapshot`.
 *
 * @deprecated Applications need not use priority, but can order collections by
 *   ordinary properties (see {@link firebase.database.Query#orderByChild}).
 * @return {string|number|null}
 */
firebase.database.DataSnapshot.prototype.getPriority = function() {};


/**
 * Enumerate the top-level children in the DataSnapshot.
 * @param {function(!firebase.database.DataSnapshot): boolean} action
 * @return {boolean}
 */
firebase.database.DataSnapshot.prototype.forEach = function(action) {};


/**
 * @return {boolean}
 */
firebase.database.DataSnapshot.prototype.hasChildren = function() {};


/**
 * @type {string|null}
 */
firebase.database.DataSnapshot.prototype.key;


/**
 * @return {number}
 */
firebase.database.DataSnapshot.prototype.numChildren = function() {};


/**
 * @type {!firebase.database.Reference}
 */
firebase.database.DataSnapshot.prototype.ref;



/**
 * @interface
 */
firebase.database.OnDisconnect = function() {};


/**
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.OnDisconnect.prototype.cancel = function(onComplete) {};


/**
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.OnDisconnect.prototype.remove = function(onComplete) {};

/**
 * @param {*} value
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.OnDisconnect.prototype.set =
    function(value, onComplete) {};


/**
 * Ensures the data at this location is set to the specified value and priority
 * when the client is disconnected (due to closing the browser, navigating to a
 * new page, or network issues).
 *
 * @deprecated Applications need not use priority, but can order collections by
 *   ordinary properties (see {@link firebase.database.Query#orderByChild}).
 * @param {*} value
 * @param {number|string|null} priority
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.OnDisconnect.prototype.setWithPriority =
    function(value, priority, onComplete) {};


/**
 * @param {!Object} objectToMerge
 * @param {function(?Error)=} onComplete
 * @return {!firebase.Promise<void>}
 */
firebase.database.OnDisconnect.prototype.update =
    function(objectToMerge, onComplete) {};
