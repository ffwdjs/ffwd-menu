(function (root, factory) {
  'use strict';
  /* jshint node: true */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ffwd-utils'], factory);
  }
  else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('ffwd-utils'));
  }
  else {
    // Browser globals (root is window)
    root.FFWD = root.FFWD || {};
    root.FFWD.utils = factory(root._, root._.string);
  }
}(this, function (utils) {
  'use strict';
  var _ = utils._;

  function Menu(options) {
    this.initialize(options);
  }

  Menu.prototype.initialize = function(options) {
    options = options || {};
    this._links = options.links || {};
    return this.setActive(options.path);
  };

  Menu.prototype._compile = function() {
    var links = {};
    var tree = {};
    var urlPath = this.path;

    function extendChild(link, suffix, prefix) {
      var url = ( // remove a trailing /
                  prefix.slice(-1) === '/' ?
                  prefix.slice(0, -1) :
                  prefix
                ) +

                ( // ensure a / before
                  suffix[0] === '/' ?
                  '' :
                  '/'
                ) +

                suffix;

      link.parent = prefix;

      extendLinks(link, url);
    }

    function extendLinks(link, url) {
      if (typeof link !== 'object' || link.menuHidden) {
        return;
      }

      url = url[0] === '/' ? url.slice(1) : url;
      link.url = url;

      link.links = link.links || {};
      link.children = link.children || {};


      if (urlPath) {
        if (urlPath === url) {
          link.active = true;
        }

        if (!link.active && urlPath.indexOf(url) > -1) {
          link.aboveActive = true;
        }

        if (!link.active && url.indexOf(urlPath) > -1) {
          link.belowActive = true;
        }

        // console.info('active', urlPath, url, link.aboveActive, link.active, link.belowActive);
      }


      var index = false;

      if (link.links && link.links.index) {
        index = _.clone(link.links.index);
        delete link.links.index;
      }


      if (index) {
        _.extend(link.links, index.links);

        delete index.links;
        delete index.children;

        _.defaults(link, index);
      }

      _.each(utils.weightened(link.links || {}), extendLinks);

      _.each(utils.weightened(link.children || {}), function(child, suffix) {
        extendChild(child, suffix, url);
      });

      links[url] = link;
      var leaf = _.clone(link);
      var parts = url.split('/');
      delete leaf.links;
      delete leaf.children;

      if (parts.length === 1) {
        tree[parts[0]] = tree[parts[0]] || {};
        _.defaults(tree[parts[0]], leaf);
      }
      else {
        if (parts.slice(-1)[0] !== 'index') {
          var dest = parts.join('||links||');
          // console.info('set leaf', dest, leaf);
          utils.atPath(tree, dest, leaf, '||');
        }
      }
    }

    _.each(this._links, extendLinks);

    this.tree = utils.weightened(tree);
    _.each(links, function(link, u) {
      var w = link.weight || 0;
      if (link.parent) {
        utils.atPath.splitter = '||';
        var parent = utils.atPath(tree, link.parent.split('/').join('||links||'));
        utils.atPath.splitter = '.';
        // console.info('parent', parent);
      }
      // if (link.parent && links[link.parent]) {
      //   w = Math[w < 0 ? 'max' : 'min'](links[link.parent].weight || 0, (links[link.parent].weight || 0) + (w * 0.1));
      // }
      // console.info('url', u, w, link.parent || 'root');
      links[u].weight = w;
    });
    this.links = utils.weightened(links);

    return this;
  };

  Menu.prototype.extend = function(additions) {
    this._links = this._links || {};
    _.extend(this._links, additions || {});
    try {
      this._compile();
    }
    catch (err) {
      console.info('compilation error', err.stack);
    }
    return this;
  };

  Menu.prototype.setActive = function(urlPath) {
    urlPath = urlPath || '';
    this.path = urlPath[0] === '/' ? urlPath.slice(1) : urlPath;
    return this._compile();
  };


  return {
    Menu: Menu
  };
}));
