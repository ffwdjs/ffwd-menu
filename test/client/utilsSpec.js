'use strict';

var expect = require('chai').expect;

describe('ffwd-menu/client', function() {
  var clientLib, menu;

  it('does not blow', function(done) {
    if (!require.undef) {
      return done();
    }
    require.undef('ffwd-menu');
    require(['ffwd-menu'], function(menu) {
      clientLib = menu;
      done();
    }, done);
  });

  it('has a Menu constructor', function() {
    // var clientLib = require('ffwd-menu');
    expect(function() {
      clientLib = require('ffwd-menu');
    }).to.not.throw();
  });



  describe('feature', function() {
    it('is an object', function() {
      expect(clientLib).to.be.an('object');
    });


    describe('Menu', function() {
      it('can be found in the feature', function() {
        expect(clientLib.Menu).to.be.a('function');
      });


      it('instanciates', function() {
        var options = {
          links: {
            a: {
              title: 'A',
              description: 'Comes after B',
              children: {
                'two': {
                  title: '2',
                  description: 'Second child of A'
                },
                'one': {
                  weight: -1,
                  title: '1',
                  description: 'First child of A'
                }
              }
            },
            b: {
              weight: -1,
              title: 'B',
              description: 'Comes before A'
            },
            c: {
              children: {
                index: {
                  title: 'C',
                  description: 'C menu point belongs to its index'
                },
                'un': {
                  title: '1 (in french)',
                  description: 'One is "un" in french'
                }
              }
            },
            'c/deux': {
              title: '2 (in french.. too)',
              description: 'Should be a child of "C"'
            }
          }
        };

        expect(function() {
          try {
            menu = new clientLib.Menu(options);
          }
          catch (e) {
            console.trace(e.message);
            throw e;
          }
        }).to.not.throw();
      });

      describe('the compilation result', function() {
        describe('as tree', function() {
          it('has the information about "a"', function() {
            var tree = menu.tree;
            // console.info(JSON.stringify(tree, null, 2));
            expect(tree).to.be.an('object');
            expect(tree.a).to.be.an('object');
            // expect(tree.a.children).to.be.an('object');
            expect(tree.a.links).to.be.an('object');
            expect(tree.a.title).to.equal('A');
            expect(tree.a.description).to.equal('Comes after B');
          });


          it('has the information about "b"', function() {
            var tree = menu.tree;
            expect(tree).to.be.an('object');
            expect(tree.b).to.be.an('object');
            // expect(tree.b.children).to.be.an('object');
            // expect(tree.b.links).to.be.an('object');
            expect(tree.b.title).to.equal('B');
            expect(tree.b.description).to.equal('Comes before A');
          });


          it('sorts the links by their weight property', function() {
            var treeKeys = Object.keys(menu.tree);
            expect(treeKeys.indexOf('b')).to.equal(0);
            expect(treeKeys.indexOf('a')).to.equal(1);
            expect(treeKeys.indexOf('c')).to.equal(2);
          });
        });


        describe('as collection', function() {
          it('has the information about "a"', function() {
            var links = menu.links;
            // console.info(JSON.stringify(links, null, 2));
            expect(links).to.be.an('object');
            expect(links.a).to.be.an('object');
            expect(links.a.children).to.be.an('object');
            expect(links.a.links).to.be.an('object');
            expect(links.a.title).to.equal('A');
            expect(links.a.description).to.equal('Comes after B');
          });


          it('has the information about "b"', function() {
            var links = menu.links;
            expect(links).to.be.an('object');
            expect(links.b).to.be.an('object');
            expect(links.b.children).to.be.an('object');
            expect(links.b.links).to.be.an('object');
            expect(links.b.title).to.equal('B');
            // console.info('links.b', links.b);
            expect(links.b.description).to.equal('Comes before A');
          });


          xit('sorts the links by their weight property', function() {
            // the problem here is that the keys also contains "a/one", "a/two", ...
            var linkKeys = Object.keys(menu.links);
            // console.info('keys', linkKeys);

            expect(linkKeys.indexOf('b')).to.equal(0);
            expect(linkKeys.indexOf('a')).to.equal(1);
            expect(linkKeys.indexOf('a/one')).to.equal(2);
            expect(linkKeys.indexOf('a/two')).to.equal(3);
            expect(linkKeys.indexOf('c')).to.equal(4);
            expect(linkKeys.indexOf('c/un')).to.equal(5);
            expect(linkKeys.indexOf('c/deux')).to.equal(6);
          });
        });
      });



      it('can be extended', function() {
        var additions = {};
        expect(function() {
          menu.extend(additions);
        }).to.not.throw();
      });


      xit('can set the active path', function() {
        expect(function() {
          menu.setActive('/add/afterward');
        }).to.not.throw();
      });


    });
  });
});
