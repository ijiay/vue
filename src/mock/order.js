/**
 * Created by chenjialin on 2017/2/16.
 */

export default [
    {
        id: '1',
        name: '红海华谊有限公司',
        orderStatus : '待付款',
        orderNumber: '1111111',
        goodsList: [
            {id: '1-1', name: '香港虎标苦荞茶原味', size: '7g * 1/袋', price: '5.50', minBuyNum: 1, maxBuyNum: 100, currentNum: 10},
            {id: '1-2', name: '雀巢咖啡啊啊啊啊啊哦哦哦哦哦', size: '7g * 1/袋', price: '15.50', minBuyNum: 1, maxBuyNum: 100}
        ],
        marks: [
            {text: '去付款', color: '#fff', borderColor: '#12c8b9', bgColor: '#12c8b9'},
            {text: '取消订单', color: '#424242', borderColor: '#424242', bgColor: '#fff'}
        ]
    },
    {
        id: '2',
        name: '红海兴业有限公司',
        orderStatus : '已完成',
        orderNumber: '2222222',
        goodsList: [
            {id: '2-1', name: '正宗东北大米', size: '50Kg * 1/袋', price: '245.50', minBuyNum: 1, maxBuyNum: 100, currentNum: 10},
            {id: '2-2', name: '速溶姜茶', size: '7g * 1/袋', price: '15.50', minBuyNum: 1, maxBuyNum: 100}
        ],
        marks: [
            {text: '再次购买', color: '#12c8b9', borderColor: '#12c8b9', bgColor: '#fff'},
            {text: '删除订单', color: '#424242', borderColor: '#424242', bgColor: '#fff'}
        ]
    },
    {
        id: '3',
        name: '便利店有限公司',
        orderStatus : '待收货',
        orderNumber: '3333333',
        goodsList: [
            {id: '3-1', name: '正宗东北大米', size: '50Kg * 1/袋', price: '245.50', minBuyNum: 1, maxBuyNum: 100, currentNum: 10},
            {id: '3-2', name: '速溶姜茶', size: '7g * 1/袋', price: '15.50', minBuyNum: 1, maxBuyNum: 100}
        ],
        marks: [
            {text: '确认收货', color: '#12c8b9', borderColor: '#12c8b9', bgColor: '#fff'},
            {text: '联系卖家', color: '#424242', borderColor: '#424242', bgColor: '#fff'}
        ]
    },
    {
        id: '4',
        name: '便利店有限公司',
        orderStatus : '待发货',
        orderNumber: '4444444',
        goodsList: [
            {id: '4-1', name: '正宗东北大米', size: '50Kg * 1/袋', price: '245.50', minBuyNum: 1, maxBuyNum: 100, currentNum: 10},
            {id: '4-2', name: '速溶姜茶', size: '7g * 1/袋', price: '15.50', minBuyNum: 1, maxBuyNum: 100}
        ],
        marks: [
            {text: '确认收货', color: '#12c8b9', borderColor: '#12c8b9', bgColor: '#fff'},
            {text: '联系卖家', color: '#424242', borderColor: '#424242', bgColor: '#fff'}
        ]
    },
    {
        id: '5',
        name: '便利店有限公司',
        orderStatus : '已取消',
        orderNumber: '5555555',
        goodsList: [
            {id: '5-1', name: '正宗东北大米', size: '50Kg * 1/袋', price: '245.50', minBuyNum: 1, maxBuyNum: 100, currentNum: 10},
            {id: '5-2', name: '速溶姜茶', size: '7g * 1/袋', price: '15.50', minBuyNum: 1, maxBuyNum: 100}
        ],
        marks: [
            {text: '再次购买', color: '#12c8b9', borderColor: '#12c8b9', bgColor: '#fff'}
        ]
    }
]
