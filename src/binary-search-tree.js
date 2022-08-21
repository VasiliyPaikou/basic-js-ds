const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
	constructor(data) {
    this.data = data //значение узла
    this.left = null//ссылка на левый узел
    this.right = null//ссылка на правый узел
  }
}

class BinarySearchTree {// класс дерева
  constructor() {
    this.rootTree = null//ссылка на корень
  }

	root(){
    if (this.rootTree) {
    return this.rootTree
    }
    return null
  }

  add(data) {// добавление нового узла
    this.rootTree = addWithin(this.rootTree, data)
    //в качестве начального узла в функцию передается корень
    //this.rootTree
    function addWithin(node, data) {
      if (!node) {
        return new Node(data)
      }// далее если this.rootTree = null, то добовляемый узел
      //станет корнем с передаваемым значением data
      // при передвижении по дереву,вправо или влево,
      // когда такого узла не будет(!node), функция добавит новый узел
      if (node.data === data) {
        return node
      }// при передвижении по дереву, когда значение
      // добовляемого узла равно уже существующему узлу,
      // функция вернет этот узел
      if (data < node.data) {//когда значение
        // добовляемого узла меньше некоторого узла,
        // функция сообщает что левый либо правый потомок этого некоторого
        //узла будет равен результату вызова функции addWithin
        node.left = addWithin(node.left, data)
      } else {
        node.right = addWithin(node.right, data)
      }
      return node
      // таким образом функциия постепенно пройдет по дереву
      // и при обнаружении вакантного места
      // добавит на него новый узел
    }
  }

  has(data) {
    //метод и его функция работают аналогично,
    // методу выше, только вместо вставки,
    //реализуется сравнение искомого значения
    //с теми что имеют узлы дерева
    return searchWithin(this.rootTree, data)
    function searchWithin(node, data) {
      if (!node) {
        return false
      }
      if (node.data === data) {
        return true
      }
      return data < node.data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data)
    function removeNode(node, data) {
      if (!node) {
        return null
      }//если узел с указанным значением не найден,
      //возращается null
      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
        // если значение узла меньше указанного, то
        //происходит выполнение функции для левого поддерева 
      } else if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
        // если значение узла больше указанного, то
        //происходит выполнение функции для правого поддерева 
      } else {
        //данное условие отрабатывает если 
        // значение узла равно указанному,
        //что означает что данный узел должен быть удален
        if (!node.left && !node.right) {
          return null
        }// здесь происходит проверка есть ли у удаляемого узла
        // левые и правые потомки, если их нет- функция вернет null
        //таким образом удаляеммый узел станет равен null и затрется
        if (!node.left) {
          node = node.right
          return node
        }// если у удаляемого узла нет левого потомка,
        // то удаляемый узел станет равен своему правому потомку,
        //а сам исчезнет
        if (!node.right) {
          node = node.left
          return node
        }// если у удаляемого узла нет правого потомка,
        // то удаляемый узел станет равен своему левому потомку,
        //а сам исчезнет

        //далее рассматривается ситуация когда у узла,
        //который нужно удалить есть правый и левый потомки,
        //решается это либо поиском наименьшего среди больших,
        //либо большего среди наименьших.

//----------//замена удаляемого узла наименьшим среди больших//----------//
        let minFromRight = node.right// так как большие находятся в правой ветке 
        //переменной присваевается значение корня правого поддерева
        while (minFromRight.left) {
          minFromRight = minFromRight.left//поиск минимального значения в правом поддереве
        }
        node.data = minFromRight.data// присваевание удаляемому узлу значения минимального(т.к.
        // оно взято с правой стороны то вся правая сторона будет больше его, а вся левая автоматически меньше)
        node.right = removeNode(node.right, minFromRight.data)// так как меньший узел мы поставили на место удаляемого
        //теперь надо удалить его из правого дерева
        return node
      }
    }
  }

  min(){
    if (!this.rootTree) {
      return
    }
    let node = this.rootTree 
    while (node.left) {
      node = node.left
    }
    return node.data
  }

  max(){
    if (!this.rootTree) {
      return
    }
    let node = this.rootTree 
    while (node.right) {
      node = node.right
    }
    return node.data
  }



  find(data){
    return findWithin(this.rootTree, data)
    function findWithin(node, data) {
      if (!node) {
        return null
      }
      if (node.data === data) {
        return node
      }
      return data < node.data ?
        findWithin(node.left, data) :
        findWithin(node.right, data);
    }
  }
}

module.exports = {
  BinarySearchTree
};