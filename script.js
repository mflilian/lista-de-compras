console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('             Mayhhara Morais         ')
console.log('--------------------------------------')


//vamos instanciar, o nosso banco de dados
const db = require('./database')

const { produtos } = db
//verificar se veio
// console.table(produtos)
// Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior). Utilize a lista contida no arquivo database.js

produtos.sort((a, b) => a.preco - b.preco)

//console.table(produtos);

const read = require('readline-sync')

const carrinho = []
//Busca por categoria.
// para isso precisamos pedir ao usuario que digite se quer ou nao encontrar
// por categoria e se sim informar a categoriar para entrão filtrar
const verProdutos = read.question('Voce deseja encontrar o produto por categoria? (S / N) :')
if (verProdutos.toUpperCase() === 'S') {
    console.log('--------------------------------------')
    console.log('Essas são as nossas categorias:')
    console.log('Alimento, Bebida, Casa, Higiene, Informática')
    console.log('--------------------------------------')

    const qualCategoria = read.question('Voce esta procurando produtos de qual categoria? ')

    //vamos filtrar a categoria desejada
    const categorias = produtos.filter(item => item.categoria === qualCategoria)

    console.table(categorias);
} else { (verProdutos.toUpperCase() !== 'S')
    console.log('Esses são nossos produtos disponiveis!')
    console.table(produtos)
}


console.log('--------------------------------------')


//Calcular o valor do subtotal (sem considerar o desconto)

//sutotal podem usar metodo recude

const array = new Array()

class Pedido{
    constructor(array){
        this.products = array //se existir ID as propriedades vem pra ca
        this.subtotal = 0
        this.valortotal = 0
        this.totalItens = 0
    }
}
const shopping = () => {

    productId = parseInt(read.question('Digite o id do produto desejado: '))

    //validando o Id
    for (i = 0; i < 1000; i++) {
        findingId = produtos.find(item => item.id === productId)
        if (findingId) {
            break;
        } else {
            productId = parseInt(read.question('Id não encontrado, tente novamente: '))
        }
    }

    qtdItems = parseInt(read.question('Digite a quantidade de produtos que deseja comprar: '))

    //validando a quantidade
    for (i = 0; i < 1000; i++) {
        if (qtdItems > 0) {
            break;
        } else {
            qtdItems = parseInt(read.question('Digite uma quantidade válida: '))
        }
    }

    //adicionando os produtos
    const produtosCarrinho = { ...findingId, quantidade: qtdItems}
    carrinho.push(produtosCarrinho)

    //validação para continuar comprando - checa se o usuário possue cupom e o valor -
    const continueComprando = read.question('Deseja inserir mais algum produto no carrinho? (Digite S ou N): ')
    const continueComprandoFormat = continueComprando.toLowerCase()

    if (continueComprandoFormat === 'n') {
        cupomCheck = read.question('Você possue cupom de desconto: (S/N)').toLowerCase(); {
            if (cupomCheck === 's'){
                cupom = parseInt(read.question('Digite o valor do seu cupom de desconto: '))
            }
        }
    } else {
        shopping()
    }

    //validando o cupom
    for (i = 0; i < 1000; i++) {
        if (cupom > 15 || cupom < 0) {
            cupom = parseInt(read.question('Lamento, cupom inválido! Tente novamente: '))
        } else {
            break;
        }
    }
}

shopping()

class Order {
    constructor(carrinho){
      this.newProducts = carrinho
      this.subtotal = 0
    }
    calcSubtotal() {
      this.subtotal = this.newProducts.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0)
    }

  }


const order = new Order (carrinho)
console.table(order.newProducts)

//calculando o subtotal
order.calcSubtotal()
console.log(`Valor do pedido: R$ ${order.subtotal.toFixed(2)}.`)

//calculando o desconto
const discount = order.subtotal * (cupom / 100)
console.log(`Valor do desconto: R$ ${discount.toFixed(2)}.`)

//calculando o total com desconto do cupom
const total = order.subtotal - discount
console.log(`Valor total do pedido R$ ${total.toFixed(2)}`)

console.log('Obrigada por comprar conosco :) ')

console.log('------------------------------------')
