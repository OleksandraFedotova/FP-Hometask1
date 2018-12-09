const orders = [
    { name: 'TV', price: 300, date: '2018-10-10' },
    { name: 'TV', price: 600, date: '2018-10-10' },
    { name: 'laptop', price: 600, date: '2018-10-12' },
    { name: 'PC', price: 800, date: '2018-09-05' },
    { name: 'owen', price: 300 },
    { name: 'Camera', price: 500, date: '2018-03-03' },
    { name: 'Fridge', price: 1000, date: '2018-12-11' },
    { name: 'table', price: 150, date: '2018-12-10' },
    { name: 'Sofa', price: 400, date: '2018-12-08' },
    { name: 'chair', date: '2018-09-10' },
    { name: 'Window', price: 300, date: '2018-05-05' }
];

function runTransform() {
    const builder = reportBuilder(createColumns, textNodeCreator, createAndAppendLi(getList()), displayHeaders);
    builder(orders);
}

const mapper = x => ({
    name: _.upperFirst(x.name),
    price: "$" + x.price,
    date: x.date
})

const reportBuilder = (createColumns, textNodeCreator, nodePrinter, displayHeaders) => orders => {
    const [validOrders, invalidOrders] =
        _.partition(order => order.name && order.price && order.date, orders);

    _.flow(
        _.map(mapper),
        _.groupBy('date'),
        transformColumnValue,
        printValidOrders(createColumns()))(validOrders);

    printInvalidOrders(textNodeCreator, nodePrinter)(invalidOrders);
    displayHeaders();
}


const transformColumnValue = keyValue => {
    var data = Object.entries(keyValue).map(([key, value]) => ([key, arrayToString(value)]));
    return data;
}

const arrayToString = array => {
    var a = _.flow(
        _.map(item => `${item.name} - ${item.price}\n`),
        _.join(' </br> ')
    )(array);
    return a;
}

//////////////// PrintTable ////////////////////////////

const getList = () => document.getElementById('invalidOrders');
const liCreator = () => document.createElement('li');
const textNodeCreator = document.createTextNode.bind(document);

const createColumns = () => {
    const validOrdersTable = document.getElementById("validOrders");

    const columnHeader = validOrdersTable.createTHead().insertRow(0);
    const columnRow = validOrdersTable.insertRow(1);
    return { columnHeader, columnRow };
}

const printValidOrders = ({ columnHeader, columnRow }) =>
    _.each((data, index) => {
        columnHeader.insertCell(index).innerHTML = data[0];
        columnRow.insertCell(index).innerHTML = data[1]
    })

const printInvalidOrders = (textNodeCreator, printNode) =>
    _.flow(
        createTextNodes(textNodeCreator),
        printNode
    );

const createTextNodes = textNodeCreator => _.map(order =>
    textNodeCreator(`${order.name ? `Name: ${order.name}` : ''}${order.price ? ` | Price: ${order.price}` : ''}${order.date ? ` | Date: ${order.date}` : ''} `)
);

const createAndAppendLi = ul => _.each(node => {
    const li = liCreator();
    li.appendChild(node);
    ul.appendChild(li);
});

const displayHeaders = () => {
    var tableHeader1 = document.getElementById('header1');
    var tableHeader2 = document.getElementById('header2');
    tableHeader1.className = 'visible';
    tableHeader2.className = 'visible';
}


