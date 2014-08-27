define(function (require) {
  var angular = require('angular');
  var _ = require('lodash');
  var $ = require('jquery');

  angular.module('YAxisFactory', ['kibana']);

  describe('Vislib yAxis Class Test Suite', function () {
    var YAxis;
    var Data;
    var yAxis;
    var el;
    var dataObj;
    var data = {
      hits: 621,
      label: '',
      ordered: {
        date: true,
        interval: 30000,
        max: 1408734982458,
        min: 1408734082458
      },
      series: [
        {
          values: [
            {
              x: 1408734060000,
              y: 8
            },
            {
              x: 1408734090000,
              y: 23
            },
            {
              x: 1408734120000,
              y: 30
            },
            {
              x: 1408734150000,
              y: 28
            },
            {
              x: 1408734180000,
              y: 36
            },
            {
              x: 1408734210000,
              y: 30
            },
            {
              x: 1408734240000,
              y: 26
            },
            {
              x: 1408734270000,
              y: 22
            },
            {
              x: 1408734300000,
              y: 29
            },
            {
              x: 1408734330000,
              y: 24
            }
          ]
        }
      ],
      xAxisLabel: 'Date Histogram',
      yAxisLabel: 'Count'
    };

    beforeEach(function () {
      module('YAxisFactory');
    });

    beforeEach(function () {
      inject(function (d3, Private) {
        YAxis = Private(require('components/vislib/modules/YAxis'));
        Data = Private(require('components/vislib/modules/Data'));

        el = d3.select('body').append('div')
          .attr('class', 'y-axis-wrapper')
          .append('div')
          .attr('class', 'y-axis-div')
          .style('height', '20px');

        dataObj = new Data(data);
        yAxis = new YAxis({
          el: $('.y-axis-wrapper')[0],
          yMax: dataObj.getYMaxValue(),
          attr: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
        });
      });
    });

    afterEach(function () {
      el.remove();
    });

    describe('render Method', function () {
      beforeEach(function () {
        yAxis.render();
      });

      it('should append an svg to div', function () {
        expect(el.selectAll('svg').length).to.be(1);
      });

      it('should append a g element to the svg', function () {
        expect(el.selectAll('svg').select('g').length).to.be(1);
      });

      it('should append ticks with text', function () {
        expect(!!el.selectAll('svg').selectAll('.tick text')).to.be(true);
      });
    });

    describe('getYScale Method', function () {
      var yScale;
      var height = 50;

      beforeEach(function () {
        yScale = yAxis.getYScale(height);
      });

      it('should return a function', function () {
        expect(_.isFunction(yScale)).to.be(true);
      });

      it('should return the correct domain', function () {
        expect(yScale.domain()[0]).to.be(0);
        // Should be greater than 36 since we are using .nice()
        expect(yScale.domain()[1]).to.be.greaterThan(36);
      });

      it('should return the correct range', function () {
        expect(yScale.range()[0]).to.be(height);
        // The yScale range should always start from 0
        expect(yScale.range()[1]).to.be(0);
      });
    });

    describe('draw Method', function () {
      it('should be a function', function () {
        expect(_.isFunction(yAxis.draw())).to.be(true);
      });
    });

  });
});
