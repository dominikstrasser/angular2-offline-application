## Intro

This is a simple offline application using sw-toolbox and firebase.
If you have any questions regarding the implementation please open an issue on github.

** The "offline feature" is only available in <a href="https://jakearchibald.github.io/isserviceworkerready/">modern browsers</a> **


## Setup

The example uses:

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)
* [Firebase](https://firebase.google.com)
* [PureCss](http://purecss.io)
* [SpinKit](http://tobiasahlin.com/spinkit/)


## Workflow

We get the data snapshots via the firebase `child_added` event.

```
this.messageRef.on('child_added', (snapshot) => {
  this.listItems.unshift(snapshot.val());
  if (this.isPersistingData) return;
  setTimeout(() => this.persistData(), 1000);
  this.isPersistingData = true;
});
```

Everytime we retrieve some data we persist it in **localStorage**.

We defer the data persisting for one second every time we get new data.
With this simple trick we prevent unnecessary writes to **localStorage** 
during inital application starts and in case of high traffic.


## Caching via sw-toolbox

We can make the whole application offline available using just one simple command provided by the sw-toolbox.

```
toolbox.router.get('*', toolbox.fastest);
```

The Resource is requested both from cache and network. 
The fastest is served. Usually the faster one is the cache. 
The network request will - if successful - update the cached version. 

This way we are always one step behind "up to date" but still offline available.  

