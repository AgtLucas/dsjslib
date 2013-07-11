This is a collection of data structures, implemented in JavaScript. Its written and tested using
Node.js but the dependencies are mostly peripheral (e.g util for logging and assert module for testing). 
So the code can be used in Browser as well with minor changes.


Binary Search Tree [Map]
------------------------
A map like functionality backed by Binary Search Tree (unbalanced)
```
//create a binary tree
var bst=new BinarySearchTree()

//Insert a key value    //Find by key   //Delete a key
bst.put(key,value),  bst.get(key)  bst.delete(key)

//Predecessor and Successor
bst.predecessor(key)  bst.successor(key) 

//Inorder traversal of the tree. callbackfn called for every node visited
bst.traverse([node],callbackfn) 

//Min and Max - if start node not given, starts at root
bst.min([startAtNode]) bst.max([startAtNode]) 

//Run this to validate the tree. Useful for testing
bst.checkInvariants([startAtNode]) - Validates the tree starting at given node (root otherwise)
```
Known Limitations: Currently only supports Numeric or String keys (uses < > for comparison).

AVL Tree [Map]
--------------------------
Extends BinarySearchTree to provide a Map like functionality backed by a balanced Tree
All functionality of BinarySearchTree is available. 
In addition Tree is height balanced by rotation whenever an insert is done
See rotate(), reBalance() and checkAVLProperty() functions for explanation. 
Caller doesn't need to invoke these functions, they are internally usedd when an insert or delete violates the AVL property of the tree

```
//Create and AVLTree (extends a BinarySearchTree)
var avl=new AVLTree() 

//Insert a key value. It also rebalances the tree
avl.put(key,value)

//Get a value for key
avl.get(key)

// Validates the tree starting at given node (root otherwise). 
// Validates BST as well as AVL proeprties
avl.checkInvariants([startAtNode])
                                     
```
```
//Print the tree starting at root (requires util module from Node.js)
console.log(avl.root)
```
Known Limitations: Delete implementation TBD 



BTree
----------------------
[Ref - Introduction to Algorithms By Coremen et al.]
```
Creates a BTree of degree K .
Any node in the Tree can have a maximum of 2*K-1 keys  and a minimum of K-1 keys.
var btree=new BTree(K) 

//Inserts a key and splits nodes as required
btree.put(key,value)

//Search by key
btree.get(key)

//Deletes a key and re-joins nodes and/or reduces the height of tree as required
btree.delete(key) 
```

Known Limitations: Currently only supports Numeric or String keys (uses < > for natural ordering).
                         

RWayTrie [Map optimized for String keys]
----------------------
[Reference: Algorithms, 4th Edition by Robert Sedgewick and Kevin Wayne]

Data structure supporting String keys, for fast retrieval of values associated with string keys. In comparison
to a (Hash)Map, has additional (fast) functions like list of keys with prefix and listing all keys in sorted order.
For large R the space requirement for this DS is impractical, TernarySearchTrie should be used instead.

```
var rTrie=new RWayTrie(R) - Creates a RWayTrie of alphabet size R . For example if you know that 
the keys are made of ASCII chars only, R=128. Each node in this trie will have an array of size R. 

rTrie.put(key,val) - Inserts a key and set its value as val
rTrie.get(key) - Search for a key and return associated value or null
rTrie.delete(key) - Deletes a key 
rTrie.keyset() - Return a list of all keys in sorted order
```

Known Limitations: None

TernarySearchTrie [Map optimized for String keys]
------------------------------
[Reference: Algorithms, 4th Edition by Robert Sedgewick and Kevin Wayne]

Data structure supporting String keys, for fast retrieval of values associated with string keys BUT have much less
space requirement than RWayTrie. Functions are same as RWayTrie

```
var tst=new TernarySearchTrie() - Creates a TernarySearchTrie
tst.put(key,val) - insert a key value pair into the Trie
tst.get(key) -- Search for key and return associated value or null

```
Known Limitations: Delete and keyset() TBD
