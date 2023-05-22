export default function Orders(props) {

    const [orders, setOrders] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false)
    const [currentOrder, setCurrentOrder] = useState()
    const [searchValue, setSearchValue] = useState(0)
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');
    const [customerID, setCustomerID] = useState('');

    // eslint-disable-next-line
    const [customers, setCustomers] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const { RangePicker } = DatePicker;
    const { Option } = Select;

    const onChange = page => {
        setCurrent(page)
    }

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }

    const viewOrder = order => {
        setCurrentOrder(order)
        var price = 0
        order.items.forEach(element => {
            price += (element.price * element.quantity)
        })
        setTotalPrice(price)
        handleShow()
    }

    const setTime = time => {
        if (time !== null) {
            setStartTime(time[0].format('YYYYMMDD HH:mm:ss'))
            setEndTime(time[1].format('YYYYMMDD HH:mm:ss'))
        }
    }

    function onSearch(v) {
        setSearchValue(1)
        if (status === '' || customerID === '') {
            message.info('Please enter Status and Customer')
            setSearchValue(0)
            axios.get('/api/pri/order/all', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setOrders(res.data.data)
                setTotal(res.data.data.length)
            })
        } else {
            axios.post('/api/pri/order/search', {
                customerID: customerID,
                createTime: startTime,
                createTime1: endTime,
                status: status,
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setOrders(res.data.data)
            })
        }
    }

    function clear() {
        axios.get('/api/pri/order/all', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setOrders(res.data.data)
            setTotal(res.data.data.length)
        })

        if (props.type === 'CustomerService') {
            axios.post('/api/pri/staff/all_customer?pages=' + 1 + '&size=10', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setCustomers(res.data.data.records)
            })
        } else {
            axios.get('/api/pri/staff/page_customer?pages=' + 1 + '&size=10', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setCustomers(res.data.data.records)
            })
        }
        setSearchValue(0)
    }

    useEffect(() => {
        axios.get('/api/pri/order/all', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setOrders(res.data.data)
            setTotal(res.data.data.length)
        })

        if (props.type === 'CustomerService') {
            axios.post('/api/pri/staff/all_customer?pages=' + 1 + '&size=10', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setCustomers(res.data.data.records)
            })
        } else {
            axios.get('/api/pri/staff/page_customer?pages=' + 1 + '&size=10', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                setCustomers(res.data.data.records)
            })
        }
    }, [props.type])

    return (
        <div>
            <Breadcrumb className="block">
                <Breadcrumb.Item>
                    {order_icon}
                    <span style={{ marginLeft: "3vh" }}>Orders</span></Breadcrumb.Item>
            </Breadcrumb>

            <Jumbotron className="block" style={{ background: "white" }}>
                <Select
                    style={{ width: '20vw', marginBottom: '5vh' }}
                    placeholder="Select a Status"
                    onChange={e => setStatus(e)}
                >
                    <Option value="Pending">Pending</Option>
                    <Option value="Processed">Processed</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Fulfilled">Fulfilled</Option>
                </Select>

                <RangePicker
                    onChange={e => setTime(e)}
                />

                <Select
                    showSearch
                    onChange={e => setCustomerID(e)}
                    style={{ width: '20vw', marginBottom: '5vh' }}
                    placeholder="Search Customer"
                    optionFilterProp="children"
                >
                    {customers.map((option, index) => (
                        <Option value={option.customerID} key={'customer' + index}>{option.firstName} {option.surname}</Option>
                    ))}
                </Select>

                <Button size='small' onClick={onSearch} >Search</Button>
                <Button size='small' onClick={clear} >Clear All</Button>

                {(searchValue !== 0) ? <><>{<h1>Search Results: </h1>} </></> : <></>}

                <Row className="info">
                    <Col span={2}>ID</Col>
                    <Col span={5}>Creat date</Col>
                    <Col span={6}>Complete date</Col>
                    <Col span={4}>Status</Col>
                    <Col span={5}>
                    </Col>
                </Row>

                {orders.map((order, index) => (
                    <Row className="info" key={'order' + index}>
                        <Divider orientation="left" />
                        <Col span={2}>{order.orderID}</Col>
                        <Col span={5}>{order.createTime}</Col>
                        <Col span={6}>{order.completeTime}</Col>
                        <Col span={4}>{order.status}</Col>
                        <Col span={5}>
                            <Button size='small' onClick={() => viewOrder(order)}>View Order</Button>
                        </Col>
                    </Row>
                ))}

                <Divider orientation="left" />
                {(searchValue !== 0) ? <><>{<Pagination size='small'
                    defaultCurrent={1}
                    current={current}
                    onChange={onChange}
                    total={total} pageSize={5}
                    showSizeChanger={false} />} </></> : <></>}
            </Jumbotron>

            <Modal show={show} style={{ 'marginTop': '10vh' }} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Order Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form layout='horizontal' size='small'>
                        <Form.Item label='Order ID' >
                            {(currentOrder) ? <><>{currentOrder.orderID} </></> : <></>}
                        </Form.Item>

                        <Form.Item label='Customer ID'>
                            {(currentOrder) ? <><>{currentOrder.customerID} </></> : <></>}
                        </Form.Item>

                        <Form.Item label='Creat date'>
                            {(currentOrder) ? <><>{currentOrder.createTime} </></> : <></>}
                        </Form.Item>

                        <Form.Item label='Complete date'>
                            {(currentOrder) ? <><>{currentOrder.completeTime} </></> : <></>}
                        </Form.Item>

                        <Form.Item label='Status'>
                            {(currentOrder) ? <><>{currentOrder.status} </></> : <></>}
                        </Form.Item>

                        <Divider orientation="left" >Item</Divider>
                        <Form.Item >
                            <Row gutter={50}>
                                <Col span={8}>
                                    Item Name
                                </Col>

                                <Col span={8}>
                                    Single Price
                                </Col >

                                <Col span={8}>
                                    Quantity
                                </Col>
                            </Row>
                            {(currentOrder) ? <><>{currentOrder.items.map((item, index) => (
                                <Row key={'item' + index} gutter={50} style={{ marginTop: '3vh' }}>
                                    <Col span={8}>
                                        {item.name}
                                    </Col>

                                    <Col span={8}>
                                        {item.price}
                                    </Col >

                                    <Col span={8}>
                                        {item.quantity}
                                    </Col>
                                </Row>
                            ))}
                                <Row style={{ float: 'right' }}>
                                    total price: {totalPrice}
                                </Row> </></> : <></>}
                        </Form.Item>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}