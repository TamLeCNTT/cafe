// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
import React, { useRef,useEffect,useState } from 'react';
import logo from '../../Asset/img/logo.png'
import './content.scss'

export const Content = React.forwardRef((props, ref) => {
const [data,setdata]=useState([])
     
    useEffect(() => {
    setdata(props.content)
},[props.content])
   
    return (
        <div ref={ref} id='hoadon'>
              <div id="page" class="page">
            <div class="header-page">
                    <img src={logo} className='img-logo' />
                    <div class="company">
                        <span className='header-title'>
                        Quán cafe công đoàn Hưng Thịnh
                        </span>
                        <span className='address'>
                            ĐC: 41-43 Đường số 12, Khu dân cư 5A
                            <br></br>
                            ĐT: 0845388889
                        </span></div>
            </div>
          <br/>
          <div class="title">
                HÓA ĐƠN THANH TOÁN
                <br/>
                -------oOo-------
          </div>
          <br/>
          <br/>
          <table class="TableData">
            <tr>
             
                <th>Mặt hàng</th>
            <th>Số lượng</th>
              <th>Đơn giá</th>
            
              <th>Thành tiền</th>
                    </tr>
                    
                   
                        {
                         data&&  data.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.productId}</td>
                                        <td>
                                            {item.soluong}
                                        </td>
                                        <td>30000</td>
                                        <td> {item.soluong *30000}</td>
                                    </tr>
                                    
                                )
                            })
                    }
                     <tr>
              <td colspan="3" class="tong">Tổng cộng</td>
              <td class="cotSo">12222</td>
            </tr>
          </table>
          <div class="footer-left"> Cần thơ, ngày 16 tháng 12 năm 2014<br/>
            Khách hàng </div>
          <div class="footer-right"> Cần thơ, ngày 16 tháng 12 năm 2014<br/>
            Nhân viên </div>
        </div>
        </div>
    );
});