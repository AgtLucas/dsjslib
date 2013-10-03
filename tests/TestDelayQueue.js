var DelayQueue = require('../lib/DelayQueue.js'), assert = require('assert'), fs = require('fs');
(function () {

    function testOffer(testDoneFn) {
        console.log('**testOffer***');
        var times = [Date.now() + 10 * 1000, Date.now() + 20 * 1000, Date.now() + 30 * 1000, Date.now() + 40 * 1000]
        var tasks = [
            {'schedule' : times[0]},
            {'schedule' : times[1]},
            {'schedule' : times[3]},
            {'schedule' : times[2]}
        ];
        var dq = new DelayQueue(function (task) {
            return task.schedule - Date.now();
        });
        tasks.forEach(function (task) {
            dq.offer(task);
        });
        assert.deepEqual(dq._queue, [
            { schedule : times[0] },
            { schedule : times[1] },
            { schedule : times[3] },
            { schedule : times [2]}
        ]);

        assert.equal(dq.size(), 4);
        assert.equal(dq.poll(), null);
        assert.equal(dq.peek().schedule, times[0]);
        setTimeout(function () {
            assert.deepEqual(dq.poll().schedule, times[0]);
            assert.equal(dq.poll(), null);
            testDoneFn();
        }, 12000);
    }

    function testPoll() {
        console.log('**** test Poll***');
        var times = [],
            delay = 2000,
            now = Date.now();
        var dq = new DelayQueue(function (task) {
            return task.schedule - Date.now();
        });

        for (var i = 30; i > 0; i--) {
            var time = (now + delay * i);
            times[i] = time;
            dq.offer({'schedule' : time});
        }

        function testCleanup() {
            //clean and check
            for (i = 21; i <= 30; i++) {
                dq.poll();
            }
            assert.equal(dq.size(), 0);
            assert.deepEqual(dq._queue, []);
        }

        setTimeout(function () {
            for (i = 1; i <= 20; i++) {
                //console.log('iteration ' + i);
                assert.equal(dq.poll().schedule, times[i]);
                assert.equal(dq.size(), 30 - i, 'test failed - size mismatch');


            }
            for (i = 9; i >= 0; i--) {
                assert.equal(dq.peek().schedule, times[21]);
                assert.equal(dq.size(), 10, 'test failed - size mismatch');
            }
            setTimeout(testCleanup, 20 * 1000);

        }, 42 * 1000);


    }


    testOffer(function () {
        testPoll();
    });



}());