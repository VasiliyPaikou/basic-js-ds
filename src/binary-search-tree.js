const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor(value) {
    this.value = value //значение узла
    this.left = null//ссылка на левый узел
    this.right = null//ссылка на правый узел
  }
}
class BinarySearchTree {// класс дерева
  constructor() {
    this.root = null//ссылка на корень
  }

	root(){
    if (this.root) {
    return this.root
    }
    return null
  }

  add(value) {// добавление нового узла
    this.root = addWithin(this.root, value)
    //в качестве начального узла в функцию передается корень
    //this.root
    function addWithin(node, value) {
      if (!node) {
        return new Node(value)
      }// далее если this.root = null, то добовляемый узел
      //станет корнем с передаваемым значением value
      // при передвижении по дереву,вправо или влево,
      // когда такого узла не будет(!node), функция добавит новый узел
      if (node.value === value) {
        return node
      }// при передвижении по дереву, когда значение
      // добовляемого узла равно уже существующему узлу,
      // функция вернет этот узел
      if (value < node.value) {//когда значение
        // добовляемого узла меньше некоторого узла,
        // функция сообщает что левый либо правый потомок этого некоторого
        //узла будет равен результату вызова функции addWithin
        node.left = addWithin(node.left, value)
      } else {
        node.right = addWithin(node.right, value)
      }
      return node
      // таким образом функциия постепенно пройдет по дереву
      // и при обнаружении вакантного места
      // добавит на него новый узел
    }
  }

  has(value) {
    //метод и его функция работают аналогично,
    // методу выше, только вместо вставки,
    //реализуется сравнение искомого значения
    //с теми что имеют узлы дерева
    return searchWithin(this.root, value)
    function searchWithin(node, value) {
      if (!node) {
        return false
      }
      if (node.value === value) {
        return true
      }
      return value < node.value ?
        searchWithin(node.left, value) :
        searchWithin(node.right, value);
    }
  }

  remove(value) {
    this.root = removeNode(this.root, value)
    function removeNode(node, value) {
      if (!node) {
        return null
      }//если узел с указанным значением не найден,
      //возращается null
      if (value < node.value) {
        node.left = removeNode(node.left, value)
        return node
        // если значение узла меньше указанного, то
        //происходит выполнение функции для левого поддерева 
      } else if (value > node.value) {
        node.right = removeNode(node.right, value)
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
        node.value = minFromRight.value// присваевание удаляемому узлу значения минимального(т.к.
        // оно взято с правой стороны то вся правая сторона будет больше его, а вся левая автоматически меньше)
        node.right = removeNode(node.right, minFromRight.value)// так как меньший узел мы поставили на место удаляемого
        //теперь надо удалить его из правого дерева
        return node
      }
    }
  }

  min(){
    if (!this.root) {
      return
    }
    let node = this.root 
    while (node.left) {
      node = node.left
    }
    return node.value
  }

  max(){
    if (!this.root) {
      return
    }
    let node = this.root 
    while (node.right) {
      node = node.right
    }
    return node.value
  }



  find(value){
    return findWithin(this.root, value)
    function findWithin(node, value) {
      if (!node) {
        return null
      }
      if (node.value === value) {
        return node
      }
      return value < node.value ?
        findWithin(node.left, value) :
        findWithin(node.right, value);
    }
  }
}

module.exports = {
  BinarySearchTree
};