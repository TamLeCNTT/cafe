import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Modal } from 'react-bootstrap';
import Header from './layout/Header';
import { toast } from 'react-toastify';
import socketClient from 'socket.io-client';
import { Typeahead } from 'react-bootstrap-typeahead';
import productService from '../service/productService';
import oderService from '../service/oderService';
import odersaveService from '../service/odersaveService';
import audio from '../Asset/audios/ring.mp3';
import Print from './support/Print';
import daco from '../Asset/audios/conuoc.mp3';
import { Content } from './support/Content';
const Home = () => {
    const sockets = socketClient('http://192.168.1.39:3001');
    let flag = 1

    const [show, setshow] = useState(false)
    const [name, setname] = useState('')
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(0);
    const [content, setContent] = useState([]);
    const [contents, setContents] = useState([]);
    const [table, settable] = useState('');
    const [list, setlist] = useState([]);
    const [listname, setlistname] = useState([]);
    const [listtt, setlisttt] = useState([]);
    const [listshow, setlistshow] = useState([]);
    const [listoder, setlistoder] = useState([[]]);
    const [sl, setsl] = useState('')
    const [singleSelections, setSingleSelections] = useState([]);
    const [options, setopt] = useState([])
    const [tongtien, settongtien] = useState(0)
    const [tongtiens, settongtiens] = useState(0)
    const [soluongly, setsoluongly] = useState(0)
    const [doanhthu, setdoanhthu] = useState(0)
    const [soluonglycafe, setsoluonglycafe] = useState(0)
    const [doanhthucafe, setdoanhthucafe] = useState(0)
    const [soluonglyseven, setsoluonglyseven] = useState(0)
    const [doanhthuseven, setdoanhthuseven] = useState(0)
    const [soluonglysevens, setsoluonglysevens] = useState(0)
    const [doanhthusevens, setdoanhthusevens] = useState(0)

    let current = new Date()
    let date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
    const users = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    // const playAudio = async (audios) => {
    //     await new Promise((r) => setTimeout(r, 2000));
    //     const au = new Audio(audios);
    //     au.muted = false
    //     au.play().catch((e) => {
    //         console.log(e);
    //     });;
    // }
    useEffect(() => {

        let lst = listoder, ltt = [], listshows = []
        productService.getall().then(
            res => {
                setopt(res.data)
                oderService.getall().then(resw => {
                    console.log(resw.data)
                    let data = []
                    for (let i = 0; i <= 16; i++) {
                        if (i != 0) {
                            data = resw.data.filter(item => item.soban == i).sort((a, b) => a.trangthai - b.trangthai)


                            let tam = { trangthai: data[0] ? data[0].trangthai : 0, mes: data }
                            listshows.push(tam)


                        }
                        else {
                            listshows.push({})
                        }
                    }

                    // doanhthuofday(0)
                    // doanhthuofday(6)
                    // doanhthucafeofday(0)
                    // doanhthucafeofday(6)
                    setlistshow([...listshows])

                }
                )





            }
        )




    }, []);
    const adddata = async (e) => {
        console.log("sjsjs")
        await oderService.add(e).then(
            res => {
                let ms = { ban: table, trangthai: 1, mes: listname }
                sockets.emit('chat messages', ms);
                console.log(res.data)
            }
        )
        return
    }
    useEffect(() => {
        let lst = listoder, ltt = []
        if (lst[0].length == 0 && lst.length < 2) {
            for (let i = 0; i <= 16; i++) {


                let item = {}
                lst[i] = item
                ltt[i] = 0
            }

        }
        else {


            ltt = listtt
        }
        console.log(lst)
        if (flag == 1) {
            let index = -1
            sockets.on('chat messages', (message) => {
                // if (message.trangthai == 1) {
                //     const au = new Audio(audio);
                //     au.muted = false
                //     au.play().catch((e) => {
                //         console.log(e);
                //     });;
                // }
                // if (message.trangthai == 2) {
                //     const au = new Audio(daco);
                //     au.muted = false
                //     au.play().catch((e) => {
                //         console.log(e);
                //     });;
                // }
                // if (message.trangthai == 4) {
                //     // doanhthuofday(date)
                //     // doanhthuofday(0)
                //     // doanhthuofday(6)
                //     // doanhthucafeofday(0)
                //     // doanhthucafeofday(6)
                // }
                console.log(message)
                let listshows = []
                oderService.getall().then(resw => {
                    console.log(resw.data)
                    let data = []
                    for (let i = 0; i <= 16; i++) {
                        if (i != 0) {
                            data = resw.data.filter(item => item.soban == i).sort((a, b) => a.trangthai - b.trangthai)

                            console.log(data)
                            let tam = { trangthai: data[0] ? data[0].trangthai : 0, mes: data }
                            listshows.push(tam)


                        }
                        else {
                            listshows.push({})
                        }
                    }
                    console.log(listshows)
                    setlistshow([...listshows])
                }
                )
            }

            );

            flag = 0


        }

        localStorage.setItem("oder", JSON.stringify(lst))

        setlistoder([...lst])

    }, [message]);
    const findproduct = (id) => {
        let pro = options.filter(item => item.productID == id)

        return pro[0]
    }
    const doanhthucafeofday = (day) => {
        productService.getall().then(
            res => {
                odersaveService.getall(date).then(ress => {
                    var dated = new Date();
                    var last = new Date(dated.getTime() - (day * 24 * 60 * 60 * 1000));
                    let dateofseven = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`
                    let listseven = ress.data.filter(item => new Date(item.ngay) >= new Date(dateofseven) && item.productId <= 5)
                    let doanhthus = listseven.reduce((a, v) => a = a + (v.soluong * res.data[res.data.findIndex(item => item.productID == v.productId)].price), 0)
                    let soluong = listseven.reduce((a, v) => a = a + v.soluong, 0)
                    if (day == 0) {
                        setdoanhthu(doanhthus)
                        setsoluongly(soluong)
                    }
                    if (day == 6) {
                        setdoanhthuseven(doanhthus)
                        setsoluonglyseven(soluong)
                    }

                })






            }
        )
    }
    const doanhthuofday = (day) => {
        productService.getall().then(
            res => {
                odersaveService.getall(date).then(ress => {
                    var dated = new Date();
                    var last = new Date(dated.getTime() - (day * 24 * 60 * 60 * 1000));
                    let dateofseven = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`
                    let listseven = ress.data.filter(item => new Date(item.ngay) >= new Date(dateofseven))
                    let doanhthus = listseven.reduce((a, v) => a = a + (v.soluong * res.data[res.data.findIndex(item => item.productID == v.productId)].price), 0)
                    let soluong = listseven.reduce((a, v) => a = a + v.soluong, 0)
                    if (day == 0) {
                        setdoanhthucafe(doanhthus)
                        setsoluonglycafe(soluong)
                    }
                    if (day == 6) {
                        setdoanhthusevens(doanhthus)
                        setsoluonglysevens(soluong)
                    }

                })






            }
        )
    }
    const Xoaindex = (e) => {
        let tam = listname[e]
        setlistname(listname.filter(item => item.product.productID != tam.product.productID))
    }
    const chonban = (e) => {
        console.log(findproduct(1))
        let list = listoder
        let listDaoder = [], listDaoders = []
        setlistname([])
        oderService.getbyban(e).then(res => {
            console.log(res.data)
            console.log(listshow)
            if (res.data.length > 0) {
                listDaoder = res.data.filter(item => item.trangthai == 1).length > 0 ? res.data.filter(item => item.trangthai == 1) : res.data.filter(item => item.trangthai == 2)
                setContent(listDaoder)
                listDaoders = res.data.filter(item => item.trangthai == 3)
                setContents(listDaoders)
                settongtien(res.data.reduce((a, v) => a = a + (v.soluong * findproduct(v.productId).price), 0))
            }
            else {
                setContent([]
                )
                setContents([])
                settongtien(0)
            }

        })
        // if (list && list[e]) {
        //     setContent(list[e].mes)
        //     let tong = 0
        //     list[e].mes && list[e].mes.map((item, index) => {
        //         tong += item.product.price * item.soluong
        //     })
        //     settongtien(tong)
        //     console.log(list[e])
        // }
        // else {
        //     setContent([])
        // }
        settable(e)
        setshow(true)



    }
    const Bans = (e) => {
        console.log("chay")
        let lists = []
        let text
        for (let i = 0; i < e; i++) {
            let index = listoder.findIndex(item => item.ban == i + 1)

            if (listoder[index] && listoder[index].trangthai == 1)
                text = <div onClick={() => chonban(i + 1)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle actives" >Bàn {i + 1}
                </div>
            else {
                if (listoder[index] && listoder[index].trangthai == 2)
                    text = <div onClick={() => chonban(i + 1)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle haves" >Bàn {i + 1}
                    </div>
                else
                    text = <div onClick={() => chonban(i + 1)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle " >Bàn {i + 1}
                    </div>
            }
            lists.push(text)
        }
        // lists.push(<div onClick={() => chonban(i + 1)} className={listoder[index].trangthai == 1 ? "col-lg-3 col-md-6 col-sm-6 border ban align-middle actives" : "col-lg-3 col-md-6 col-sm-6 border ban align-middle"} >

        //     Bàn {i + 1}
        // </div>)
        return lists
    }
    const handleSubmit = () => {



        let ms = { ban: table, trangthai: 1, mes: listname }
        console.log(listshow)

        let listbyban = []
        // oderService.getbyban(ms.ban).then(
        //     res => {
        // console.log(res.data)
        listbyban = listshow[ms.ban].mes

        console.log(ms.mes)
        let flags = 0;
        ms.mes.map((item, i) => {

            console.log(listbyban, listbyban.length)
            let order = { soban: ms.ban, trangthai: ms.trangthai, soluong: item.soluong, productId: item.product.productID, ngay: date }
            if (listbyban.length == 0) {
                listbyban.push(order)

                console.log(order)
                adddata(order)
            }
            else {
                let vitri = listbyban.findIndex(e => e.productId == item.product.productID)
                if (vitri == -1) {
                    listbyban.push(order)
                    adddata(order)
                }
                else {
                    if (listbyban[vitri].trangthai == 1) {
                        listbyban[vitri].soluong += item.soluong
                        let orders = { soban: ms.ban, trangthai: ms.trangthai, soluong: listbyban[vitri].soluong, productId: item.product.productID, ngay: date }
                        oderService.edit(listbyban[vitri].oderId, orders).then(
                            res => {
                                console.log(res.data)
                                sockets.emit('chat messages', ms);
                            }
                        )
                    }
                    else {
                        listbyban.push(order)
                        adddata(order)
                    }
                }



            }
            // let vitri = li
            // })

            flags = i

        }
        )

        if (flags + 1 == ms.mes.length) {
            let listtest = listshow
            listtest[ms.ban].trangthai = 1
            listtest[ms.ban].mes = listbyban
            setlistshow(listtest)
            setMessage(message + 1)

            // sockets.emit('chat messages', ms);
            setshow(false)

            flag = 1
        }

        // console.log("heee")
        // setname('')
        // setsl('')

    };
    const handleSubmits = () => {
        let flags = 0
        let ms = { ban: table, trangthai: 3, mes: [] }
        // oderService.getbyban(table).then(res => {
        let listoder = listshow[table].mes.filter(e => e.trangthai == 2)
        let listhaveup = listshow[table].mes.filter(e => e.trangthai == 3)
        listoder.map((item, index) => {

            let vitri = listhaveup.findIndex(e => e.productId == item.productId)
            if (vitri == -1) {
                item.trangthai = 3
                oderService.edit(item.oderId, item).then(ress => {
                    console.log(ress.data)
                    sockets.emit('chat messages', ms);
                })
            }
            else {
                listhaveup[vitri].soluong += item.soluong
                oderService.delete(item.oderId).then(res => {


                })
                oderService.edit(listhaveup[vitri].oderId, listhaveup[vitri]).then(ress => {
                    console.log(ress.data)
                    sockets.emit('chat messages', ms);
                })
            }
            flags = index
        })
        if (flags + 1 == listoder.length) {
            setshow(false)
            // sockets.emit('chat messages', ms);
        }

        // })


    };
    const handleSubmites = () => {
        let flags = 0
        let ms = { ban: table, trangthai: 4, mes: [] }
        // oderService.getbyban(table).then(
        //     res => {

        let lisset = listshow
        lisset[table].trangthai = 0
        console.log(lisset)
        setlistshow(lisset)
        listshow[ms.ban].mes.map((item, index) => {

            odersaveService.add(item).then(
                re => {
                    // sockets.emit('chat messages', ms);

                }
            )
            oderService.delete(item.oderId).then(r => {
                console.log(r.data)
                sockets.emit('chat messages', ms);
            })
            let sanpham = findproduct(item.productId)
            if (sanpham.categoryId == 1) {
                sanpham.SoLuong = parseInt(sanpham.SoLuong) - item.soluong
                console.log(sanpham, item)

                productService.edit(item.productId, sanpham).then(
                    res => {
                        console.log(res.data)
                        sockets.emit('chat messages', ms);
                    }
                )
            }
            flags = index
        })

        if (flags + 1 == listshow[ms.ban].mes.length) {

            setshow(false)
            // sockets.emit('chat messages', ms);
        }

        //     }
        // )


    };
    const handleSubmithaves = () => {
        let flags = 0
        let ms = { ban: table, trangthai: 2, mes: [] }
        // oderService.getbyban(table).then(res => {
        let listoder = listshow[ms.ban].mes.filter(e => e.trangthai == 1)
        let listhaveup = listshow[ms.ban].mes.filter(e => e.trangthai == 2)
        listoder.map((item, index) => {

            let vitri = listhaveup.findIndex(e => e.productId == item.productId)
            if (vitri == -1) {
                item.trangthai = 2
                oderService.edit(item.oderId, item).then(ress => {
                    console.log(ress.data)
                    sockets.emit('chat messages', ms);
                })
            }
            else {
                listhaveup[vitri].soluong += item.soluong
                oderService.delete(item.oderId).then(res => {


                })
                oderService.edit(listhaveup[vitri].oderId, listhaveup[vitri]).then(ress => {
                    console.log(ress.data)
                    sockets.emit('chat messages', ms);
                })
            }
            flags = index
        })
        console.log(ms)
        if (flags + 1 == listoder.length) {
            setshow(false)
            // sockets.emit('chat messages', ms);
        }
        // })


    };

    const changeSL = (e) => {
        setsl(e.target.value)
    }
    const changeProduct = (e) => {
        let listnames = listname
        let index = listnames.findIndex(item => item.product.productID == e[0].productID)
        console.log(index)
        if (index == -1) {
            let product = { product: e[0], soluong: 1 }
            listnames.push(product)
        }
        else
            listnames[index].soluong += 1
        console.log(listnames)
        setlistname([...listnames])
        let tong = 0
        listnames.map((item, index) => {
            tong += item.product.price * item.soluong
        })
        settongtiens(tong)




    }
    return (
        <>
            <Header />
            <main className='mains'>


                <section id="about" className="about">


                    <div className="container" data-aos="fade-up">
                        <Print />
                        {/* {
                        users && users.roleId == 1 && (<>
                            <h1 style={{ color: "blue" }}>Thống kê số lượng bán ra và doanh thu của quán</h1>
                            <div className="row">


                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2 card bg-primary text-white shadow">
                                        <div className="card-body ">
                                            <div className="row no-gutters align-items-center">

                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold  text-uppercase mb-1">
                                                        <br />
                                                        Số lượng ly hôm nay</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800"> {soluonglycafe} ly</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-md-6 mb-4">

                                    <div className="card border-left-success shadow h-100 py-2 card bg-warning text-white shadow">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                        <br />
                                                        Doanh thu hôm nay</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{doanhthucafe.toLocaleString()} VNĐ</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2 bg-primary text-white shadow">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                        <br />
                                                        Số lượng đơn 7 ngày</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800"> {soluonglysevens} ly</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2 card bg-warning text-white shadow">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                        <br />
                                                        Doanh thu 7 ngày</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800"> {doanhthusevens.toLocaleString()}VNĐ</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 style={{ color: "blue" }}>Thống kê số lượng bán ra và doanh thu của CAFE</h1>
                            <div className="row">


                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2 card bg-primary text-white shadow">
                                        <div className="card-body ">
                                            <div className="row no-gutters align-items-center">

                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold  text-uppercase mb-1">
                                                        <br />
                                                        Số lượng ly hôm nay</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800"> {soluongly} ly</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-md-6 mb-4">

                                    <div className="card border-left-success shadow h-100 py-2 card bg-warning text-white shadow">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                        <br />
                                                        Doanh thu hôm nay</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{doanhthu.toLocaleString()} VNĐ</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2 bg-primary text-white shadow">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                        <br />
                                                        Số lượng đơn 7 ngày</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800"> {soluonglyseven} ly</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2 card bg-warning text-white shadow">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold   text-uppercase mb-1">
                                                        <br />
                                                        Doanh thu 7 ngày</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800"> {doanhthuseven.toLocaleString()}VNĐ</div>
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </>


                        )
                    } */}

                        <div class="row border">
                            {

                                listshow.map((item, index) => {
                                    return (
                                        <>
                                            {
                                                index != 0 && (
                                                    item.trangthai ? <>

                                                        {
                                                            item.trangthai == 1 ?
                                                                <div onClick={(e) => chonban(index)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle actives" >Bàn {index}
                                                                </div>
                                                                :
                                                                item.trangthai == 2 ?
                                                                    <div onClick={(e) => chonban(index)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle haves" >Bàn {index}
                                                                    </div> :
                                                                    item.trangthai == 3 ?
                                                                        <div onClick={(e) => chonban(index)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle ups" >Bàn {index}
                                                                        </div> :
                                                                        <div onClick={(e) => chonban(index)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle " >Bàn {index}
                                                                        </div>
                                                        }
                                                    </>
                                                        :
                                                        <div onClick={(e) => chonban(index)} className="col-lg-3 col-md-6 col-sm-6 border ban align-middle " >Bàn {index}
                                                        </div>
                                                )

                                            }
                                        </>
                                    )
                                })
                                // Bans(16)
                            }

                        </div>

                        <Modal
                            show={show}
                            size="lg"
                            onHide={() => setshow(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton style={{ backgroundColor: "antiquewhite" }}>
                                <Modal.Title id="example-custom-modal-styling-title" >
                                    <h3 className="text-center">Bàn {table}</h3>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <h1>Chọn món oder </h1>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    onChange={(e) => changeProduct(e)}
                                    options={options}
                                    placeholder="Chọn đồ uống..."
                                    selected={singleSelections}
                                />

                                {
                                    listname && listname.length > 0 && (
                                        <div className='row'>
                                            <h1>Đang oder </h1>
                                            <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                Tên đồ uống

                                            </div>
                                            <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                Giá

                                            </div>
                                            <div className='col col-lg-1     border' style={{ textAlign: "center" }}>
                                                Số lượng

                                            </div>
                                            <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                Thành tiền

                                            </div>
                                            <div className='col col-lg-2 border' style={{ textAlign: "center" }}>


                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    listname && listname.length > 0 && listname.map((item, index) => {
                                        return (
                                            <>
                                                <div className='row'>

                                                    <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                        {item.product.name}

                                                    </div>
                                                    <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                        {item.product.price}

                                                    </div>
                                                    <div className='col col-lg-1 border' style={{ textAlign: "center" }}>
                                                        {item.soluong}

                                                    </div>
                                                    <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                        {item.product.price * item.soluong}

                                                    </div>
                                                    <div onClick={() => Xoaindex(index)} className='col col-lg-2 border' style={{ textAlign: "center" }}>
                                                        xóa

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                {
                                    listname && listname.length > 0 && (
                                        <>
                                            <div className='row'>

                                                <div className='col col-lg-4 border' style={{ textAlign: "center", fontWeight: "bolder" }}>
                                                    Tổng tiền

                                                </div>
                                                <div className='col col-lg-8 border' style={{ textAlign: "center", fontWeight: "bolder" }}>
                                                    {tongtiens}

                                                </div>
                                            </div>
                                        </>
                                    )
                                }

                                {
                                    content && content.length > 0 && (

                                        <div className='row'>
                                            <h1>Đã oder </h1>
                                            <h3>Chưa lên nước </h3>
                                            <div className='col col-lg-4 border' style={{ textAlign: "center" }}>
                                                Tên đồ uống

                                            </div>
                                            <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                Giá

                                            </div>
                                            <div className='col col-lg-2     border' style={{ textAlign: "center" }}>
                                                Số lượng

                                            </div>
                                            <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                Thành tiền

                                            </div>
                                        </div>
                                    )
                                }

                                {

                                    content && content.length > 0 && content.map((item, index) => {
                                        return (
                                            <>

                                                <div className='row'>

                                                    <div className='col col-lg-4 border' style={{ textAlign: "center" }}>
                                                        {findproduct(item.productId).name}

                                                    </div>
                                                    <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                        {findproduct(item.productId).price}

                                                    </div>
                                                    <div className='col col-lg-2 border' style={{ textAlign: "center" }}>
                                                        {item.soluong}

                                                    </div>
                                                    <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                        {findproduct(item.productId).price * item.soluong}

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })


                                }
                                {
                                    contents && contents.length > 0 && (
                                        <div className='row'>
                                            <h3>Đã lên nước </h3>
                                            <div className='col col-lg-4 border' style={{ textAlign: "center" }}>
                                                Tên đồ uống

                                            </div>
                                            <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                Giá

                                            </div>
                                            <div className='col col-lg-2     border' style={{ textAlign: "center" }}>
                                                Số lượng

                                            </div>
                                            <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                Thành tiền

                                            </div>
                                        </div>
                                    )
                                }

                                {

                                    contents && contents.length > 0 && contents.map((item, index) => {
                                        return (
                                            <>

                                                <div className='row'>

                                                    <div className='col col-lg-4 border' style={{ textAlign: "center" }}>
                                                        {findproduct(item.productId).name}

                                                    </div>
                                                    <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                        {findproduct(item.productId).price}

                                                    </div>
                                                    <div className='col col-lg-2 border' style={{ textAlign: "center" }}>
                                                        {item.soluong}

                                                    </div>
                                                    <div className='col col-lg-3 border' style={{ textAlign: "center" }}>
                                                        {findproduct(item.productId).price * item.soluong}

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })


                                }
                                {
                                    tongtien > 0 && (

                                        <div className='row'>

                                            <div className='col col-lg-4 border' style={{ textAlign: "center", fontWeight: "bolder" }}>
                                                Tổng tiền

                                            </div>
                                            <div className='col col-lg-8 border' style={{ textAlign: "center", fontWeight: "bolder" }}>
                                                {tongtien}

                                            </div>
                                        </div>

                                    )
                                }

                                <div className='row'>
                                    <div className='col col-lg-6'>
                                        {listshow[table] && listshow[table].trangthai == 2 && (

                                            <button className='btn btn-danger ' onClick={() => handleSubmits()}>Đã lên nước</button>



                                        )

                                        }
                                        {contents && contents.length > 0 && listshow[table] && listshow[table].trangthai == 3 && (

                                            <Print content={contents} id={ table} />
                                            // <button className='btn btn-danger ' onClick={() => handleSubmites()}>Đã thanh toán</button>



                                        )

                                        }
                                        {listshow[table] && listshow[table].trangthai == 1 && (

                                            <button className='btn btn-danger ' onClick={() => handleSubmithaves()}>Đã có nước</button>



                                        )
                                        }
                                    </div>
                                    {
                                        listname && listname.length > 0 && (
                                            <div className='col col-lg-6' style={{ textAlign: "right" }}>
                                                <button className="btn btn-primary" onClick={() => handleSubmit()}>Oder</button>
                                            </div>
                                        )
                                    }

                                </div>

                            </Modal.Body>
                        </Modal>
                    </div >
                    <Content content={contents} />
                </section >
            </main >

        </>
    );
}

export default Home;