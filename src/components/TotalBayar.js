import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom"; // Impor hook useNavigate
// import { Component } from "react";

const TotalBayar = (props) => {
  const navigate = useNavigate(); // Gunakan hook useNavigate untuk mendapatkan fungsi navigate

  const submitTotalBayar = (totalBayar) => {
    // Submit ke dalam bayar
    const pesanan = {
      total_bayar: totalBayar,
      menus: props.keranjangs,
    };
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      navigate("/sukses"); // Gunakan fungsi navigate untuk berpindah ke "/sukses" setelah pemanggilan API berhasil
    });
  };

  const totalBayar = props.keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="px-5 bg-light">
          <h6 className="mt-2">
            Total Harga:
            <strong className="float-right"> Rp. {totalBayar}</strong>
          </h6>
          <div className="d-grid mb-4 mt-2">
            <Button size="sm" onClick={() => submitTotalBayar(totalBayar)}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <strong> BAYAR</strong>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TotalBayar;

// export default class TotalBayar extends Component {
//   submitTotalBayar = (totalBayar) => {
//     // submit kedalam bayar
//     const pesanan = {
//       total_bayar: totalBayar,
//       menus: this.props.keranjangs,
//     };
//     axios.post(API_URL + "pesanans", pesanan).then((res) => {
//       this.props.history && this.props.history.push("/sukses");
//     });
//   };

//   render() {
//     const totalBayar = this.props.keranjangs.reduce(function (result, item) {
//       return result + item.total_harga;
//     }, 0);
//     return (
//       <div className="fixed-bottom float-right  ">
//         <Row>
//           <Col md={{ span: 3, offset: 9 }} className="px-5 bg-light">
//             <h6 className="mt-2">
//               Total Harga:
//               <strong> Rp. {totalBayar}</strong>
//             </h6>
//             <div className="d-grid mb-4 mt-2">
//               <Button
//                 size="sm "
//                 onClick={() => this.submitTotalBayar(totalBayar)}
//               >
//                 <FontAwesomeIcon icon={faShoppingCart} />
//                 <strong> BAYAR</strong>
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }
