'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"index.html": "81896a12c9dc2b212b4c490308acd91f",
"/": "81896a12c9dc2b212b4c490308acd91f",
"main.dart.js": "87432e3eb1a31d2dcaec521250cf88ab",
"manifest.json": "35d721cce427fee98aa365958c442555",
"favicon.png": "6b537306220c6ed410ad05031ee19f65",
"icons/android-icon-36x36.png": "6b537306220c6ed410ad05031ee19f65",
"icons/apple-icon-114x114.png": "0490cf738e8fd863164f5cd10cf6b9bd",
"icons/ms-icon-310x310.png": "d4d2e4fc9515baafc54ea627f7913ce5",
"icons/android-icon-48x48.png": "713d49ece5330190ac7ce04052007ddc",
"icons/apple-icon-57x57.png": "303f271d26a8da4fc2b2be215ac1e1fd",
"icons/apple-icon-72x72.png": "7a7717091b94d32d38ef4eb6449cd3ce",
"icons/android-icon-96x96.png": "5a9d8cd9302d8bf65e364f0495f221ec",
"icons/apple-icon-60x60.png": "ff93ca7337d85963f5ab77ae56671ca1",
"icons/favicon-16x16.png": "371933bad275ec20a71892a99ef1a30b",
"icons/ms-icon-144x144.png": "cd5b69583a7788a939920eb51aa88907",
"icons/favicon.ico": "37e8b9f3b0aec60051df7c5ee6a48c57",
"icons/apple-icon-152x152.png": "0e897003feb0d2c7d340e6e4d57ae612",
"icons/ms-icon-150x150.png": "aeda358a6a9c764c815ad71e8f0d908a",
"icons/ms-icon-70x70.png": "ff24f4ca69bf8aed79a1adefbb6ae9f5",
"icons/apple-icon-120x120.png": "a7a0152a72b4033651e560ba8674342a",
"icons/android-icon-192x192.png": "7b5ad4e557bda5fd721a0fe5f485841a",
"icons/apple-icon-144x144.png": "cd5b69583a7788a939920eb51aa88907",
"icons/android-icon-144x144.png": "74e0053bb63ab8c1d47d765e8223e00b",
"icons/apple-icon-76x76.png": "1ffc486a6d70ff7bf1180323d6093f76",
"icons/apple-icon.png": "fd7e46d17d9b95ed07ca2f1bcad94571",
"icons/apple-icon-180x180.png": "a86b977a9f0388ff0e0e943d90d443e2",
"icons/android-icon-72x72.png": "8835f286aa50b968b4cc6e82b17c0722",
"icons/favicon-32x32.png": "0f6e872cf2dbc379404d8c6de0a7eb8f",
"icons/favicon-96x96.png": "b8f5e5615c7cd66f00a0885527d3d949",
"icons/apple-icon-precomposed.png": "fd7e46d17d9b95ed07ca2f1bcad94571",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/NOTICES": "913d72a27e402be9aab09cf8bf68ec9c",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/implant_color.png": "ac0523257de93e4983ce743709dd0678",
"assets/assets/images/teeth.png": "148e297d00da56d422571ba650574cba",
"assets/assets/images/dentist.png": "5316b026f61f1b3eda7850c769914937",
"assets/assets/images/implant_wb.png": "29e11e03f193f55b5615a93a1e37c305",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/AssetManifest.json": "4f75f48ad9adec9b9ba5c615e859f943",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"version.json": "f9f62ed79c7ba93c1f2cc1fbd1d12673",
"CNAME": "09e298958fe14e52d2a889d96715a204"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
