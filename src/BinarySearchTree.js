var util = require('util'), log = require("./logger");
/**
 * Implementation of a Binary Search Tree Data structure
 * @constructor
 */
function BinarySearchTree() {
    this.root = null;
    /**
     *
     * @param item
     * @param parent
     * @param leftChild
     * @param rightChild
     * @return {Object}
     */
    this.mkNode_ = function (item, val, parent, leftChild, rightChild) {
        return {item:item,
            parent:parent || null,
            leftChild:leftChild || null,
            rightChild:rightChild || null,
            height:0,
            value:val,
            isLeftChild:function () {
                return this.parent && this.parent.leftChild === this
            },
            isRightChild:function () {
                return this.parent && this.parent.rightChild === this
            },
            /**
             * function to display the tree using Node util class
             * @return {*}
             */
            inspect:function () {
                return util.inspect({item:this.item, h:this.height,
                    L:this.leftChild, R:this.rightChild, p:(this.parent ? this.parent.item : null)}, {depth:null, colors:true});
            }

        }
    }
    /**
     * Private method tofind successor node
     * @param item
     * @param node
     * @return {*}
     */
    var successorNode = function (node) {
        if (node && node === node.parent.leftChild) {
            //go to the right child if right child is not null
            //descend and get the min of left tree
            var rc = node.rightChild;
            if (rc) {
                return minNode(rc);
            } else {
                return node.parent;
            }
        }

        if (node && node === node.parent.rightChild) {
            rc = node.rightChild;
            if (rc) {
                return minNode(rc);
            } else {
                var p = node.parent;
                var sp = p ? p.parent : null;
                while (sp && sp.leftChild !== p) {
                    node = p;
                    p = node.parent;
                    sp = p ? p.parent : null;

                }
                return sp;
            }
        }
    }
    /**
     * Return the successor key value pair
     * @param item
     * @return {*}
     */
    this.successor = function (item) {
        var node = this.get(item, this.root);
        var sc = successorNode(node);
        return sc && {key:sc.item, value:sc.value}

    }

    /**
     * Private method to return min node in tree
     * @param m
     * @return {*}
     */
    var minNode = function (m) {
        while (m.leftChild) {
            m = m.leftChild;
        }
        return m;
    }

    /**
     * Public method - find min key
     * @return {*}
     */
    this.min = function () {
        var mNode = minNode(this.root);
        return mNode && {key:mNode.item, value:mNode.value};

    }
    /**
     * Private return max node in tree
     * @param max
     * @return {*}
     */
    var maxNode = function (max) {
        while (max.rightChild) {
            max = max.rightChild;
        }
        return max;
    }
    /**
     * Public return max key
     * @return {*}
     */
    this.max = function () {
        var mNode = maxNode(this.root);
        return mNode && {key:mNode.item, value:mNode.value};

    }

    /**
     * Private method to find predecessor node
     * @param node
     * @return {*}
     */
    var predecessorNode = function (node) {
        //if the node is the right child
        if (node && node === node.parent.rightChild) {
            //go to the left child if left child is not null
            //descend and get the max of left tree
            var lc = node.leftChild;
            if (lc) {
                return maxNode(lc);
            } else {
                return node.parent;
            }
        }
        //if the node is the left child
        if (node && node === node.parent.leftChild) {
            lc = node.leftChild;
            if (lc) {
                return maxNode(rc);
            } else {
                var p = node.parent;
                var sp = p ? p.parent : null;
                while (sp && sp.rightChild !== p) {
                    node = p;
                    p = node.parent;
                    sp = p ? p.parent : null;

                }
                return sp;
            }
        }


    }
    /**
     * Public method to find predecessor key
     * @param key
     * @return {*}
     */
    this.predecessor = function (key) {
        var node = this.get(key, this.root);
        var pNode = predecessorNode(node)
        return pNode && {key:pNode.item, value:pNode.value}
    }


}


BinarySearchTree.prototype.put = function (key, value) {
    if (!this.root) {
        this.root = this.mkNode_(key,value);
        return this
    }

    var cNode = this.root;
    var pNode = null;
    var isLeft = false;
    while (cNode) {
        pNode = cNode;
        if (key < cNode.item) {
            cNode = cNode.leftChild;
            isLeft = true;
        } else {
            cNode = cNode.rightChild;
            isLeft = false;
        }
    }
    //cNode should be null now
    var iNode = this.mkNode_(key, value, pNode);
    pNode[isLeft ? "leftChild" : "rightChild"] = iNode;
    this.reCalcHeight(iNode);
    var tree = this;
    return {
        put:function (key, value) {
            return tree.put(key, value);
        },
        node:iNode

    };
}

BinarySearchTree.prototype.reCalcHeight = function (pNode) {
    while (pNode) {
        pNode.height = Math.max((pNode.leftChild ? pNode.leftChild.height : -1),
            (pNode.rightChild ? pNode.rightChild.height : -1)) + 1;
        pNode = pNode.parent;
    }
};
/**
 * Inorder traversal, apply provided function on each  visited node
 * @param obj
 * @return {*}
 */
BinarySearchTree.prototype.traverse = function (node, fn) {
    var args = Array.prototype.slice.call(arguments);
    if (args.length === 1) {
        if (Object.prototype.toString.call(args[0]) === '[object Function]') {
            console.log('initializing node to root');
            node = this.root;
            fn = args[0];
        } else {
            fn = function (n) {
                console.log(n.item);
            }
        }
    }

    if (!node)return;
    this.traverse(node.leftChild, fn);
    fn(node);
    this.traverse(node.rightChild, fn);

}
/**
 *
 * @param key
 */
BinarySearchTree.prototype.get = function (key, node) {
    var retKV = (typeof node === "undefined");
    if (retKV)node = this.root;
    return recFind(key, node);
    function recFind(key, node) {
        if (!node) return null;
        if (key < node.item) return recFind(key, node.leftChild);
        if (key > node.item) return recFind(key, node.rightChild);
        if (key == node.item)return retKV ? {key:node.item, value:node.value} : node;
    }

}


BinarySearchTree.prototype.delete = function (item) {
    var node = this.get(item, this.root);
    if (node) {
        var num = node.leftChild ? (node.rightChild ? 2 : 1) : (node.rightChild ? 1 : 0);
        switch (num) {
            case 0:
                var p = node.parent;
                if (p) {
                    var lc = p.leftChild === node;
                    p[lc ? "leftChild" : "rightChild"] = null;
                    node = null;
                }
                break;
            case 1:
                //single subtree
                p = node.parent;
                if (p) {
                    lc = p.leftChild === node;
                    var child = node.leftChild || node.rightChild;
                    child.parent = p;
                    p[lc ? "leftChild" : "rightChild"] = child;
                    node = null;
                } else {
                    //root
                    child = node.leftChild || node.rightChild;
                    lc = node.leftChild === child;
                    child.parent = null;
                }
                break;
            case 2:
                var nextL = this.successor(node.item);
                var temp = nextL.key;
                this.delete(nextL.key);
                node.item = temp;
        }


    }

}

BinarySearchTree.prototype.checkInvariants = function (node) {
    if (typeof node === 'undefined') node = this.root;
    if (!node) return;
    var lc = node.leftChild, rc = node.rightChild;
    if (log.DEBUG) {
        console.log(util.format("lc=%s, rc=%s, node=%s",
            lc ? lc.item : "null", rc ? rc.item : "null", node.item))
    }
    var ok = (!lc || lc.item < node.item) &&
        (!rc || rc.item > node.item);

    if (!ok) throw new Error("Invariant check failed at node " + node + " key=" + node.item)
    this.checkInvariants(lc);
    this.checkInvariants(rc);
}

BinarySearchTree.prototype.inspect = function () {
    return util.inspect(this.root, {depth:null, colors:true})
}
/**
 * Export the Type so that new instances can be created
 * @type {Function}
 */
module.exports = BinarySearchTree;
