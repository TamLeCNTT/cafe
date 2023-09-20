// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
import React, { useRef, useEffect, useState } from "react";
import logo from "../../Asset/img/logo.png";
import "./content.scss";

export const Content = React.forwardRef((props, ref) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(props.content);
  }, [props.content]);

  return (
    <div ref={ref} id="hoadon">
      <div class="container">
        <div class="header">
          <div class="img-logo">
            <img src={logo} />
          </div>
          <div class="company">
            <span className="header-title">Cafe công đoàn Hưng Thịnh</span>
            <span className="address">
              <span>ĐC: 41-43 Đường số 12, Khu dân cư 5A</span>
              <span>ĐT: 0845388889</span>
            </span>
          </div>
        </div>
        <br />
        <div class="title">
          HÓA ĐƠN THANH TOÁN
          <br />
          -------oOo-------
        </div>
        {/* <table class="TableData">
            <tr>
             
                <th>Mặt hàng</th>
            <th>Số lượng</th>
              <th>Đơn giá</th>
            
              <th>Thành tiền</th>
                    {/* </tr>
                    
                   
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
                     <tr> }
                    
              <td colspan="3" class="tong">Tổng cộng</td>
              <td class="cotSo">12222</td>
            </tr>
          </table> */}

        {/* Feature Bill
            Thanh That
         */}
        <table class="bill-table">
          <tr>
            <th>Sản phẩm</th>
            <th>Giá (VNĐ)</th>
            <th>Số lượng</th>
            <th>Tổng (VNĐ)</th>
          </tr>
          <tr>
            <td>Cà phê đen</td>
            <td>25,000</td>
            <td>2</td>
            <td>50,000</td>
          </tr>
          <tr>
            <td>Bánh mì nướng</td>
            <td>15,000</td>
            <td>3</td>
            <td>45,000</td>
          </tr>
          <tr>
            <td colspan="3">Tổng cộng</td>
            <td>95,000</td>
          </tr>
        </table>
        <footer className="footer">
          <div class="footer-left">
            {" "}
            Cần thơ, ngày 16 tháng 12 năm 2014
            <br />
            Khách hàng{" "}
          </div>
          <div class="footer-right">
            {" "}
            Cần thơ, ngày 16 tháng 12 năm 2014
            <br />
            Nhân viên{" "}
          </div>
        </footer>
      </div>
    </div>
  );
});
