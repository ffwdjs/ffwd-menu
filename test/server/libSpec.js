'use strict';
var utils = module.exports = require('ffwd-utils/test/server/utils');
var expect = utils.expect;
var serverLib, feature, menu;

describe('ffwd-menu/server', function() {
  it('provides server side specific tools', function() {
    expect(function() {
      serverLib = require('../../server');
    }).to.not.throw();

    expect(serverLib).to.be.a('function');

    expect(function(){
      feature = serverLib();
    }).to.not.throw();
  });


  describe('feature', function() {
    it('is an object', function() {
      expect(feature).to.be.an('object');
    });


    describe('Menu', function() {
      it('can be found in the feature', function() {
        expect(feature.Menu).to.be.a('function');
      });


      it('instanciates', function() {
        var options = {
          links: {
            'itemA1': {
              children: {
                index: {
                  title: 'index-title'
                },
                demo: {
                  title: 'itemA1 Demo'
                }
              }
            },
            '/itemA2/thing': {
              title: 'Something',
              description: 'Without description...',
              children: {
                // 'child-of-thing': {
                //   title: 'In'
                // },
                'child': {
                  title: 'Tada'
                },
                'child-of-thing': {
                  title: 'indeed'
                },
                'child-of-thing/itemA2': {
                  title: 'Doh!'
                }
              },
              links: {
                '/not/in/itemA2': {
                  title: 'Not in its parent path',
                },
                '/not-either/in/itemA2': {
                  title: 'Not in its parent path',
                  children: {
                    'child': {
                      title: 'Tada'
                    }
                  }
                }
              }
            },
            '/other': {
              title: 'Other',
              description: 'no',
              links: {
                '/itemA1/thing': {
                  title: 'Other name, same page',
                  children: {
                    'in-itemA1': {
                      title: 'Bla'
                    }
                  }
                }
              }
            }
          }
        };

        expect(function() {
          menu = new feature.Menu(options);
          console.info(utils.toNiceJSON(menu.tree));
        }).to.not.throw();
      });


      it('compiles', function() {
        expect(menu.links).to.be.an('object');

        expect(menu.links['itemA1/thing']).to.be.an('object');

        expect(menu.links['itemA1/thing/bla']).to.be.an('object');

        console.info('menu.links', Object.keys(menu.links));
        expect(menu.links['itemA1/thing/in/itemA1']).to.be.an('object');


        expect(menu.tree).to.be.an('object');

        expect(menu.tree.itemA1).to.be.an('object');

        expect(menu.tree.itemA1.links).to.be.an('object');

        expect(menu.tree.itemA1.links.thing).to.be.an('object');

        expect(menu.tree.itemA1).to.be.an('object');

        expect(menu.tree.itemA1.links).to.be.an('object');

        expect(menu.tree.itemA1.links.demo).to.be.an('object');

        expect(menu.tree.itemA1.links.index).to.be.undefined;

        expect(menu.tree.itemA1.title).to.be.an('string');
      });


      it('can be extended', function() {
        var links = {
          // '/---/___': {
          //   weight: -1,
          //   title: '___',
          //   links: {
          //     '/_-_': {
          //       title: '_-_'
          //     }
          //   },
          //   children: {
          //     '/_-----': {
          //       title: '_------'
          //     }
          //   }
          // },
          // '/---/---': {
          //   title: 'gna'
          // },
          // '/add': {
          //   title: '...',
          //   children: {
          //     index: {
          //       title: 'yada'
          //     }
          //   }
          // },
          '/add/afterward': {
            title: 'Added afterward',
            links: {
              '/any/added': {
                title: 'Also added afterward'
              }
            },
            children: {
              index: {
                title: 'just to see'
              },
              'as/child': {
                title: 'As child'
              }
            }
          },
          '/add/one-more': {
            title: 'for the road'
          }
        };

        expect(function() {
          menu.extend(links);
        }).to.not.throw();

        expect(menu.links).to.be.an('object');

        expect(menu.links['add/afterward']).to.be.an('object');

        expect(menu.links['itemA1/added']).to.be.an('object');

        expect(menu.links['add/afterward/as/child']).to.be.an('object');

        expect(menu.tree).to.be.an('object');

        expect(menu.tree.add).to.be.an('object');

        expect(menu.tree.add.links).to.be.an('object');

        expect(menu.tree.add.links.afterward).to.be.an('object');

        expect(menu.tree.add.links.afterward.title).to.equal('just to see');

        expect(menu.tree.add.links.afterward.links).to.be.an('object');

        expect(menu.tree.add.links.afterward.links.as).to.be.an('object');
      });


      it('can set the active path', function() {
        expect(function() {
          menu.setActive('/add/afterward');
          // console.info(utils.toNiceJSON(menu.tree));
        }).to.not.throw();
      });


      describe('active link flags', function() {
        it('has the active flag', function() {
          expect(menu.links.add.active).to.be.undefined;
          expect(menu.tree.add.active).to.be.undefined;

          expect(menu.links['add/afterward'].active).to.be.true;
          expect(menu.tree.add.links.afterward.active).to.be.true;

          expect(menu.links['add/afterward/as/child'].active).to.be.undefined;
          expect(menu.tree.add.links.afterward.links.as.links.child.active).to.be.undefined;
        });


        it('has the aboveActive flag', function() {
          expect(menu.links.add.aboveActive).to.be.true;
          expect(menu.tree.add.aboveActive).to.be.true;

          expect(menu.links['add/afterward'].aboveActive).to.be.undefined;
          expect(menu.tree.add.links.afterward.aboveActive).to.be.undefined;

          expect(menu.links['add/afterward/as/child'].aboveActive).to.be.undefined;
          expect(menu.tree.add.links.afterward.links.as.links.child.aboveActive).to.be.undefined;
        });


        it('has the belowActive flag', function() {
          expect(menu.links.add.belowActive).to.be.undefined;
          expect(menu.tree.add.belowActive).to.be.undefined;

          expect(menu.links['add/afterward'].belowActive).to.be.undefined;
          expect(menu.tree.add.links.afterward.belowActive).to.be.undefined;

          expect(menu.links['add/afterward/as/child'].belowActive).to.be.true;
          expect(menu.tree.add.links.afterward.links.as.links.child.belowActive).to.be.true;
        });
      });
    });


    describe('responseMenu', function() {});
  });
});
