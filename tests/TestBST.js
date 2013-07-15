var BinarySearchTree = require("../src/BinarySearchTree.js"),assert=require('assert');
(function () {
    var bt = new BinarySearchTree();

    function testInsert() {
        console.log("INSERT AND TRAVERSE")
        bt.put(16,"sVal").put(7,"seven").put(25,"sVal").put(26,"sVal").put(39,"sVal")
            .put(13,"sVal").put(15,"sVal").put(29,"zzz")
            .put(35,"sVal").put(12,"sVal").put(55,{complex:"55"}).put(11,"sVal");
        assert.strictEqual(bt.get(29).value,"zzz");
        bt.put(29,"newvalfor29")
        assert.strictEqual(bt.get(29).value,"newvalfor29");
        assert.strictEqual(bt.get(7).key,7);
        assert.strictEqual(bt.get(16).key,16);
        assert.strictEqual(bt.get(12).key,12);
        
        bt.traverse(function (node) {
            console.log(node.key)
        });

    }

    function testMinMax() {
        console.log("FIND min max")
        assert.strictEqual(bt.min().key,7);
        assert.strictEqual(bt.min().value,"seven");
        assert.strictEqual(bt.max().key,55);
        assert.deepEqual(bt.max().value,{complex:"55"});
    }

    
    function testSuccPre() {
        console.log("SUCCESSOR AND PREDECESSOR")
        assert.strictEqual(bt.successor(26).key,29);
        assert.strictEqual(bt.successor(55),null);
        assert.strictEqual(bt.successor(12).key,13);
        assert.strictEqual(bt.predecessor(11).key,7);
        assert.strictEqual(bt.predecessor(7),null);
        assert.strictEqual(bt.predecessor(35).key,29);
    }

    function testDel() {
        console.log("DELETE")
        bt.delete(29);
        assert.strictEqual(bt.get(29),null);
        bt.delete(13);
        assert.strictEqual(bt.get(13),null);

    }

    (function testBSTfuncs() {
        testInsert();
        testMinMax();
        testSuccPre();
        testDel();
        //pretty print the tree
        console.log(bt.root);
    })();


})();




